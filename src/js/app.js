import { classNames, select, settings } from './settings.js';
import Product from './components/Product.js';

const app = {
  init: function() {
    const thisApp = this;
    //console.log(this);
    
    thisApp.initPages();
    thisApp.initData();
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

    thisApp.pages = document.querySelector(select.containerOf.pages).children;   //znalezienie kontenera z id=pages który zawiera kody podstron
    thisApp.navLinks = document.querySelectorAll(select.nav.links);   //znalezienie wszystkie linki podstron

    const idFromHash = window.location.hash.replace('#/', '');    //z hasha z urlu strony uzyskujemy id podstrony, która ma zostać otwarta jako domyślna
    console.log(idFromHash);

                                                  //sprawdzamy czy ktoras z podstron pasuje do tego id ktore uzuskalismy z adresu strony
    let pageMatchingHash = thisApp.pages[0].id;   //jezeli nie -  zostanie otwarta pierwsza podstrona

    for(let page of thisApp.pages){               //jezeli tak - zostanie otwarta ta podstrona ktora pasowala do id uzyskanego z adresu strony
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }
    //console.log('pageMatchingHash',pageMatchingHash);

    thisApp.activatePage(pageMatchingHash);     //nastepnie aktywujemy odpowiednia podstrone

    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){     //nadanie eventListenerów do wszystkich linków ktore odsylaja do podstron
        const clickedElement = this;
        event.preventDefault();

        /* get page id from href attribute */
        const id = clickedElement.getAttribute('href').replace('#','');   //po kliknieciu w taki link uzyskujemy id z atrybutu href tego linka

        /* run thisApp.activatePage with that id */                 //aktywujemy odpowiednia podstrone
        thisApp.activatePage(id);

        /* change URL hash */
        window.location.hash = '#/' + id;         //przy aktywowaniu strony zmieniamy url hash
      });
    }
  },

  activatePage: function(pageId) {                                    //powinna ona nadać odpowiedniemu wrapperowi klase active
    const thisApp = this;

    /* add class 'active' to matching pages, remove from non-matching */
    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);  //po przecinku zamiast warunku if
    }

    /* add class 'active' to matching links, remove from non-matching */
    for(let link of thisApp.navLinks){
      link.classList.toggle(
      classNames.nav.active, 
      link.getAttribute('href') == '#' + pageId
      );
    }
  },
};

app.init();