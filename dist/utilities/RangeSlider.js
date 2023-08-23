/*!
 * Webflow Utilities v1.1.0
 * Have you ever tried fixing the same small thing over and over again on your webflow projects?
 * Well I have so I made a small compillation of the different fixes, utilities and tricks that will
 * not only make my life easier in the future but hopefuly yours as well.
 * (c) 2023 Jorge Cortez
 * MIT License
 * https://github.com/JorchCortez/Weblfow-Trickery
 */

const setupRangeSlider =(inputLeft, inputRight, thumbLeft, thumbRight, range) => {
    let setLeftValue = () => {
        var _this = inputLeft,
            min = parseInt(_this.min),
            max = parseInt(_this.max);

        _this.value = Math.min(parseInt(_this.value),parseInt(inputRight.value) - 1 );

        var percent = ((_this.value - min) / (max - min)) * 100;
        let posFix = parseInt(percent) / 11;
        thumbLeft.style.left = parseInt(percent) - parseInt(posFix) + "%";
        range.style.left = parseInt(percent) + "%";
    }

    let setRightValue = () => {
        var _this = inputRight,
            min = parseInt(_this.min),
            max = parseInt(_this.max);

        _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1 );

        var percent = ((_this.value - min) / (max - min)) * 100;
        
        let posFix = parseInt(percent/10) - 10;
        thumbRight.style.right = (100 - parseInt(percent) + parseInt(posFix)) + "%";
        range.style.right = (100 - parseInt(percent)) + "%";
    }

    setLeftValue();
    setRightValue();

    inputLeft.addEventListener("input", setLeftValue);
    inputRight.addEventListener("input", setRightValue);
}

const initializeRangeSlider = () => {
	const rangeSliders = document.querySelectorAll('[wt-rangeslider-element="slider"]');
	
	rangeSliders.forEach((rangeSlider) => {
		let inputLeft = rangeSlider.querySelector('[wt-rangeslider-element="input-left"]');
		let inputRight = rangeSlider.querySelector('[wt-rangeslider-element="input-right"]');
		let thumbLeft = rangeSlider.querySelector('[wt-rangeslider-element="thumb-left"]');
		let thumbRight = rangeSlider.querySelector('[wt-rangeslider-element="thumb-right"]');
		let range = rangeSlider.querySelector('[wt-rangeslider-element="range"]');
        setupRangeSlider(inputLeft, inputRight, thumbLeft, thumbRight, range)
	})
}

if (/complete|interactive|loaded/.test(document.readyState)) {
    initializeRangeSlider();
} else { 
    window.addEventListener('DOMContentLoaded', function () { 
        initializeRangeSlider();
    })
}
