/*!
 * Webflow Utilities v1.1.0
 * Have you ever tried fixing the same small thing over and over again on your webflow projects?
 * Well I have so I made a small compillation of the different fixes, utilities and tricks that will
 * not only make my life easier in the future but hopefuly yours as well.
 * (c) 2023 Jorge Cortez
 * MIT License
 * https://github.com/JorchCortez/Weblfow-Trickery
 */

const setupRangeSliders = ({inputLeft, inputRight, thumbLeft, thumbRight, range, rangeStart, rangeEnd, displayStart, displayEnd, sliderMin, sliderMax, sliderSteps}) => {

    let triggerEvent = (elem) =>{
        elem.dispatchEvent(new Event('input', { bubbles: true }));
    }

    let setLeftValue = () => {

        var _this = inputLeft,
            min = parseInt(_this.min),
            max = parseInt(_this.max);

        if(rangeStart === displayStart){
            rangeStart.value = inputLeft.value;
        }
        else {
            if(rangeStart.value >= rangeEnd.value){
                if(rangeStart) rangeStart.value = inputLeft.value;
                if(displayStart) displayStart.innerHTML = inputLeft.value;
            }
        }
            
        _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

        var percent = ((_this.value - min) / (max - min)) * 100;
        let posFix = parseInt(percent) / 11;
        thumbLeft.style.left = parseInt(percent) - parseInt(posFix) + "%";
        range.style.left = parseInt(percent) + "%";

        triggerEvent(rangeStart)
    }

    let setRightValue = () => {
        var _this = inputRight,
            min = parseInt(_this.min),
            max = parseInt(_this.max);

        if(rangeStart === displayEnd){
            if(rangeEnd) rangeEnd.value = inputRight.value;
        }
        else {
            if(rangeEnd.value >= rangeStart.value){
                if(rangeEnd) rangeEnd.value = inputRight.value;
                if(displayEnd) displayEnd.innerHTML = inputRight.value;
            }
        }

        _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

        var percent = ((_this.value - min) / (max - min)) * 100;

        let posFix = parseInt(percent / 10) - 10;
        thumbRight.style.right = (100 - parseInt(percent) + parseInt(posFix)) + "%";
        range.style.right = (100 - parseInt(percent)) + "%";

        triggerEvent(rangeEnd)
    }

    setLeftValue();
    setRightValue();

    inputLeft.addEventListener("input", setLeftValue);
    inputRight.addEventListener("input", setRightValue);
}

const setupInputBoxes = ({inputLeft, inputRight, thumbLeft, thumbRight, range, rangeStart, rangeEnd, displayStart, displayEnd, sliderMin, sliderMax, sliderSteps}) => {

    let setLeftValue = () => {
        if(rangeStart.value === null || rangeStart.value === "") {
            console.log("start val got cleared")

            if(displayStart){
                if(displayStart) displayStart.innerHTML = sliderMin;
            }
            inputLeft.value = sliderMin;
            thumbLeft.style.left = "0%";
            range.style.left = "0%";
        }
    }

    let setRightValue = () => {
        if(rangeEnd.value === null || rangeEnd.value === "") {
            console.log("start val got cleared")

            if(displayStart){
                if(displayEnd) displayEnd.innerHTML = sliderMax;
            }
            
            inputRight.value = sliderMax;
            thumbRight.style.right = "0%";
            range.style.right = "0%";
        }
    }

    rangeStart.addEventListener("input", setLeftValue);
    rangeEnd.addEventListener("input", setRightValue);
}

const checkElement = (element, name) => {
    if (!element) {
        console.log(`%c${name} element is missing`,"color: red; font-size: 12px; padding: 8px");
    }
};

const initializeRangeSlider = () => {
    const rangeSliders = document.querySelectorAll('[wt-rangeslider-element^="slider-"], [wt-rangeslider-element="slider"]');
    if(!rangeSliders) return;

    rangeSliders.forEach((rangeSlider) => {
        //get input values
        let sliderMin       = rangeSlider.getAttribute('wt-rangeslider-min');
        let sliderMax       = rangeSlider.getAttribute('wt-rangeslider-max');
        let sliderSteps     = rangeSlider.getAttribute('wt-rangeslider-steps');

        //getting range range slider's index if multiple
        let _triggerAttr = rangeSlider.getAttribute(`wt-rangeslider-element`);
        let index = _triggerAttr.replace('slider', '')

        //get displays and inputs if different.
        let rangeStart      = document.querySelector(`[wt-rangeslider-range="from${index}"]`)
        let rangeEnd        = document.querySelector(`[wt-rangeslider-range="to${index}"]`)
        let displayStart    = document.querySelector(`[wt-rangeslider-display="from${index}"]`)
        let displayEnd      = document.querySelector(`[wt-rangeslider-display="to${index}"]`)

        //getting required range slider elements
        let inputLeft       = rangeSlider.querySelector('[wt-rangeslider-element="input-left"]');
        let inputRight      = rangeSlider.querySelector('[wt-rangeslider-element="input-right"]');
        let thumbLeft       = rangeSlider.querySelector('[wt-rangeslider-element="thumb-left"]');
        let thumbRight      = rangeSlider.querySelector('[wt-rangeslider-element="thumb-right"]');
        let range           = rangeSlider.querySelector('[wt-rangeslider-element="range"]');


        if(!inputLeft || !inputRight || !thumbLeft || !thumbRight || !range || !sliderMin || !sliderMax ) {
            console.log("%cThanks for using Webflow Trickery!","color: red; font-size: 18px; padding: 8px");            
            console.log("%cIt seems like you're missing an element that is required for the integration.","color: red; font-size: 12px; padding: 8px");
            checkElement(inputLeft, "Input-left");
            checkElement(inputRight, "Input-right");
            checkElement(thumbLeft, "Thumb-left");
            checkElement(thumbRight, "Thumb-right");
            checkElement(thumbLeft, "Thumb-left");
            checkElement(thumbRight, "Thumb-right");
            checkElement(sliderMin, "Slider-Min");
            checkElement(sliderMax, "Slider-Max");
            checkElement(range, "Range");
            console.log("%cPlease keep in mind this elements must be insde of your container with the 'wt-rangeslider-element=slider' element","color: red; font-size: 12px; padding: 8px");
            return;
        }
        
        inputLeft.setAttribute("min", sliderMin);
        inputLeft.setAttribute("max", sliderMax);
        inputLeft.setAttribute("step", sliderSteps);
        inputRight.setAttribute("min", sliderMin);
        inputRight.setAttribute("max", sliderMax);
        inputRight.setAttribute("step", sliderSteps);
        
        let sliderData = {inputLeft, inputRight, thumbLeft, thumbRight, range, rangeStart, rangeEnd, displayStart, displayEnd, sliderMin, sliderMax, sliderSteps}
        
        setupRangeSliders(sliderData);
        if(rangeStart && rangeEnd) {
            setupInputBoxes(sliderData);
        }
    })
}

if (/complete|interactive|loaded/.test(document.readyState)) {
    initializeRangeSlider();
} else {
    window.addEventListener('DOMContentLoaded', function () {
        initializeRangeSlider();
    })
}
