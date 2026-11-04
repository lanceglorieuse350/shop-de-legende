(function () {
  "use strict";

  // ==========================================
  // 1. CONFIGURATION SUPABASE
  // ==========================================
  const SUPABASE_URL = "https://wrhokeajjmupnxpfurcc.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_0mmEGRZ_GKmgKSMKE83S8A_huJaAdL9";

  // Vérification que le SDK Supabase est bien chargé
  if (typeof supabase === "undefined" || typeof supabase.createClient !== "function") {
    console.error("[AUTH] Le SDK Supabase n'est pas chargé. Vérifie le CDN dans le <head>.");
    return;
  }

  // ✅ CORRECTION : On crée une seule instance globale pour éviter le warning
  if (!window.supabaseClient) {
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  const supabaseClient = window.supabaseClient;

  // ==========================================
  // 2. RÉCUPÉRATION DES ÉLÉMENTS HTML
  // ==========================================
  const authModal      = document.getElementById("authModal");
  const authBtn        = document.getElementById("authBtn");
  const closeAuthModal = document.getElementById("closeAuthModal");
  const authForm       = document.getElementById("authForm");
  const authEmail      = document.getElementById("authEmail");
  const authPassword   = document.getElementById("authPassword");
  const authMessage    = document.getElementById("authMessage");
  const googleAuthBtn  = document.getElementById("googleAuthBtn");
  const authSubmitBtn  = document.getElementById("authSubmitBtn");
  const authNewsletter = document.getElementById("authNewsletter");

  // Éléments du profil
  const profileModal       = document.getElementById("profileModal");
  const closeProfileModal  = document.getElementById("closeProfileModal");
  const profileForm        = document.getElementById("profileForm");
  const profileMessage     = document.getElementById("profileMessage");

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
  // 4. HELPERS (Messages et chargement)
  // ==========================================
  function showMessage(text, color) {
    if (!authMessage) return;
    authMessage.textContent = text || "";
    authMessage.style.color = color || "#fff";
  }

  function setLoading(loading) {
    isLoading = !!loading;
    if (!authSubmitBtn) return;
    authSubmitBtn.disabled      = loading;
    authSubmitBtn.style.opacity = loading ? "0.6" : "1";
    authSubmitBtn.style.cursor  = loading ? "wait" : "pointer";
    authSubmitBtn.textContent   = loading ? "⏳ Chargement..." : "Se connecter / S'inscrire";
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
  // 5. ÉVÉNEMENTS UI (Clics sur les boutons)
  // ==========================================
  authBtn.addEventListener("click", async () => {
    if (authBtn.getAttribute("data-logged-in") === "true") {
      // Si connecté : on demande s'il veut voir son profil ou se déconnecter
      const choice = confirm("Voulez-vous ouvrir votre profil ?\n(Cliquez sur ANNULER pour vous déconnecter)");
      if (choice) {
        openProfileModal();
      } else {
        if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
          supabaseClient.auth.signOut();
        }
      }
    } else {
      openModal();
    }
  });

  if (closeAuthModal) closeAuthModal.addEventListener("click", closeModal);

  authModal.addEventListener("click", (e) => {
    if (e.target === authModal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (authModal.style.display === "flex") closeModal();
      if (profileModal && profileModal.style.display === "flex") closeProfileModalFn();
    }
  });

  // ==========================================
  // 6. CONNEXION / INSCRIPTION
  // ==========================================
  authForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (isLoading) return;

    const email    = (authEmail.value || "").trim();
    const password = authPassword.value || "";
    const wantsNewsletter = authNewsletter?.checked || false;

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
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          // Tentative d'inscription
          const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
              data: {
                newsletter: wantsNewsletter
              }
            }
          });

          if (signUpError) {
            showMessage("Erreur : " + signUpError.message, "var(--red)");
          } else {
            // C'est le Trigger SQL qui gère l'enregistrement dans la table `clients`.
            if (signUpData.session) {
              showMessage("✅ Inscription réussie !", "var(--accent-safe)");
              authForm.reset();
              setTimeout(closeModal, 1500);
            } else {
              showMessage(
                "✅ Inscription réussie ! Vérifie tes e-mails pour confirmer ton compte.",
                "var(--accent-safe)"
              );
              authForm.reset();
            }
          }
        } else if (error.message.includes("Email not confirmed")) {
          showMessage(
            "📧 Ton e-mail n'est pas encore confirmé. Vérifie ta boîte de réception.",
            "var(--neon-gold)"
          );
        } else {
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

    if (event === "SIGNED_IN" && authModal.style.display === "flex") {
      setTimeout(closeModal, 800);
    }
  });

  // ==========================================
  // 9. INITIALISATION
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

  // ==========================================
  // 10. GESTION DU PROFIL CLIENT
  // ==========================================
  function openProfileModal() {
    if (!profileModal) return;
    profileModal.style.display = "flex";
    if (profileMessage) profileMessage.textContent = "";
    
    loadProfileData();
    loadOrders(); 
  }

  function closeProfileModalFn() {
    if (!profileModal) return;
    profileModal.style.display = "none";
    if (profileForm) profileForm.reset();
  }

  async function loadProfileData() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) return;

    const { data, error } = await supabaseClient
      .from('clients')
      .select('*')
      .eq('id', user.id)
      .single();

    if (data) {
      document.getElementById("profileNom").value = data.nom_complet || "";
      document.getElementById("profileTel").value = data.telephone || "";
      document.getElementById("profileAdresse").value = data.adresse || "";
      document.getElementById("profileCP").value = data.code_postal || "";
      document.getElementById("profileVille").value = data.ville || "";
    }
  }

  if (closeProfileModal) {
    closeProfileModal.addEventListener("click", closeProfileModalFn);
  }

  if (profileModal) {
    profileModal.addEventListener("click", (e) => {
      if (e.target === profileModal) closeProfileModalFn();
    });
  }

  if (profileForm) {
    profileForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      profileMessage.textContent = "Enregistrement en cours...";
      profileMessage.style.color = "#fff";

      const { data: { user } } = await supabaseClient.auth.getUser();
      if (!user) return;

      const updates = {
        nom_complet: document.getElementById("profileNom").value,
        telephone: document.getElementById("profileTel").value,
        adresse: document.getElementById("profileAdresse").value,
        code_postal: document.getElementById("profileCP").value,
        ville: document.getElementById("profileVille").value
      };

      const { error } = await supabaseClient
        .from('clients')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        profileMessage.textContent = "Erreur : " + error.message;
        profileMessage.style.color = "var(--red)";
      } else {
        profileMessage.textContent = "✅ Profil mis à jour avec succès !";
        profileMessage.style.color = "var(--accent-safe)";
        setTimeout(() => { closeProfileModalFn(); }, 2000);
      }
    });
  }

  // ==========================================
  // 11. AFFICHAGE DES COMMANDES
  // ==========================================
  async function loadOrders() {
    const ordersList = document.getElementById("ordersList");
    if (!ordersList) return;

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) return;

    const { data, error } = await supabaseClient
      .from('commandes')
      .select('*')
      .eq('client_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      ordersList.innerHTML = `<p style="color:var(--red);">Erreur lors du chargement des commandes.</p>`;
      return;
    }

    if (!data || data.length === 0) {
      ordersList.innerHTML = `<p style="color:#aaa;">Vous n'avez pas encore passé de commande.</p>`;
      return;
    }

    let html = "";
    data.forEach(order => {
      const date = new Date(order.created_at).toLocaleDateString('fr-FR');
      
      let produitsHtml = "";
      if (order.details_produits && Array.isArray(order.details_produits)) {
        order.details_produits.forEach(prod => {
          produitsHtml += `<li>${prod.quantite || 1}x ${prod.nom || 'Produit'} - ${prod.prix_unitaire || 0} €</li>`;
        });
      } else {
        produitsHtml = "<li>Produits (détails indisponibles)</li>";
      }

      html += `
        <div style="background:#111; border:1px solid #333; padding:10px; border-radius:5px; margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
            <strong style="color:var(--gold);">Commande du ${date}</strong>
            <span style="color:var(--accent-safe); font-weight:bold;">${order.montant_total} €</span>
          </div>
          <ul style="margin-left: 20px; margin-bottom: 5px; color: #ccc;">
            ${produitsHtml}
          </ul>
          <div style="font-size:0.8rem; color:#888;">Statut : ${order.statut || 'En attente'}</div>
        </div>
      `;
    });

    ordersList.innerHTML = html;
  }

})();