(function () {
  "use strict";

  // ==========================================
  // 1. CONFIGURATION SUPABASE
  // ==========================================
  const SUPABASE_URL = "https://wrhokeajimupnxpfucc.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_0mmEGRZ_GKmgKSMKE83S8A_huJaAdL9";

  // Vérification que le SDK Supabase est bien chargé
  if (typeof supabase === "undefined" || typeof supabase.createClient !== "function") {
    console.error("[AUTH] Le SDK Supabase n'est pas chargé. Vérifie le CDN dans le <head>.");
    return;
  }

  const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // ==========================================
  // 2. RÉCUPÉRATION DES ÉLÉMENTS HTML
  // ==========================================
  const authModal     = document.getElementById("authModal");
  const authBtn       = document.getElementById("authBtn");
  const closeAuthModal = document.getElementById("closeAuthModal");
  const authForm      = document.getElementById("authForm");
  const authEmail     = document.getElementById("authEmail");
  const authPassword  = document.getElementById("authPassword");
  const authMessage   = document.getElementById("authMessage");
  const googleAuthBtn = document.getElementById("googleAuthBtn");
  const authSubmitBtn = document.getElementById("authSubmitBtn");

  if (!authModal || !authBtn || !authForm) {
    console.warn("[AUTH] Éléments HTML essentiels manquants (modal / bouton / formulaire).");
    return;
  }

  // ==========================================
  // 3. ÉTAT
  // ==========================================
  let currentUser = null;
  let isLoading   = false;

  // ==========================================
  // 4. HELPERS
  // ==========================================
  function showMessage(text, color) {
    if (!authMessage) return;
    authMessage.textContent = text || "";
    authMessage.style.color = color || "#fff";
  }

  function setLoading(loading) {
    isLoading = !!loading;
    if (!authSubmitBtn) return;
    authSubmitBtn.disabled     = loading;
    authSubmitBtn.style.opacity = loading ? "0.6" : "1";
    authSubmitBtn.style.cursor  = loading ? "wait" : "pointer";
    authSubmitBtn.textContent   = loading
      ? "⏳ Chargement..."
      : "Se connecter / S'inscrire";
  }

  function openModal() {
    if (!authModal) return;
    authModal.style.display = "flex";
    showMessage("");
    if (currentUser && authEmail) authEmail.value = currentUser.email || "";
  }

  function closeModal() {
    if (!authModal) return;
    authModal.style.display = "none";
    showMessage("");
    if (authForm) authForm.reset();
  }

  // Met à jour le bouton en se basant sur un attribut data (fiable, non traduisible)
  function updateButton(user) {
    if (!authBtn) return;
    currentUser = user || null;

    if (user) {
      const label = user.email ? user.email.split("@")[0] : "Mon Compte";
      authBtn.textContent = "👤 " + label;
      authBtn.style.background = "var(--gold)";
      authBtn.style.color      = "#000";
      authBtn.style.border     = "none";
      authBtn.setAttribute("data-logged-in", "true");
    } else {
      authBtn.textContent = "🔐 Connexion";
      authBtn.style.background = "transparent";
      authBtn.style.color      = "var(--gold)";
      authBtn.style.border     = "1px solid var(--gold)";
      authBtn.setAttribute("data-logged-in", "false");
    }
  }

  // ==========================================
  // 5. ÉVÉNEMENTS UI
  // ==========================================
  authBtn.addEventListener("click", () => {
    // On se base sur data-logged-in, PAS sur le texte
    if (authBtn.getAttribute("data-logged-in") === "true") {
      if (confirm("Voulez-vous vous déconnecter ?")) {
        supabaseClient.auth.signOut();
      }
    } else {
      openModal();
    }
  });

  if (closeAuthModal) closeAuthModal.addEventListener("click", closeModal);

  // Fermeture au clic sur le fond de la modale
  authModal.addEventListener("click", (e) => {
    if (e.target === authModal) closeModal();
  });

  // Fermeture avec la touche Échap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && authModal.style.display === "flex") closeModal();
  });

  // ==========================================
  // 6. CONNEXION / INSCRIPTION
  // ==========================================
  authForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (isLoading) return;

    const email    = (authEmail.value || "").trim();
    const password = authPassword.value || "";

    if (!email || !password) {
      showMessage("Veuillez remplir tous les champs.", "var(--red)");
      return;
    }
    if (password.length < 6) {
      showMessage("Le mot de passe doit contenir au moins 6 caractères.", "var(--red)");
      return;
    }

    setLoading(true);
    showMessage("Vérification en cours...", "#fff");

    try {
      // --- Tentative de connexion ---
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

      if (error) {
        // Cas 1 : mauvais identifiants → on tente l'inscription
        if (error.message.includes("Invalid login credentials")) {
          const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({
            email,
            password
          });

          if (signUpError) {
            showMessage("Erreur : " + signUpError.message, "var(--red)");
          } else if (signUpData.session) {
            // Confirmation email désactivée → connexion immédiate
            showMessage("✅ Inscription réussie !", "var(--accent-safe)");
            authForm.reset();
            setTimeout(closeModal, 1500);
          } else {
            // Confirmation email requise
            showMessage(
              "✅ Inscription réussie ! Vérifie tes e-mails pour confirmer ton compte.",
              "var(--accent-safe)"
            );
            authForm.reset();
          }
        }
        // Cas 2 : email non confirmé
        else if (error.message.includes("Email not confirmed")) {
          showMessage(
            "📧 Ton e-mail n'est pas encore confirmé. Vérifie ta boîte de réception.",
            "var(--neon-gold)"
          );
        }
        // Cas 3 : autre erreur
        else {
          showMessage("Erreur : " + error.message, "var(--red)");
        }
      } else {
        // Connexion réussie
        showMessage("✅ Connexion réussie !", "var(--accent-safe)");
        authForm.reset();
        setTimeout(closeModal, 1500);
      }
    } catch (err) {
      console.error("[AUTH] Erreur inattendue :", err);
      showMessage("Erreur inattendue. Réessaie dans un instant.", "var(--red)");
    } finally {
      setLoading(false);
    }
  });

  // ==========================================
  // 7. CONNEXION GOOGLE
  // ==========================================
  if (googleAuthBtn) {
    googleAuthBtn.addEventListener("click", async () => {
      showMessage("Redirection vers Google...", "#fff");

      // Sur Vercel : https://ton-domaine.vercel.app/
      // Sur file:// : échoue — il faut un vrai serveur
      const redirectUrl = window.location.origin + window.location.pathname;

      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: redirectUrl }
      });

      if (error) {
        showMessage("Erreur Google : " + error.message, "var(--red)");
      }
    });
  }

  // ==========================================
  // 8. ÉCOUTE DES CHANGEMENTS D'AUTH
  // ==========================================
  supabaseClient.auth.onAuthStateChange((event, session) => {
    console.log("[AUTH] Événement :", event);
    const user = session ? session.user : null;
    updateButton(user);

    // Retour de OAuth : on ferme la modale si elle est ouverte
    if (event === "SIGNED_IN" && authModal.style.display === "flex") {
      setTimeout(closeModal, 800);
    }
  });

  // ==========================================
  // 9. INITIALISATION (restaure la session existante)
  // ==========================================
  (async () => {
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      updateButton(session ? session.user : null);
    } catch (err) {
      console.error("[AUTH] Erreur d'initialisation :", err);
      updateButton(null);
    }
  })();
})();