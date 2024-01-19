/*!
 * Webflow Utilities v1.0.11
 * Have you ever tried fixing the same small thing over and over again on your webflow projects?
 * Well I have so I made a small compillation of the different fixes, utilities and tricks that will
 * not only make my life easier in the future but hopefuly yours as well.
 * (c) 2023 Jorge Cortez
 * MIT License
 * https://github.com/JorchCortez/Weblfow-Trickery
 */

const InitializeBASliders = () => {
    const BASliders = document.querySelectorAll('[wt-bna-element="slider"]');
    BASliders.forEach(slider => { 
        let sliderWrapper = slider.parentElement;
      slider.addEventListener('input', (e) => {
          e.stopPropagation()
          sliderWrapper.style.setProperty('--position', `${e.target.value}%`)
      })
    })
}

if (/complete|interactive|loaded/.test(document.readyState)) {
    InitializeBASliders();
} else { 
    window.addEventListener('DOMContentLoaded', function () { 
        InitializeBASliders();
    })
}
