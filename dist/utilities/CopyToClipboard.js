/*!
 * Webflow Trickery v1.x
 * Have you ever tried fixing the same small thing over and over again on your webflow projects?
 * Well I have so I made a small compillation of the different fixes, utilities and tricks that will
 * not only make my life easier in the future but hopefuly yours as well.
 * (c) 2023 Jorge Cortez
 * MIT License
 * https://github.com/JorchCortez/Weblfow-utils
 */


/*
 * set social links with just one attribute
 * Requirements: 
 * A link for each social media with custom attribute accordingly wt-share="{Social}"
 * 
 * Trigger element  = wt-copycb-element="trigger"
 * Target element   = wt-copycb-element="target"
 * textTarget       = wt-copycb-element="textTarget"
 * copiedMsg        = wt-copycb-copiedMsg
 * activeClass      = wt-copycb-activeClass
 */

const SetCopyToClipboard = () => {
    const elements = document.querySelectorAll('[wt-copycb-element^="trigger-"], [wt-copycb-element="trigger"]');
    elements.forEach((_trigger) => {
        let _triggerAttr    = _trigger.getAttribute(`wt-copycb-element`);
        let index           = _triggerAttr.replace('trigger','')
        let _target         = document.querySelector(`[wt-copycb-element="target${index}"]`);

        _trigger.addEventListener('click', () => { 
            let textToCopy  = _target.innerText;
            let copiedTxt   = _trigger.getAttribute("wt-copycb-copiedMsg");
            let activeClass = _trigger.getAttribute('wt-copycb-activeClass');
            let _defaultTxt = _trigger.innerText;
            let textTarget  = document.querySelector(`[wt-copycb-element="textTarget${index}"]`)

            if (copiedTxt) {
                if(textTarget) textTarget.innerText = copiedTxt;
                else _trigger.innerText = copiedTxt;
            }
            if (activeClass) _trigger.classList.toggle(activeClass);
            
            setTimeout(() => {
                if (copiedTxt){ 
                    if(textTarget) textTarget.innerText = _defaultTxt;
                    else _trigger.innerHTML = _defaultTxt;
                } 
                if (activeClass) _trigger.classList.toggle(activeClass);
            }, 2000);

            navigator.clipboard.writeText(textToCopy);
        });
    }); 
}

SetCopyToClipboard();