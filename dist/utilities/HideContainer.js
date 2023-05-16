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
 * Hide a container in case the cms list within it is empty.
 * Requirements: 
 * Container with custom attribute fn-hidecontainer-element="container"
 * CMS List element within container with custom attribute fn-hidecontainer-element="list"
 * this can be used multiple times in the same page without an issue.
 */

const ContainerHideScan = () => {
    let hideContainers = document.querySelectorAll('[wt-hidecontainer-element^="container-"],[wt-hidecontainer-element="container"]');
		console.log(hideContainers)
    hideContainers.forEach((cmsContainer) => {
        let _cmsList = cmsContainer.querySelector('[wt-hidecontainer-element="list"]');
        if(!_cmsList) return;
        let _r = cmsContainer.getAttribute('wt-hidecontainer-remove');
        if(_r) {if(_cmsList.classList.contains("w-dyn-empty")) cmsContainer.remove();}
        else{if(_cmsList.classList.contains("w-dyn-empty")) cmsContainer.style.display = 'none';}
    });
}
ContainerHideScan();