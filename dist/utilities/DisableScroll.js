
    // Stop body scroll when mobile menu is open
    // Solution was found on the following link: 
    // https://discourse.webflow.com/t/disable-scroll-when-fullscreen-menu-is-open/127626/7
    const body = document.body;

    function letBodyScroll(bool) {
        if (bool)
            body.style.overflow = 'hidden';
        else
            body.style.overflow = 'auto';
    }
    const targetNode = document.querySelector('.w-nav-button');
    const config = {
        attributes: true,
        childList: false,
        subtree: false
    };
    const callback = function (mutationsList, observer) {
        for (let i = 0; i < mutationsList.length; i++) {
            if (mutationsList[i].type === 'attributes') {
                const menuIsOpen = mutationsList[i].target.classList.contains('w--open');
                letBodyScroll(menuIsOpen);
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);