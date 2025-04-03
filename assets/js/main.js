
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

 // Dienst Service



        document.addEventListener("DOMContentLoaded", function () {
            const serviceLinks = document.querySelectorAll(".services-list a");
            const serviceContents = document.querySelectorAll(".service-content");

            // Funktion zum Anzeigen des ausgewählten Dienstes
            function showService(serviceId) {
                // Verstecke alle Dienstleistungsdetails
                serviceContents.forEach((content) => (content.style.display = "none"));

                // Entferne die "active"-Klasse von allen Links
                serviceLinks.forEach((link) => link.classList.remove("active"));

                // Zeige den ausgewählten Dienst an
                const targetContent = document.getElementById(serviceId);
                if (targetContent) {
                    targetContent.style.display = "block";
                }

                // Setze die "active"-Klasse auf den entsprechenden Link
                const targetLink = document.querySelector(`a[href="#${serviceId}"]`);
                if (targetLink) {
                    targetLink.classList.add("active");
                }
            }

            // Funktion, um vollständig nach oben zu scrollen
            function scrollToTop() {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }

            // Funktion, um zur service-details.html zu navigieren
            function navigateToServiceDetails(serviceId) {
                window.location.href = `service-details.html#${serviceId}`;
            }

            // Event-Listener für die Links im Register (service-details.html)
            serviceLinks.forEach((link) => {
                link.addEventListener("click", function (e) {
                    e.preventDefault();
                    const serviceId = this.getAttribute("href").substring(1);
                    showService(serviceId);
                    history.replaceState(null, null, `#${serviceId}`);
                });
            });

            // Event-Listener für ALLE Links auf der Seite
            document.querySelectorAll("a").forEach((link) => {
                link.addEventListener("click", function (e) {
                    const href = this.getAttribute("href");

                    if (href && href.startsWith("#")) {
                        e.preventDefault();
                        const serviceId = href.substring(1);

                        if (window.location.pathname.endsWith("service-details.html")) {
                            showService(serviceId);
                            scrollToTop();
                            history.replaceState(null, null, `#${serviceId}`);
                        } else {
                            navigateToServiceDetails(serviceId);
                        }
                    }
                });
            });

            // Beim Laden der Seite den Dienst basierend auf dem Anker anzeigen
            if (window.location.pathname.endsWith("service-details.html")) {
                const hash = window.location.hash.substring(1);
                if (hash) {
                    showService(hash);
                    scrollToTop();
                } else {
                    const firstServiceId = serviceLinks[0]?.getAttribute("href")?.substring(1);
                    if (firstServiceId) {
                        showService(firstServiceId);
                    }
                }
            }
        });
  
