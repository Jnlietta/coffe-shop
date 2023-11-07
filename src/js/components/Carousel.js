class Carousel {
  constructor(elem) {
    const thisCarousel = this;

    thisCarousel.render(elem);
    thisCarousel.initPlugin();
  }
  
  render(elem) {
    // save elem ref to this obj
    const thisCarousel = this;

    thisCarousel.element = elem; 
    //console.log('carousel:',elem);    
  }
  
  initPlugin() {
    const thisCarousel = this;
    // use plugin to create carousel on thisCarousel.element
    new Flickity( thisCarousel.element, {
      // options
      cellAlign: 'left',
      contain: true,
      prevNextButtons: false,
      autoPlay: 5000,
      pageDots: false
    });
  }
}

export default Carousel;