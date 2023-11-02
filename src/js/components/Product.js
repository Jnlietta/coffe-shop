import { select, templates } from '../settings.js';
import { utils } from '../utils.js';

class Product {
  constructor(id, data){
    const thisProduct  = this;

    thisProduct.id = id;        //id of product from data downloaded from server
    thisProduct.data = data;    //product data

    thisProduct.renderInStore();
  }

  renderInStore(){
    const thisProduct = this;

    /* generate HTML based on template with data*/
    const generatedHTML = templates.storeProduct(thisProduct.data);
    
    /* create element using utils.createElementFromHTML */
    thisProduct.element = utils.createDOMFromHTML(generatedHTML);
    //console.log('element',thisProduct.element);

    /* create clone of this element */
    const cloneElement = thisProduct.element.cloneNode(true);
    //console.log('clone',cloneElement);

    /* find store containers */
    thisProduct.storeContainers = document.querySelectorAll(select.containerOf.store);
    //console.log('storeContainers', thisProduct.storeContainers);

    thisProduct.homePageStore = thisProduct.storeContainers[0];
    thisProduct.productsPageStore = thisProduct.storeContainers[1];

    //console.log('0',thisProduct.homePageStore);
    //console.log('1',thisProduct.productsPageStore);
    
    /* add element to subpages home and pdoducts */
    thisProduct.homePageStore.appendChild(thisProduct.element); 
    thisProduct.productsPageStore.appendChild(cloneElement);
  }
}

export default  Product;