// ENDE Dienst Service


  /**
   * Table Navigation for Products
   */
  function setupTableNavigation() {
    document.querySelectorAll('.table-navigation .btn').forEach(button => {
      button.addEventListener('click', () => {
        // Entferne die aktive Klasse von allen Buttons
        document.querySelectorAll('.table-navigation .btn').forEach(btn => {
          btn.classList.remove('active');
        });

        // Füge die aktive Klasse zum geklickten Button hinzu
        button.classList.add('active');

        // Verstecke alle Tabellen (außer Downloads)
        document.querySelectorAll('.portfolio-info').forEach(table => {
          if (table.id !== 'downloads') {
            table.style.display = 'none';
          }
        });

        // Zeige die ausgewählte Tabelle an
        const target = button.getAttribute('data-target');
        if (target) {
          const targetTable = document.getElementById(target);
          if (targetTable) {
            targetTable.style.display = 'block';
          }
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', setupTableNavigation);

  /**
   * Product Hotspots
   */
  function setupProductHotspots() {
    // Vollständige Produktdaten
    const products = {
      1: {
          title: "GPT100 Gasdrucksensor",
          description: "Ein hochpräziser Sensor zur Messung des Gasdrucks.",
          link: "product-details/gasdrucksensor.html",
          position: { top: "20%", left: "25%" }
      },
      2: {
          title: "CA7 Raumluftsensor",
          description: "Überwacht die Luftqualität in Innenräumen.",
          link: "product-details/raumluftsensor.html",
          position: { top: "35%", left: "60%" }
      },
      3: {
          title: "ModCon2 RS485 Converter",
          description: "Ermöglicht die zuverlässige Datenübertragung in industriellen Netzwerken.",
          link: "product-details/rs485.html",
          position: { top: "50%", left: "40%" }
      },
      4: {
          title: "Radar Pegelmessung",
          description: "Präzise Messung von Pegelständen und Abständen mit Radar-Technologie.",
          link: "product-details/pegelmessung.html",
          position: { top: "55%", left: "75%" }
      },
      5: {
          title: "Radar Flussgeschwindigkeit",
          description: "Misst die Flussgeschwindigkeit von Flüssigkeiten mit Radar.",
          link: "product-details/flussgeschwindigkeit.html",
          position: { top: "70%", left: "30%" }
      },
      6: {
          title: "Pegelsonde für Tiefbrunnen",
          description: "Eine zuverlässige Lösung zur Messung des Wasserstands in Tiefbrunnen.",
          link: "product-details/wasserstand.html",
          position: { top: "65%", left: "50%" }
      },
      7: {
          title: "Kamera Zählerablesung",
          description: "Automatische Zählerablesung mit KI-basierter Bilderkennung.",
          link: "product-details/zählerablesung.html",
          position: { top: "30%", left: "80%" }
      },
      8: {
          title: "LoRa Businterface",
          description: "Ermöglicht die Kommunikation über LoRaWAN mit Modbus TCP und M Bus.",
          link: "product-details/businterface.html",
          position: { top: "80%", left: "65%" }
      }
    };

    let activeHotspot = null;
    const hotspotsContainer = document.getElementById('hotspots');

    if (hotspotsContainer) {
      Object.keys(products).forEach(productId => {
        const product = products[productId];
        const hotspot = document.createElement('div');
        
        hotspot.className = 'hotspot';
        hotspot.style.top = product.position.top;
        hotspot.style.left = product.position.left;
        hotspot.setAttribute('data-id', productId);
        
        hotspot.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (activeHotspot === this) return;
            
            if (activeHotspot) {
                activeHotspot.classList.remove('active');
            }
            
            activeHotspot = this;
            this.classList.add('active');
            
            const tooltip = document.getElementById('tooltip');
            if (tooltip) {
              tooltip.innerHTML = `
                  <h4>${product.title}</h4>
                  <p>${product.description}</p>
                  <a href="${product.link}" class="btn" target="_blank">Mehr erfahren</a>
              `;
              tooltip.style.display = 'block';
              positionTooltip(this);
            }
        });
        
        hotspotsContainer.appendChild(hotspot);
      });

      function positionTooltip(hotspot) {
        const tooltip = document.getElementById('tooltip');
        if (!tooltip) return;
        
        const rect = hotspot.getBoundingClientRect();
        
        if (rect.right + tooltip.offsetWidth < window.innerWidth) {
            tooltip.style.left = rect.right + 'px';
        } else {
            tooltip.style.left = (rect.left - tooltip.offsetWidth) + 'px';
        }
        
        tooltip.style.top = rect.top + 'px';
      }

      document.addEventListener('click', function(e) {
        if (!e.target.closest('.hotspot') && !e.target.closest('.hotspot-tooltip')) {
            if (activeHotspot) {
                activeHotspot.classList.remove('active');
                activeHotspot = null;
            }
            const tooltip = document.getElementById('tooltip');
            if (tooltip) {
              tooltip.style.display = 'none';
            }
        }
      });

      window.addEventListener('resize', function() {
        if (activeHotspot) {
            positionTooltip(activeHotspot);
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', setupProductHotspots);

  /**
   * Cookie Consent
   */
  function setupCookieConsent() {
    document.addEventListener('DOMContentLoaded', function() {
      // Cookie-Banner initialisieren wenn keine Entscheidung getroffen
      if (!localStorage.getItem('cookieDecision')) {
        cookieconsent.run({
          "notice_banner_type": "simple",
          "consent_type": "express",
          "palette": "light",
          "language": "de",
          "page_load_consent_levels": ["strictly-necessary"],
          "notice_banner_reject_button_hide": false,
          "preferences_center_close_button_hide": false,
          "page_refresh_confirmation_buttons": false,
          "website_name": "bemondis GmbH",
          "onStatusChange": function(status) {
            localStorage.setItem('cookieDecision', status);
          }
        });
      }

      // Cookie-Links für Footer und Credits
      ['footer-cookie-settings', 'credits-cookie-settings'].forEach(id => {
        const link = document.getElementById(id);
        if (link) {
          link.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.cookieconsent) {
              window.cookieconsent.openPreferencesCenter();
            } else {
              console.error('CookieConsent API nicht verfügbar');
            }
          });
        }
      });

      // Button-Styling
      const style = document.createElement('style');
      style.innerHTML = `.cc-btn { 
        background-color: #10bc69 !important; 
        border-color: #10bc69 !important; 
      }`;
      document.head.appendChild(style);
    });
  }

  setupCookieConsent();

})();

document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('languageToggle');
  const dropdown = document.getElementById('languageDropdown');
  const langOptions = document.querySelectorAll('.lang-option');
  const currentLangSpan = document.querySelector('.current-lang');

  // Sprachzuordnung für Dateinamen
  const pageTranslations = {
    'index': 'index',
    'kontakt': 'contact',
    'produkte': 'products',
    // Fügen Sie hier alle Seiten hinzu
  };

  // Aktuelle Seite ermitteln
  function getCurrentPage() {
    const path = window.location.pathname.split('/').pop();
    return path.replace('.html', '');
  }

  // Sprache wechseln
  function switchLanguage(lang) {
    const currentPage = getCurrentPage();
    const translatedPage = pageTranslations[currentPage] || currentPage;
    
    // Pfad konstruieren
    let newPath;
    if (window.location.pathname.includes('/de/')) {
      newPath = window.location.pathname.replace('/de/', '/en/')
                .replace(currentPage, translatedPage);
    } else {
      newPath = window.location.pathname.replace('/en/', '/de/')
                .replace(translatedPage, currentPage);
    }
    
    // Sprache speichern und wechseln
    localStorage.setItem('language', lang);
    window.location.href = newPath;
  }

  // Initialisierung
  function initLanguage() {
    const lang = window.location.pathname.includes('/en/') ? 'en' : 'de';
    currentLangSpan.textContent = lang.toUpperCase();
  }

  // Event-Handler
  toggleBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdown.classList.toggle('visible');
  });

  langOptions.forEach(option => {
    option.addEventListener('click', function(e) {
      e.preventDefault();
      switchLanguage(this.getAttribute('data-lang'));
    });
  });

  document.addEventListener('click', function() {
    dropdown.classList.remove('visible');
  });

  initLanguage();
});