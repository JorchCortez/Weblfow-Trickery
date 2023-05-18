/*!
 * Webflow Utilities v1.0.0
 * Have you ever tried fixing the same small thing over and over again on your webflow projects?
 * Well I have so I made a small compillation of the different fixes, utilities and tricks that will
 * not only make my life easier in the future but hopefuly yours as well.
 * (c) 2023 Jorge Cortez
 * MIT License
 * https://github.com/JorchCortez/Weblfow-utils
 */

let LimitText = () => {

    let cardsText = document.querySelectorAll('[wt-limittext-element="text"]');
    for (text of cardsText) {
        let textLength = text.getAttribute("wt-limittext-length") || 300 ;
        var Description = text.innerText;
        if (Description.length > textLength) {
            var shortDesc = Description.substring(0, textLength) + "...";
            text.innerText = shortDesc;
        }
    }
}

LimitText();