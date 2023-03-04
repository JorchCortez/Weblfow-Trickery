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

    let social_fb = document.querySelectorAll('[wf-util-share-facebook="true"]');
    let social_tw = document.querySelectorAll('[wf-util-share-twitter="true"]');
    let social_ln = document.querySelectorAll('[wf-util-share-linkedin="true"]');
    let social_wp = document.querySelectorAll('[wf-util-share-whatsapp="true"]');
    let social_cp = document.querySelectorAll('[wf-util-share-copy="true"]');
    if(social_fb.length === 0 && social_tw.length === 0 && social_ln.length === 0 && social_wp.length === 0 && social_cp.length === 0) return;
    if (social_fb) {
        social_fb.forEach((social_btn) => {
            social_btn.setAttribute("href", 'https://www.facebook.com/sharer/sharer.php?u=' + url + '&title=' + title + '%3F');
            social_btn.setAttribute("target", '_blank');
        });
    }
    if (social_tw) {
        social_tw.forEach((social_btn) => {  
            social_btn.setAttribute("href", 'https://twitter.com/share?url=' + url + '&title=' + title);
            social_btn.setAttribute("target", '_blank');
        });
    }
    if (social_ln) {
        social_ln.forEach((social_btn) => {
            social_btn.setAttribute("href", 'https://www.linkedin.com/shareArticle?mini=true&url=' + url + '%2F&title=' + title + '&summary=');
            social_btn.setAttribute("target", '_blank');
        });
    }
    if (social_wp) {
        social_wp.forEach((social_btn) => {
            social_btn.setAttribute("href", 'https://wa.me/?text=' + url + '&title=' + title + '%3F');
            social_btn.setAttribute("target", '_blank');
        });
    }
    if (social_cp) {
        social_cp.forEach((social_btn) => {
            social_btn.addEventListener('click', () => {
                navigator.clipboard.writeText(`${url}`);
                alert(`${url} copied to clipboard!`);
            });
        });
    }
}

SetSocialShare();