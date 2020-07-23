var guard = require('*/cartridge/scripts/guard');

/**
 * Includes service worker script to current page scope.
 * This is used during Service worker registration.
 */
function sw() {
    var template = new dw.util.Template("pwa/sw").render().text;
    response.setContentType('application/javascript');
    response.getWriter().print(template);
}

/**
 * This is called from the head section to include manifest JSON to current page scope.
 */
function manifest() {
    var template = new dw.util.Template("pwa/manifest").render().text;
    response.setContentType('application/manifest+json');
    response.getWriter().print(template);
}

/**
 * Renders Generic Offline Page as a fallback in case user is offline 
 * and cache doesn't exist for a particular page.
 */
function offline() {
    var ISML = require('dw/template/ISML');
    ISML.renderTemplate('pwa/offline');
}

exports.SW = guard.ensure(['get', 'https'], sw);
exports.Manifest = guard.ensure(['get', 'https'], manifest);
exports.Offline = guard.ensure(['get', 'https'], offline);
