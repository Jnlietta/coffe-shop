import { settings } from './settings.js';
import Product from './components/Product.js';

const app = {
  init: function() {
    const thisApp = this;
    console.log(this);
    
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
};

app.init();