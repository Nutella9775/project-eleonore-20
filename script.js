// ===================================================
// SCRIPT OFFICIEL DU GOUVERNEMENT PÉRUVIEN
// ===================================================

// ===== TICKER =====
const tickerMessages = [
  " COMMUNIQUÉ OFFICIEL — Le Président Marcheur Blanc inaugure ce matin le 4e rond-point de la capitale",
  " ALERTE : des manchots génétiquement modifiés ont été repérés à la frontière — restez calmes",
  " La grève des boulangers entre dans son 3e jour — le Président appelle à « manger froid avec patriotisme »",
  " Le Ministère de la Vérité confirme que tout va bien",
  " Les élections législatives auront lieu dès que les castors seront prêts à voter",
  " La dissolution de l'Assemblée est « en cours de nettoyage chimique »",
  " Taux de participation aux dernières élections : 100,01 % — record historique",
  " Le Président a été photographié en train de marcher vers l'avenir — cliché disponible en format A0",
  " 9e allocution télévisée de la semaine — la 10e est prévue pour annoncer la 11e",
];

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Remplir le ticker
  const tickerSpan = document.querySelector(".ticker span");
  if (tickerSpan) {
    tickerSpan.textContent = tickerMessages.join("     •     ") + "     •     ";
  }

  // Injecter le toast dans le DOM
  const toast = document.createElement("div");
  toast.id = "toast-alerte";
  toast.innerHTML = `
    <span class="toast-icone">🚨</span>
    <div class="toast-corps">
      <div class="toast-titre">Alerte Nationale</div>
      <div class="toast-texte">Un accord a été signé avec la Secte du Maïs pour devenir la seule religion officielle du pays.</div>
    </div>
    <button class="toast-fermer" aria-label="Fermer">✕</button>
  `;
  document.body.appendChild(toast);

  // Injecter la bannière sticky dans le DOM
  const banniere = document.createElement("div");
  banniere.id = "banniere-sticky";
  banniere.innerHTML = `
    <span class="sticky-badge">DERNIERE MINUTE</span>
    <span class="sticky-texte">Le gouvernement a annoncé un accord avec la Secte du Maïs pour devenir la seule religion officielle du pays. Les citoyens sont invités à se convertir immédiatement sous peine de sanctions sévères. (<b>"Pas de probleme pour l'officialisation"</b>, assure le gourou de la secte)</span>
    <button class="sticky-fermer" aria-label="Fermer">✕</button>
  `;
  document.body.appendChild(banniere);

  // ===== MINUTERIE 2 MINUTES =====
  // Étape 1 : après 1 min 50s → afficher le toast d'avertissement
  // Étape 2 : 10 secondes plus tard → toast disparaît, bannière sticky apparaît

  const DELAI_TOAST_MS    = 110 * 1000; // 1 min 50s
  const DELAI_BANNIERE_MS = 120 * 1000; // 2 min exactement

  setTimeout(() => {
    // Afficher le toast
    toast.classList.add("visible");

    // Le toast disparaît automatiquement après 8s si non fermé
    setTimeout(() => {
      toast.classList.remove("visible");
    }, 8000);

  }, DELAI_TOAST_MS);

  setTimeout(() => {
    // Afficher la bannière sticky (quelle que soit la position de scroll)
    banniere.classList.add("visible");
  }, DELAI_BANNIERE_MS);

  // Fermeture manuelle du toast
  toast.querySelector(".toast-fermer").addEventListener("click", () => {
    toast.classList.remove("visible");
  });

  // Fermeture manuelle de la bannière sticky
  banniere.querySelector(".sticky-fermer").addEventListener("click", () => {
    banniere.classList.remove("visible");
  });

  // Clic sur le toast → scroller vers la section crise
  toast.querySelector(".toast-corps").addEventListener("click", () => {
    const crise = document.getElementById("crise");
    if (crise) crise.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    toast.classList.remove("visible");
  });
  toast.querySelector(".toast-corps").style.cursor = "pointer";

  // Fermeture au clavier (Échap) du toast et de la bannière
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      toast.classList.remove("visible");
      banniere.classList.remove("visible");
    }
  });

  // ===== RÉVÉLATION DES BLOCS AU DÉFILEMENT =====
  const blocsARevele = document.querySelectorAll(
    ".mesure, .ministre, .crise-bloc, blockquote.citation"
  );

  if (prefersReducedMotion) {
    blocsARevele.forEach((el) => el.classList.add("est-visible"));
  } else if ("IntersectionObserver" in window) {
    blocsARevele.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${(i % 4) * 60}ms`;
    });

    const observateurReveal = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((entree) => {
          if (entree.isIntersecting) {
            entree.target.classList.add("est-visible");
            observateurReveal.unobserve(entree.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    blocsARevele.forEach((el) => observateurReveal.observe(el));
  }

  // ===== ANIMATION DES BARRES DE SONDAGE =====
  const barresRemplissage = document.querySelectorAll(".barre .remplissage");
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    barresRemplissage.forEach((el) => {
      el.dataset.valeurCible = el.style.width;
      el.style.width = "0%";
    });

    const observateurSondage = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((entree) => {
          if (entree.isIntersecting) {
            entree.target.style.width = entree.target.dataset.valeurCible;
            observateurSondage.unobserve(entree.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    barresRemplissage.forEach((el) => observateurSondage.observe(el));
  }

  // ===== NAVIGATION : SECTION ACTIVE =====
  const liensNav = document.querySelectorAll("nav a[href^='#']");
  const sections = Array.from(liensNav)
    .map((lien) => document.getElementById(lien.getAttribute("href").slice(1)))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observateurNav = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((entree) => {
          const lien = document.querySelector(`nav a[href="#${entree.target.id}"]`);
          if (!lien) return;
          if (entree.isIntersecting) {
            liensNav.forEach((a) => a.classList.remove("active"));
            lien.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observateurNav.observe(section));
  }

  // ===== BOUTON RETOUR EN HAUT =====
  const boutonHaut = document.createElement("button");
  boutonHaut.id = "retour-haut";
  boutonHaut.type = "button";
  boutonHaut.setAttribute("aria-label", "Retourner en haut de page");
  boutonHaut.textContent = "↑";
  document.body.appendChild(boutonHaut);

  let dernierScroll = 0;
  let tickEnCours = false;
  window.addEventListener("scroll", () => {
    dernierScroll = window.scrollY;
    if (!tickEnCours) {
      window.requestAnimationFrame(() => {
        boutonHaut.classList.toggle("visible", dernierScroll > 500);
        tickEnCours = false;
      });
      tickEnCours = true;
    }
  });

  boutonHaut.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

});