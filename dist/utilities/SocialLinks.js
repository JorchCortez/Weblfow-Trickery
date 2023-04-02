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
 * set social links with just one attribute
 * Requirements: 
 * A link for each social media with custom attribute accordingly wf-util-share-{Social}="true"
 */
const SetSocialShare = () => {
    let title = document.title;
    let url = window.location.href;

    let social_fb   = document.querySelectorAll('[wf-util-share="facebook"]');
    let social_tw   = document.querySelectorAll('[wf-util-share="twitter"]');
    let social_ln   = document.querySelectorAll('[wf-util-share="linkedin"]');
    let social_wp   = document.querySelectorAll('[wf-util-share="whatsapp"]'); 
    let social_pi   = document.querySelectorAll('[wf-util-share="pinterest"]'); 
    let social_red  = document.querySelectorAll('[wf-util-share="reddit"]');  
    let social_cp   = document.querySelectorAll('[wf-util-share="copy"]');

    if( social_fb.length === 0 && social_tw.length === 0 && social_ln.length === 0 && social_wp.length === 0 && social_pi.length === 0 &&
        social_red.length === 0 && social_cp.length === 0 ) return;

    if (social_fb) {
        social_fb.forEach((social_btn) => {
            social_btn.setAttribute("href", 'https://www.facebook.com/sharer/sharer.php?u=' + url + '&title=' + title );
            social_btn.setAttribute("target", '_blank');
        });
    }
    if (social_tw) {
        social_tw.forEach((social_btn) => {  
            social_btn.setAttribute("href", 'https://twitter.com/share?url=' + url + '&title=' + title );
            social_btn.setAttribute("target", '_blank');
        });
    }
    if (social_ln) {
        social_ln.forEach((social_btn) => {
            social_btn.setAttribute("href", 'https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title );
            social_btn.setAttribute("target", '_blank');
        });
    }
    if (social_wp) {
        social_wp.forEach((social_btn) => {
            social_btn.setAttribute("href", 'https://wa.me/?text=' + url + '&title=' + title );
            social_btn.setAttribute("target", '_blank');
        });
    }
    if (social_pi) {
        social_pi.forEach((social_btn) => {
            social_btn.setAttribute("href", 'http://pinterest.com/pin/create/button/?url=' + url + '&description=' + title );
            social_btn.setAttribute("target", '_blank');
        });
    }
    if (social_red) {
        social_red.forEach((social_btn) => {
            social_btn.setAttribute("href", 'http://www.reddit.com/submit?url=' + url + '&title=' + title );
            social_btn.setAttribute("target", '_blank');
        });
    } 
    if (social_cp) {
        social_cp.forEach((social_btn) => {
            social_btn.addEventListener('click', () => {
                navigator.clipboard.writeText(`${url}`);
                console.log(`${url} copied to clipboard!`);
            });
        });
    }
}

SetSocialShare();