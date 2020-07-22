var server = require('server');

/**
 * Includes service worker script to current page scope.
 * This is used during Service worker registration.
 */
server.get(
    'SW',
    server.middleware.https,
    function (req, res, next) {
    var template = new dw.util.Template("pwa/sw").render().text;
    response.setContentType('application/javascript');
    response.getWriter().print(template);
});

/**
 * This is called from the head section to include manifest JSON to current page scope.
 */
server.get(
    'Manifest',
    server.middleware.https,
    function (req, res, next) {
    var template = new dw.util.Template("pwa/manifest").render().text;
    response.setContentType('application/manifest+json');
    response.getWriter().print(template);
});

/**
 * Renders Generic Offline Page as a fallback in case user is offline 
 * and cache doesn't exist for a particular page.
 */
server.get(
    'Offline',
    server.middleware.https,
    function (req, res, next) {
    var ISML = require('dw/template/ISML');
    ISML.renderTemplate('pwa/offline');
// }
});

module.exports = server.exports();
