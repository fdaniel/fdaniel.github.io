/* =============================================
   Filipe Carneiro — Portfolio
   ============================================= */

// --- Translations ---
const i18n = {
  en: {
    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.greeting': "Hello, I'm",
    'hero.title': 'Senior WordPress Engineer',
    'hero.intro': 'Building high-performance WordPress solutions for iconic brands. Over a decade of experience crafting custom themes, plugins, and scalable architectures.',
    'hero.cta': 'View My Work',
    'portfolio.title': 'Selected Work',
    'portfolio.subtitle': 'Brands and projects I\'ve contributed to over the years',
    'filter.all': 'All',
    'filter.corporate': 'Corporate',
    'filter.ecommerce': 'E-commerce',
    'filter.editorial': 'Editorial',
    'filter.custom': 'Custom Dev',
    'about.title': 'About Me',
    'about.text1': 'Hello, i am a Senior WordPress Engineer, with 10+ years of experience delivering high-performance, scalable and maintainable web solutions. Strong background in custom WordPress development (themes & plugins), performance optimization (Core Web Vitals / PageSpeed), WooCommerce, and technical leadership.',
    'about.text2': 'I have always bring the best architecture, improving processes, and delivering robust solutions. I am Highly autonomous, quality-driven, and focused on long-term maintainability and business impact.',
    'about.years': 'Years Experience',
    'about.projects': 'Projects Delivered',
    'about.brands': 'Brands & Clients',
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Interested in working together? Let\'s connect.',
    'contact.email': 'Email Me',
    'footer.rights': 'All rights reserved.',
    'card.visit': 'Visit',
    'card.comingSoon': 'Coming Soon',
    'cta.title': 'Your Next Project',
    'cta.subtitle': 'Could be right here.',
    'cta.text': "Let's build something great together.",
    'cta.button': "Let's Talk"
  },
  pt: {
    'nav.work': 'Trabalho',
    'nav.about': 'Sobre',
    'nav.contact': 'Contacto',
    'hero.greeting': 'Olá, eu sou',
    'hero.title': 'Senior WordPress Engineer',
    'hero.intro': 'Desenvolvimento de soluções WordPress de alto desempenho para marcas icónicas. Mais de uma década de experiência a criar temas, plugins e arquiteturas escaláveis.',
    'hero.cta': 'Ver Trabalho',
    'portfolio.title': 'Trabalho Selecionado',
    'portfolio.subtitle': 'Marcas e projetos em que contribuí ao longo dos anos',
    'filter.all': 'Todos',
    'filter.corporate': 'Corporativo',
    'filter.ecommerce': 'E-commerce',
    'filter.editorial': 'Editorial',
    'filter.custom': 'Dev Custom',
    'about.title': 'Sobre Mim',
    'about.text1': 'Olá, sou Senior WordPress Engineer, com mais de 10 anos de experiência a fornecer soluções web de alto desempenho, escaláveis e fáceis de manter. Tenho uma sólida experiência em desenvolvimento personalizado de WordPress (temas e plugins), otimização de performance (Core Web Vitals / PageSpeed), WooCommerce e liderança técnica.',
    'about.text2': 'Preocupo-me em trazer a melhor arquitetura, melhorar processos e entregar soluções robustas. Sou altamente autónomo, orientado para a qualidade, e focado na manutenção a longo prazo e no impacto nos negócios.',
    'about.years': 'Anos de Experiência',
    'about.projects': 'Projetos Entregues',
    'about.brands': 'Marcas & Clientes',
    'contact.title': 'Entrar em Contacto',
    'contact.subtitle': 'Interessado em trabalhar juntos? Vamos conversar.',
    'contact.email': 'Enviar Email',
    'footer.rights': 'Todos os direitos reservados.',
    'card.visit': 'Visitar',
    'card.comingSoon': 'Em Breve',
    'cta.title': 'O Seu Próximo Projeto',
    'cta.subtitle': 'Pode estar aqui.',
    'cta.text': 'Vamos construir algo incrível juntos.',
    'cta.button': 'Vamos Conversar'
  }
};

// --- Color palette for card placeholders ---
const placeholderColors = [
  '#3b82f6', '#8b5cf6', '#06b6d4', '#10b981',
  '#f59e0b', '#ef4444', '#ec4899', '#6366f1',
  '#14b8a6', '#f97316', '#84cc16', '#0ea5e9'
];

