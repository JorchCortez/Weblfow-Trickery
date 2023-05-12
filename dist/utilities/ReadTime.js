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
    let timeDisplay = document.querySelectorAll('[wt-readtime-element="display"]');
    let container = document.querySelector('[wt-readtime-element="article"]'); 
    timeDisplay.forEach((display, i) => { 
        let wordSpeed = display.getAttribute("wt-readtime-words");
        let suffix = display.getAttribute('wt-readtime-suffix');
        let smallsuffix = display.getAttribute('wt-readtime-smallsuffix');
        
        const text = container.innerText;
        const wpm = wordSpeed || 225; 
        const words = text.trim().split(/\s+/).length;
        const rawTime = words / wpm;
        if(rawTime < 1 ){ 
            display.innerText = (smallsuffix) ? smallsuffix : "less than a minute.";
            return;
        }
        else if(rawTime == 1 ) { 
            display.innerText = "a minute.";
            return;
        }
        else {
            display.innerText = (suffix) ? Math.ceil(rawTime) + " " + suffix : Math.ceil(rawTime) + " minutes.";
        }
    });
}

readingTime();