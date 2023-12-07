
const bannerContainer = document.querySelector('[wt-carousel-element="container"]');
const bannerControlsContainer = document.querySelector('[wt-carousel-element="controls"]');
const bannerItems = document.querySelectorAll('[wt-carousel-element="slide"]');
let prev = "previous", next = "next", dots="true", arrows="true", customNext, customPrev;
const bannerControls = [prev,next] ;
let autoPlayTimeout = undefined;

if(bannerContainer){
	prev = escape(bannerContainer.getAttribute('wt-carousel-prev')) || "previous";
	next = escape(bannerContainer.getAttribute('wt-carousel-next')) || "next";
	dots = bannerContainer.getAttribute('wt-carousel-dots') || "false";
	arrows = bannerContainer.getAttribute('wt-carousel-arrows') || "false";
	customNext = bannerContainer.hasAttribute('wt-carousel-arrowNext') ? bannerContainer.getAttribute('wt-carousel-arrowNext') : null;
	customPrev = bannerContainer.hasAttribute('wt-carousel-arrowprev') ? bannerContainer.getAttribute('wt-carousel-arrowprev') : null;
}

class Carousel {
  constructor(container, items, controls){
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }
  
  findMiddleIndex() {
    return Math.floor(this.carouselArray.length / 2);
  }

  rotateArray(selectedSlide) {
    const selectedIndex = this.carouselArray.findIndex(item => Number(item.dataset.slide) === selectedSlide);

    if (selectedIndex !== -1) {
      const middleIndex = this.findMiddleIndex();

      let newOrder = [];
      for (let i = 0; i < this.carouselArray.length; i++) {
        const newIndex = (i + middleIndex - selectedIndex + this.carouselArray.length) % this.carouselArray.length;
        newOrder[newIndex] = this.carouselArray[i];
      }

      this.carouselArray = newOrder;
      return this.carouselArray;
    } else {
      console.error(`Slide ${selectedSlide} not found in the array.`);
      return this.carouselArray;
    }
  }
  
  setCarousel(){
    this.carouselArray.forEach((slide, index) =>{
      	slide.setAttribute('data-slide', index)
	slide.classList.add('wt-carousel-slide')
    })
  }
  
  updateGal(){
    let dots = document.querySelectorAll('[data-linkedslide]');
    this.carouselArray.forEach(el => {
      el.classList.remove('wt-carousel-i-1');
      el.classList.remove('wt-carousel-i-2');
      el.classList.remove('wt-carousel-i-3');
      el.classList.remove('wt-carousel-i-4');
      el.classList.remove('wt-carousel-i-5');
    })
    this.carouselArray.slice(0,5).forEach((el, i) => {
      el.classList.add(`wt-carousel-i-${i+1}`);
    })
    let index = this.findMiddleIndex();
    dots.forEach(d => {
      d.classList.remove('active');
      if(d.dataset.linkedslide == this.carouselArray[index].dataset.slide)
      d.classList.add('active');
    })
  }
  
  setCurrentState(dir) {
    if (dir.className === `wt-carousel-controls-${this.carouselControls[0]}`) {
      const lastItem = this.carouselArray.pop();
      this.carouselArray.unshift(lastItem);
    } else {
      const firstItem = this.carouselArray.shift();
      this.carouselArray.push(firstItem);
    }
    this.updateGal();
  }
  
  setControls() {
    if(dots === "true") {
      this.carouselArray.forEach((card, index) => {
        let dot = document.createElement('button');
        dot.setAttribute("data-linkedslide", index);
        dot.classList.add('wt-slider-dot');
        bannerControlsContainer.appendChild(dot);
      })
    }
    if(arrows === "true"){
      let _prev = document.createElement('button'), 
          _next = document.createElement('button');
      _prev.setAttribute("data-control", 'prev');
      _next.setAttribute("data-control", 'next');
      
      _prev.className = `wt-carousel-controls-${prev}`;
      bannerControlsContainer.prepend(_prev);
      document.querySelector(`.wt-carousel-controls-${prev}`).innerText = prev;
      
      _next.className = `wt-carousel-controls-${next}`;
      bannerControlsContainer.append(_next);
      document.querySelector(`.wt-carousel-controls-${next}`).innerText = next;
    }
    if(customNext && customPrev){
      let _prev = document.getElementById(customPrev), 
          _next = document.getElementById(customNext);
      _prev.setAttribute("data-control", 'prev');
      _next.setAttribute("data-control", 'next');
      
      _prev.className = `wt-carousel-controls-${prev}`;
      bannerControlsContainer.prepend(_prev);
      
      _next.className = `wt-carousel-controls-${next}`;
      bannerControlsContainer.append(_next);
    }
  } 
  
  useControls(){
    const triggers = [...bannerControlsContainer.childNodes];
    triggers.forEach(control => {
      if(control.hasAttribute('data-control')){
        control.addEventListener('click', e => {
          e.preventDefault();
          this.setCurrentState(control)
          clearTimeout(autoPlayTimeout);
          this.autoPlay();
        })
      }
      else if(control.hasAttribute('data-linkedslide')) {
        control.addEventListener('click', e => {
          e.preventDefault();
          const selectedSlide = Number(control.dataset.linkedslide);
          this.carouselArray = this.rotateArray(selectedSlide);
          this.updateGal();
          clearTimeout(autoPlayTimeout);
          this.autoPlay();
        });
      }
    })
  }
  autoPlay() {
    autoPlayTimeout = setTimeout(() => {
      const firstItem = this.carouselArray.shift();
      this.carouselArray.push(firstItem);
      this.autoPlay();
      this.updateGal();
    }, 3000)
	}

  initializeSlider(){ 
      this.setCarousel();
      this.setControls();
      this.useControls();
      this.carouselArray.unshift(this.carouselArray.pop());
      this.carouselArray.unshift(this.carouselArray.pop());
      this.updateGal();
      this.autoPlay();
  }
}



if (/complete|interactive|loaded/.test(document.readyState)) {
	const bannerCarousel = new Carousel(bannerContainer, bannerItems, bannerControls);
	bannerCarousel.initializeSlider();
} else { 
    window.addEventListener('DOMContentLoaded', function () { 
	const bannerCarousel = new Carousel(bannerContainer, bannerItems, bannerControls);
	bannerCarousel.initializeSlider();
    })
}
