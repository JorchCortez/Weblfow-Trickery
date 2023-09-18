const WTLoadFn = () => {
    let LoaderContainer = document.querySelectorAll('[wt-PageLoader-element="container"]');
    let LoaderProgress = document.querySelectorAll(' [wt-PageLoader-element="progress"]');

    //Initializing image page's image count
    var img = document.images, c = 0, tot = img.length;

    function imgLoaded() {
        c += 1;
        var perc = ((100 / tot * c) << 0) + '%';
            if(LoaderProgress) {
                LoaderProgress.innerHTML = perc;
            }
        if (c === tot) return doneLoading();
    }

    function doneLoading() {
            //TODO Hide LoaderContainer
        setTimeout(function () {
            LoaderContainer.remove()
        }, 1500);
    }

    for (var i = 0; i < tot; i++) {
        var tImg = new Image();
        tImg.onload = imgLoaded;
        tImg.onerror = imgLoaded;
        tImg.src = img[i].src;
    }
}

document.addEventListener('DOMContentLoaded', WTLoadFn, false);