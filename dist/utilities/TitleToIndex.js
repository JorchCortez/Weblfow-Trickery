/*!
 * Webflow Trickery v1.x
 * Have you ever tried fixing the same small thing over and over again on your webflow projects?
 * Well I have so I made a small compillation of the different fixes, utilities and tricks that will
 * not only make my life easier in the future but hopefuly yours as well.
 * (c) 2023 Jorge Cortez
 * MIT License
 * https://github.com/JorchCortez/Weblfow-Trickery
 */


/*
 * set social links with just one attribute
 * Requirements: 
 * 
 * Container element holding the text or content = wt-titleToIndex-element="container"
 * Container element that will hold the index = wt-titleToIndex-element="indexContainer"
 *
 * Optional: 
 * class for h1   = wt-titleToIndex-level1 = "{class name}"
 * class for h2   = wt-titleToIndex-level2 = "{class name}"
 * class for h3   = wt-titleToIndex-level3 = "{class name}"
 * class for h4   = wt-titleToIndex-level4 = "{class name}"
 * class for h5   = wt-titleToIndex-level5 = "{class name}"
 * class for h6   = wt-titleToIndex-level6 = "{class name}"
 */

let createMenuItem = (name, _class) => {
  let link = document.createElement('a');
  link.textContent = name; 
  link.classList.add(_class)
  link.href = `#${name}`;
  return link; 
} 

const SetTitleToIndex = () => {
  let WTContentWrapper = document.querySelector('[wt-titleToIndex-element="container"]');
  let container = document.querySelector('[wt-titleToIndex-element="indexContainer"]');
  let hLevels = [
    container.getAttribute('wt-titleToIndex-level1') || 'first',
    container.getAttribute('wt-titleToIndex-level2') || 'second',
    container.getAttribute('wt-titleToIndex-level3') || 'third',
    container.getAttribute('wt-titleToIndex-level4') || 'forth',
    container.getAttribute('wt-titleToIndex-level5') || 'fifth',
    container.getAttribute('wt-titleToIndex-level6') || 'sixth',
  ];
  
  let headers = WTContentWrapper.querySelectorAll('h1, h2, h3, h4, h5');

  if(!container || !WTContentWrapper) return;
  
  let SetIndex = (headers) => {
    headers.forEach(_h => {
      let index = Math.min(parseInt(_h.nodeName.charAt(1)) - 1, hLevels.length - 1);
      let level = hLevels[index] !== null ? hLevels[index] : 'last';

      container.append(createMenuItem(_h.innerText, level));
      _h.setAttribute('id', _h.innerText);
    });
  }
  
  SetIndex(headers);
}

document.addEventListener('DOMContentLoaded', SetTitleToIndex);
