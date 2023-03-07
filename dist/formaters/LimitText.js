/*!
 * Webflow Utilities v1.0.0
 * Have you ever tried fixing the same small thing over and over again on your webflow projects?
 * Well I have so I made a small compillation of the different fixes, utilities and tricks that will
 * not only make my life easier in the future but hopefuly yours as well.
 * (c) 2023 Jorge Cortez
 * MIT License
 * https://github.com/JorchCortez/Weblfow-utils
 */

/*
 * Limit the length of a text
 * Requirements: 
 * Element with custom attribute wf-util-limittext-item="text" containing the text 
 * Optional: 
 * Custom attribute wf-util-limittext-length in that element containing the character length, this is optional default is set to 300
 */

let LimitText = () => {

    let cardsText = document.querySelectorAll('[wf-util-limittext-item="text"]');
    let textLength = timeDisplay.getAttribute("wf-util-limittext-length") || 300 ;
    console.log(textLength)
    for (text of cardsText) {
        var Description = text.innerText;
        if (Description.length > textLength) {
            var shortDesc = Description.substring(0, textLength) + "...";
            text.innerText = shortDesc;
        }
    }
}

LimitText();