function gb_load_css(path) {
    let css = document.createElement('link');
    css.rel = 'stylesheet';
    css.media = 'all';
    css.href = path;
    document.getElementsByTagName('head')[0].appendChild(css);
}