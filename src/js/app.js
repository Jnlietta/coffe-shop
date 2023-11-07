import { classNames, select, settings } from './settings.js';
import Product from './components/Product.js';
import Carousel from './components/Carousel.js';

const app = {
  init: function() {
    const thisApp = this;
    //console.log(this);
    
    thisApp.randomTitle();
    thisApp.initPages();
    thisApp.initData();
    thisApp.initCarousel();
  },

  initData: function() {
    const thisApp = this;

    const url = settings.db.url + '/' + settings.db.products;
    thisApp.data = {};
    fetch(url)
      .then((rawResponse) => {
        return rawResponse.json();
      })
      .then((parsedResponse) => {
        /*save parsedResponse as thisApp.data.products*/
        thisApp.data.products = parsedResponse;
        /*execute initStore method */
        thisApp.initStore();
      });
  },

  initStore: function() {
    const thisApp = this;

    for(let productData in thisApp.data.products){
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },

  initPages: function() {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;   
    thisApp.navLinks = document.querySelectorAll(select.nav.links);   

    const idFromHash = window.location.hash.replace('#/', '');    
    //console.log(idFromHash);

    let pageMatchingHash = thisApp.pages[0].id;  

    for(let page of thisApp.pages){               
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }
    //console.log('pageMatchingHash',pageMatchingHash);

    thisApp.activatePage(pageMatchingHash);     

    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){     
        const clickedElement = this;
        event.preventDefault();

        /* get page id from href attribute */
        const id = clickedElement.getAttribute('href').replace('#','');   

        /* run thisApp.activatePage with that id */                 
        thisApp.activatePage(id);

        /* change URL hash */
        window.location.hash = '#/' + id;         
      });
    }
  },

  activatePage: function(pageId) {                                    
    const thisApp = this;

    /* add class 'active' to matching pages, remove from non-matching */
    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);  
    }

    /* add class 'active' to matching links, remove from non-matching */
    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active, 
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  initCarousel: function() {
    const thisApp = this;

    thisApp.carouselsWrapper = document.querySelector(select.containerOf.carousel);
    //console.log('app:',thisApp.carouselsWrapper);

    thisApp.Carousel = new Carousel(thisApp.carouselsWrapper);
  },

  randomTitle: function() {
    const thisApp = this;

    thisApp.titleWrapper = document.querySelector(select.containerOf.title);

    let randomNumber = Math.floor(Math.random() * 3 + 1);

    if (randomNumber == 1){
      thisApp.headerHTML = '<h1>HOME OF</h1><h1>ORIGINAL TASTES</h1>';
    } else if (randomNumber == 2){
      thisApp.headerHTML = '<h1>REAL VENEZUELA,</h1><h1>REAL COFFE</h1>';
    } else if (randomNumber == 3){
      thisApp.headerHTML = '<h1>TASTE REAL</h1><h1>VENEZUELA</h1>';
    }

    thisApp.titleWrapper.innerHTML = thisApp.headerHTML;
  }
};

app.init();