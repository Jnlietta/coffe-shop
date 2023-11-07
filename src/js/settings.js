export const select = {
  templateOf: {
    storeProduct: '#template-store-product',
  },
  containerOf: {
    store: '.product-list',
    pages: '#pages',
    carousel: '.main-carousel',
    title: '.header__title',
  },
  nav: {
    links: '.nav__link',
  },
};

export const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  },
};

export const settings = {    
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    products: 'products',      
  },
};

export const templates = {
  storeProduct: Handlebars.compile(document.querySelector(select.templateOf.storeProduct).innerHTML),
};