// --- State ---
let currentLang = localStorage.getItem('portfolio-lang') || 'en';
let currentFilter = 'all';
let projects = [];

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  setupLanguageToggle();
  setupFilters();
  setupMobileMenu();
  applyLanguage(currentLang);
});

// --- Load projects from JSON ---
async function loadProjects() {
  try {
    const response = await fetch('projects.json');
    const data = await response.json();
    projects = data.projects;
    renderGrid();
  } catch (e) {
    console.error('Error loading projects:', e);
  }
}

// --- Render portfolio grid ---
function renderGrid() {
  const grid = document.getElementById('portfolioGrid');
  const filtered = currentFilter === 'all'
    ? projects
    : projects.filter(p => p.category === currentFilter);

  const cards = filtered.map((project, i) => {
    const name = project.name[currentLang] || project.name.en;
    const description = project.description[currentLang] || project.description.en;
    const role = project.role[currentLang] || project.role.en;
    const colorIndex = i % placeholderColors.length;
    const visitText = i18n[currentLang]['card.visit'];
    const comingSoonText = i18n[currentLang]['card.comingSoon'];

    const thumbnailHTML = project.thumbnail
      ? `<img src="${project.thumbnail}" alt="${name}" loading="lazy">`
      : `<div class="card-placeholder" style="background:${placeholderColors[colorIndex]}">${project.client.substring(0, 2).toUpperCase()}</div>`;

    let footerLink = '';
    if (project.url) {
      footerLink = `<a href="${project.url}" target="_blank" rel="noopener" class="card-link">${visitText} <span class="card-link-arrow">&rarr;</span></a>`;
    } else {
      footerLink = `<span class="card-coming-soon">${comingSoonText}</span>`;
    }

    return `
      <article class="card" style="animation-delay: ${i * 0.05}s">
        <div class="card-thumbnail">
          ${thumbnailHTML}
        </div>
        <div class="card-body">
          <p class="card-client">${project.client}</p>
          <h3 class="card-name">${name}</h3>
          <p class="card-description">${description}</p>
          <div class="card-tags">
            ${project.tech.map(t => `<span class="card-tag">${t}</span>`).join('')}
          </div>
          <div class="card-footer">
            <span class="card-year">${project.year}</span>
            ${footerLink}
          </div>
        </div>
      </article>
    `;
  });

  // CTA card — only show on "all" filter
  if (currentFilter === 'all') {
    const ctaTitle = i18n[currentLang]['cta.title'];
    const ctaSubtitle = i18n[currentLang]['cta.subtitle'];
    const ctaText = i18n[currentLang]['cta.text'];
    const ctaButton = i18n[currentLang]['cta.button'];

    cards.push(`
      <article class="card card-cta" style="animation-delay: ${filtered.length * 0.05}s">
        <a href="#contact" class="card-cta-inner">
          <div class="card-cta-content">
            <p class="card-cta-title">${ctaTitle}</p>
            <p class="card-cta-subtitle">${ctaSubtitle}</p>
            <p class="card-cta-text">${ctaText}</p>
            <span class="btn btn-primary card-cta-btn">${ctaButton} &rarr;</span>
          </div>
        </a>
      </article>
    `);
  }

  grid.innerHTML = cards.join('');
}

// --- Language toggle ---
function setupLanguageToggle() {
  const toggle = document.getElementById('langToggle');
  toggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'pt' : 'en';
    localStorage.setItem('portfolio-lang', currentLang);
    applyLanguage(currentLang);
    renderGrid();
  });
}

function applyLanguage(lang) {
  // Update data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang][key]) {
      el.textContent = i18n[lang][key];
    }
  });

  // Update toggle button visual
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });

  // Update html lang
  document.documentElement.lang = lang;
}

// --- Filters ---
function setupFilters() {
  const container = document.getElementById('filters');
  container.addEventListener('click', (e) => {
    if (!e.target.classList.contains('filter-btn')) return;

    container.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    currentFilter = e.target.dataset.filter;
    renderGrid();
  });
}

// --- Mobile menu ---
function setupMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const navRight = document.querySelector('.nav-right');

  toggle.addEventListener('click', () => {
    navRight.classList.toggle('open');
  });

  // Close menu when clicking a nav link
  navRight.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navRight.classList.remove('open');
    });
  });
}
