window.navigator.serviceWorker.register('services/service-worker.ts').then(() => console.log('service worker registered')).catch((error) => console.log(error));