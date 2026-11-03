(function(){
  "use strict";

  // ==========================================
  // CONFIGURATION SUPABASE (Prêt à l'emploi)
  // ==========================================
  const SUPABASE_URL = "https://wrhokeajimupnxpfucc.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_0mmEGRZ_GKmgKSMKE83S8A_huJaAdL9";

  // Initialisation du client Supabase
  const { createClient } = supabase;
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Récupération des éléments HTML
  const authModal = document.getElementById("authModal");
  const authBtn = document.getElementById("authBtn");
  const closeAuthModal = document.getElementById("closeAuthModal");
  const authForm = document.getElementById("authForm");
  const authEmail = document.getElementById("authEmail");
  const authPassword = document.getElementById("authPassword");
  const authMessage = document.getElementById("authMessage");
  const googleAuthBtn = document.getElementById("googleAuthBtn");

  // ==========================================
  // GESTION DE LA FENÊTRE MODALE
  // ==========================================
  if (authBtn) {
    authBtn.addEventListener("click", () => {
      // Si l'utilisateur est connecté, le bouton sert à se déconnecter
      if (authBtn.textContent.includes("Compte")) {
        if(confirm("Voulez-vous vous déconnecter ?")) {
          supabaseClient.auth.signOut();
        }
      } else {
        // Sinon, on ouvre la modale
        authModal.style.display = "flex";
        authMessage.textContent = "";
      }
    });
  }

  if (closeAuthModal) {
    closeAuthModal.addEventListener("click", () => {
      authModal.style.display = "none";
    });
  }

  // ==========================================
  // INSCRIPTION & CONNEXION (EMAIL / MOT DE PASSE)
  // ==========================================
  if (authForm) {
    authForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = authEmail.value.trim();
      const password = authPassword.value;

      authMessage.textContent = "Vérification en cours...";
      authMessage.style.color = "#fff";

      // Étape 1 : On tente de connecter l'utilisateur
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

      if (error) {
        // Étape 2 : Si la connexion échoue, c'est peut-être un nouvel utilisateur, on tente l'inscription
        if (error.message.includes("Invalid login credentials")) {
          const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({ email, password });
          
          if (signUpError) {
            authMessage.textContent = "Erreur : " + signUpError.message;
            authMessage.style.color = "var(--red)";
          } else {
            authMessage.textContent = "Inscription réussie ! Vérifiez vos e-mails pour confirmer.";
            authMessage.style.color = "var(--accent-safe)";
            authForm.reset();
          }
        } else {
          authMessage.textContent = "Erreur : " + error.message;
          authMessage.style.color = "var(--red)";
        }
      } else {
        // Connexion réussie
        authMessage.textContent = "Connexion réussie !";
        authMessage.style.color = "var(--accent-safe)";
        authForm.reset();
        setTimeout(() => { authModal.style.display = "none"; }, 1500);
      }
    });
  }

  // ==========================================
  // CONNEXION VIA GOOGLE
  // ==========================================
  if (googleAuthBtn) {
    googleAuthBtn.addEventListener("click", async () => {
      authMessage.textContent = "Redirection vers Google...";
      authMessage.style.color = "#fff";

      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin // Redirige vers ton site une fois connecté
        }
      });

      if (error) {
        authMessage.textContent = "Erreur Google : " + error.message;
        authMessage.style.color = "var(--red)";
      }
    });
  }

  // ==========================================
  // MISE À JOUR DE L'INTERFACE (BOUTON)
  // ==========================================
  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session) {
      // L'utilisateur est connecté
      if (authBtn) {
        authBtn.textContent = "👤 Mon Compte";
        authBtn.style.background = "var(--gold)";
        authBtn.style.color = "#000";
        authBtn.style.border = "none";
      }
    } else {
      // L'utilisateur est déconnecté
      if (authBtn) {
        authBtn.textContent = "🔐 Connexion";
        authBtn.style.background = "transparent";
        authBtn.style.color = "var(--gold)";
        authBtn.style.border = "1px solid var(--gold)";
      }
    }
  });

})();