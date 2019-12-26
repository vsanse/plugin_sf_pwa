var guard = require('*/cartridge/scripts/guard');

function sw() {
    var template = new dw.util.Template("pwa/sw").render().text
    response.setContentType('application/javascript');
    response.getWriter().print(template);
}

function manifest() {
    var template = new dw.util.Template("pwa/manifest").render().text
    response.setContentType('application/manifest+json');
    response.getWriter().print(template);
}

function offline() {
    var ISML = require('dw/template/ISML');
    ISML.renderTemplate('pwa/offline');
}

exports.SW = guard.ensure(['get', 'https'], sw);
exports.Manifest = guard.ensure(['get', 'https'], manifest);
exports.Offline = guard.ensure(['get', 'https'], offline);