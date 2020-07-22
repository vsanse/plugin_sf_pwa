var server = require('server');

/**
 * Includes service worker script to current page scope.
 * This is used during Service worker registration.
 */
server.get('SW', function (req, res, next) {
    res.render("pwa/sw")
    next();
});

/**
 * This is called from the head section to include manifest JSON to current page scope.
 */
server.get('Manifest', function (req, res, next) {
    res.render("pwa/manifest")
    next();
});

/**
 * Renders Generic Offline Page as a fallback in case user is offline 
 * and cache doesn't exist for a particular page.
 */
server.get('Offline', function (req, res, next) {
    res.render('pwa/offline')
    next();
});

module.exports = server.exports();