import { select, templates } from '../settings.js';

class Product {
  constructor(id, data){
    const thisProduct  = this;

    thisProduct.id = id;        //id produktu z danych pobranych z serwera
    thisProduct.data = data;    //dane produktu

    thisProduct.renderInStore();
  }

  renderInStore(){
    const thisProduct = this;

    /* generate HTML based on template with data*/
    const generatedHTML = templates.storeProduct(thisProduct.data);
    console.log(generatedHTML);

    /* create element using utils.createElementFromHTML */
    //thisProduct.elementDOM = utils.createDOMFromHTML(generatedHTML); //czym jest product.element, tworzymy ze string !prawdziwy element html!

    /* find store container */
    thisProduct.storeContainer = document.querySelector(select.containerOf.store);

    /* add element to page */
    thisProduct.storeContainer.appendChild(thisProduct.elementDOM); //dodaj dziecko do elementu nowy html
  }
}

export default  Product;