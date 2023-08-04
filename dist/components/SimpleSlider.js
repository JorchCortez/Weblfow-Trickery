/*!
 * Webflow Trickery v1.0.0
 * Have you ever tried fixing the same small thing over and over again on your webflow projects?
 * Well I have so I made a small compillation of the different fixes, utilities and tricks that will
 * not only make my life easier in the future but hopefuly yours as well.
 * (c) 2023 Jorge Cortez
 * MIT License
 * https://github.com/JorchCortez/Weblfow-Trickery
 */

let InitializeSliders = () => {
    const sliders = document.querySelectorAll('[wt-simpleslider-element^="list-"], [wt-simpleslider-element="list"]');

    if (!sliders) return;

    sliders.forEach(slider => {
        let sliderSpeed = slider.getAttribute("wt-simpleslider-speed") || 2;
        let isDown = false;
        let startX;
        let scrollLeft;

        //Mouse Options
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            cancelMomentumTracking(momentumID);
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
            beginMomentumTracking(velX, slider, momentumID);
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * sliderSpeed;
            var prevScrollLeft = slider.scrollLeft;
            slider.scrollLeft = scrollLeft - walk;
            velX = slider.scrollLeft - prevScrollLeft;
        });


        //Touch options
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.targetTouches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            cancelMomentumTracking(momentumID);
        });

        slider.addEventListener('touchcancel', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('touchend', () => {
            isDown = false;
            slider.classList.remove('active');
            beginMomentumTracking(velX, slider, momentumID);
        });

        slider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.targetTouches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * sliderSpeed;
            var prevScrollLeft = slider.scrollLeft;
            slider.scrollLeft = scrollLeft - walk;
            velX = slider.scrollLeft - prevScrollLeft;
        });

        //Mouse Wheel options
        slider.addEventListener('wheel', (e) => {
            cancelMomentumTracking(momentumID);
        });

        // Momentum 
        var velX = 0;
        var momentumID;

        let beginMomentumTracking = () => {
            cancelMomentumTracking();
            momentumID = requestAnimationFrame(() => momentumLoop());
        }

        let cancelMomentumTracking = () => {
            cancelAnimationFrame(momentumID);
        }

        let momentumLoop = () => {
            slider.scrollLeft += velX;
            velX *= 0.95;
            if (Math.abs(velX) > 0.5) {
                momentumID = requestAnimationFrame(() => momentumLoop());
            }
        }

    })
}


if (/complete|interactive|loaded/.test(document.readyState)) {
    InitializeSliders();
} else {
    window.addEventListener('DOMContentLoaded', function () {
        InitializeSliders();
    })
}