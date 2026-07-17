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

  // ===== POP-UP DE CONSENTEMENT AUX COOKIES =====
  const CLE_CONSENTEMENT = "eleonore20-cookies";

  if (!localStorage.getItem(CLE_CONSENTEMENT)) {
    const overlay = document.createElement("div");
    overlay.id = "cookie-overlay";
    overlay.innerHTML = `
      <div id="cookie-modal" role="dialog" aria-modal="true" aria-labelledby="cookie-titre" aria-describedby="cookie-texte">
        <span class="cookie-badge">Décret numérique n° 2026-014</span>
        <h2 id="cookie-titre">Consentement (obligatoire) aux cookies 🍪</h2>
        <p id="cookie-texte">Conformément à la Loi sur la Transparence Numérique Populaire, ce site dépose des cookies afin d'assurer votre sécurité, votre confort, et accessoirement une surveillance légère et parfaitement bienveillante de votre navigation.</p>
        <p class="cookie-petit">Tout refus sera transmis au Ministère de la Vérité pour analyse et pourrait affecter votre cote de civisme numérique.</p>
        <div class="cookie-boutons">
          <button type="button" id="cookie-accepter" class="btn-cookie-accepter">Accepter les cookies</button>
          <button type="button" id="cookie-refuser" class="btn-cookie-refuser">Non, j'aime pas les cookies</button>
          <span class="cookie-placeholder"></span>
        </div>
        <p class="cookie-taquin">Psst… un clic sur « Non » vaut vraiment le détour. (Bon courage.)</p>
      </div>
    `;
    document.body.appendChild(overlay);
    document.body.classList.add("cookie-ouvert");
    requestAnimationFrame(() => overlay.classList.add("visible"));

    const modal = overlay.querySelector("#cookie-modal");
    const btnAccepter = overlay.querySelector("#cookie-accepter");
    const btnRefuser = overlay.querySelector("#cookie-refuser");
    const placeholder = overlay.querySelector(".cookie-placeholder");

    let popupOuvert = true;
    let aEchappe = false; // le bouton "Non" est-il passé en mode fuite ?

    // Références des écouteurs globaux, pour pouvoir les retirer proprement
    let gererApproche = null;
    let gererApprocheTactile = null;
    let bloquerDefilement = null;
    let gererRedimension = null;

    const fermerPopup = () => {
      popupOuvert = false;
      document.body.classList.remove("cookie-ouvert");
      overlay.classList.remove("visible");
      document.removeEventListener("keydown", gererTab);
      if (gererApproche) document.removeEventListener("mousemove", gererApproche);
      if (gererApprocheTactile) {
        document.removeEventListener("touchmove", gererApprocheTactile);
        document.removeEventListener("touchstart", gererApprocheTactile);
      }
      if (bloquerDefilement) document.removeEventListener("touchmove", bloquerDefilement);
      if (gererRedimension) window.removeEventListener("resize", gererRedimension);
      setTimeout(() => {
        btnRefuser.remove();
        placeholder.remove();
        overlay.remove();
      }, 400);
    };

    btnAccepter.addEventListener("click", () => {
      localStorage.setItem(CLE_CONSENTEMENT, "accepte");
      fermerPopup();
    });

    // Au cas (improbable) où quelqu'un réussirait à activer "Non" (ex. au clavier)
    btnRefuser.addEventListener("click", () => {
      localStorage.setItem(CLE_CONSENTEMENT, "refus-requalifie");
      modal.querySelector("#cookie-texte").textContent =
        "⚠️ Tentative de refus détectée. Le Ministère de la Vérité a requalifié votre choix en acceptation enthousiaste. Merci pour votre coopération citoyenne.";
      modal.querySelector(".cookie-petit").style.display = "none";
      modal.querySelector(".cookie-taquin").style.display = "none";
      btnRefuser.style.display = "none";
      btnAccepter.textContent = "J'ai compris";
      placeholder.style.display = "none";
      setTimeout(fermerPopup, 1800);
    });

    // Empêche le défilement d'arrière-plan tant que la pop-up est ouverte (utile sur mobile)
    bloquerDefilement = (e) => { if (e.cancelable) e.preventDefault(); };
    document.addEventListener("touchmove", bloquerDefilement, { passive: false });

    // Piège le Tab à l'intérieur de la pop-up (accessibilité clavier)
    const gererTab = (e) => {
      if (!popupOuvert || e.key !== "Tab") return;
      const elements = [btnAccepter, btnRefuser];
      const index = elements.indexOf(document.activeElement);
      e.preventDefault();
      if (e.shiftKey) {
        elements[index <= 0 ? elements.length - 1 : index - 1].focus();
      } else {
        elements[index === -1 || index === elements.length - 1 ? 0 : index + 1].focus();
      }
    };
    document.addEventListener("keydown", gererTab);
    btnAccepter.focus();

    if (!prefersReducedMotion) {
      const SEUIL_FUITE = 130;
      const MARGE_ECRAN = 14;

      const activerEvasion = () => {
        if (aEchappe) return;
        const rect = btnRefuser.getBoundingClientRect();
        placeholder.style.width = rect.width + "px";
        placeholder.style.height = rect.height + "px";
        placeholder.style.display = "inline-block";
        btnRefuser.style.position = "fixed";
        btnRefuser.style.margin = "0";
        btnRefuser.style.left = rect.left + "px";
        btnRefuser.style.top = rect.top + "px";
        btnRefuser.style.zIndex = "100002";
        document.body.appendChild(btnRefuser);
        aEchappe = true;
      };

      const fuir = (x, y) => {
        activerEvasion();
        const rect = btnRefuser.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cx - x;
        const dy = cy - y;
        const distance = Math.hypot(dx, dy) || 0.001;
        if (distance >= SEUIL_FUITE) return;

        const ux = dx / distance;
        const uy = dy / distance;
        const minX = MARGE_ECRAN + rect.width / 2;
        const maxX = window.innerWidth - MARGE_ECRAN - rect.width / 2;
        const minY = MARGE_ECRAN + rect.height / 2;
        const maxY = window.innerHeight - MARGE_ECRAN - rect.height / 2;

        let nx, ny, nouvelleDistance, essai = 0;
        do {
          const distanceFuite = 110 + Math.random() * 70;
          const angle = essai === 0 ? 0 : (Math.random() - 0.5) * 1.4;
          const cosA = Math.cos(angle), sinA = Math.sin(angle);
          const uxr = ux * cosA - uy * sinA;
          const uyr = ux * sinA + uy * cosA;
          nx = Math.min(Math.max(cx + uxr * distanceFuite, minX), maxX);
          ny = Math.min(Math.max(cy + uyr * distanceFuite, minY), maxY);
          nouvelleDistance = Math.hypot(nx - x, ny - y);
          essai++;
        } while (nouvelleDistance < SEUIL_FUITE && essai < 8);

        btnRefuser.style.left = (nx - rect.width / 2) + "px";
        btnRefuser.style.top = (ny - rect.height / 2) + "px";
      };

      let tickSouris = false;
      gererApproche = (e) => {
        if (!popupOuvert || tickSouris) return;
        tickSouris = true;
        requestAnimationFrame(() => {
          fuir(e.clientX, e.clientY);
          tickSouris = false;
        });
      };

      let tickTactile = false;
      gererApprocheTactile = (e) => {
        if (!popupOuvert) return;
        const touche = e.touches[0];
        if (!touche) return;
        // Un doigt qui se pose directement sur le bouton ne doit jamais compter comme un clic
        if (e.type === "touchstart" && (e.target === btnRefuser || btnRefuser.contains(e.target)) && e.cancelable) {
          e.preventDefault();
        }
        if (tickTactile) return;
        tickTactile = true;
        requestAnimationFrame(() => {
          fuir(touche.clientX, touche.clientY);
          tickTactile = false;
        });
      };

      gererRedimension = () => {
        if (!aEchappe) return;
        const rect = btnRefuser.getBoundingClientRect();
        const maxX = Math.max(MARGE_ECRAN, window.innerWidth - MARGE_ECRAN - rect.width);
        const maxY = Math.max(MARGE_ECRAN, window.innerHeight - MARGE_ECRAN - rect.height);
        btnRefuser.style.left = Math.min(Math.max(rect.left, MARGE_ECRAN), maxX) + "px";
        btnRefuser.style.top = Math.min(Math.max(rect.top, MARGE_ECRAN), maxY) + "px";
      };

      document.addEventListener("mousemove", gererApproche);
      document.addEventListener("touchmove", gererApprocheTactile, { passive: true });
      document.addEventListener("touchstart", gererApprocheTactile, { passive: false });
      window.addEventListener("resize", gererRedimension);
    }
  }

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