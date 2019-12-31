var swscript = document.getElementById("sw");

if ("serviceWorker" in navigator) {
    if (navigator.serviceWorker.controller) {
        console.log("Active service worker found, no need to register");
    } else {
        // Register the service worker
        navigator.serviceWorker
        .register(swscript.getAttribute('data-swurl'))
        .then(function (reg) {  
            console.log("Service worker has been registered");
        });
    }
}

/**
 * Add install PWA event to window which can be triggered when required
 */
window.addEventListener('beforeinstallprompt', (evt) => {
    // hide default prompt app install banner
    if(swscript.getAttribute("data-preventadd2hs") === "true"){
        evt.preventDefault()
    }
    // Stash the event so it can be triggered later.
    window.add2hs = evt;
});