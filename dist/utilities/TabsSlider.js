/*!
 * Webflow Utilities v1.2.0
 * Have you ever tried fixing the same small thing over and over again on your webflow projects?
 * Well I have so I made a small compillation of the different fixes, utilities and tricks that will
 * not only make my life easier in the future but hopefuly yours as well.
 * (c) 2023 Jorge Cortez
 * MIT License
 * https://github.com/JorchCortez/Weblfow-Trickery
 * 
 * This code is a sligtly modified version of the Auto Rotate Webflow Tabs by Flowbase.co (v1.4 Updated 10/04/2023) 
 * fixed for reusability in any project using attributes instead of classes, feel free to check it out and if needs any update 
 * you can open an issue in github.
 */

var Webflow = Webflow || [];
Webflow.push(function () {
    //Allow site to load in case there's any extra integrations that require it
    setTimeout(function () {

        let tabsComponent = document.querySelectorAll("[wt-tabSlider-element='tabs']");

        if (tabsComponent) {
            tabsComponent.forEach(tabs => {
                
                let timeout = tabs.getAttribute("wt-tabSlider-speed") || 5000;
                let tabBtns = tabs.querySelector("[wt-tabSlider-element='menu']");
                var tb = Array.from(tabBtns.children);

                const tabLoop = (tm, timeout) => {
                    tabTimeout = setTimeout(setTabTimeout, timeout, tm); // 5 Second Rotation
                }

                const setTabTimeout = (tm) => {
                    var $next = tm.querySelector(".w--current").nextElementSibling;
                    if ($next) {
                        $next.click(); // user click resets timeout
                    } else {
                        tm.firstChild.click();
                    }
                }

                // Fix for Safari
                if (navigator.userAgent.includes("Safari")) {tb.forEach((t) => (t.focus = function () {const x = window.scrollX, y = window.scrollY;const f = () => {setTimeout(() => window.scrollTo(x, y), 1);t.removeEventListener("focus", f)};t.addEventListener("focus", f);HTMLElement.prototype.focus.apply(this, arguments)}));}
                
                // Reset Loops
                tb.forEach(tBtn => {
                    tBtn.addEventListener('click', function (e) {
                        e.preventDefault();
                        clearTimeout(tabTimeout);
                        tabLoop(tabBtns, timeout);
                    }, false);
                })

                // Start Tabs
                var tabTimeout;
                clearTimeout(tabTimeout);
                tabLoop(tabBtns, timeout);
            })
        }
    }, 500)
});