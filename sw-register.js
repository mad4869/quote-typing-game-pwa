if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register('serviceworker.js')
        .then(function (reg) {
            console.log('Service Worker Registered', reg);
        });
}