/**
 * Borrowed from https://scotch.io/tutorials/how-to-make-your-existing-react-app-progressive-in-10-minutes,
 * which itself borrows code from https://github.com/GoogleChromeLabs/sw-precache/blob/5699e5d049235ef0f668e8e2aa3bf2646ba3872f/demo/app/js/service-worker-registration.js
 */

/**
 * In production, we register a service worker to serve assets from local cache.
 *
 * This lets the app load faster on subsequent visits in production, and gives
 * it offline capabilities. However, it also means that developers (and users)
 * will only see deployed updates on the "N+1" visit to a page, since previously
 * cached resources are updated in the background.
 *
 * To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
 * This link also includes instructions on opting out of this behavior.
 */

import { IS_PROD } from '../constants';

export const register = () => {
  if (IS_PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = 'service-worker.js';
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          // eslint-disable-next-line no-param-reassign
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // At this point, the old content will have been purged and
                  // the fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in your web app.
                  console.log('New content is available; please refresh.');
                } else {
                  // At this point, everything has been precached.
                  // It's the perfect time to display a
                  // "Content is cached for offline use." message.
                  console.log('Content is cached for offline use.');
                }
              }
            };
          };
        })
        .catch((error) => {
          console.error('Error during service worker registration:', error);
        });
    });
  }
};

export const unregister = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
};
