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
 * Showing the time to read an article.
 * Requirements: 
 * Element with custom attribute wf-util-readtime-item="display" for displaying the time
 * Element with custom attribute wf-util-readtime-item="article" in the article container
 * Optional: 
 * Custom attribute wf-util-readtime-words in the display element
 */

let readingTime = () => {
    let timeDisplay = document.querySelectorAll('[wf-util-readtime-item="display"]');
    let container = document.querySelector('[wf-util-readtime-item="article"]'); 

    timeDisplay.forEach((display, i) => { 
        let wordSpeed = display.getAttribute("wf-util-readtime-words");
        let suffix = display.getAttribute('wf-util-readtime-suffix');
        let smallsuffix = display.getAttribute('wf-util-readtime-smallsuffix');
        
        const text = container.innerText;
        const wpm = wordSpeed || 225; 
        const words = text.trim().split(/\s+/).length;
        const rawTime = words / wpm;

        if(rawTime < 1 ){ 
            display.innerText = "less than a minute" + (smallsuffix) ? smallsuffix : ".";
            return;
        }
        else {
            display.innerText = Math.ceil(rawTime) + (suffix) ? suffix : " minutes.";
        }
    });
}

readingTime();