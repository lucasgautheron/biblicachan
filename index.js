var self = require("sdk/self");
var tabs = require("sdk/tabs");

var contextMenu = require("sdk/context-menu");
var menuItem = contextMenu.Item({
  label: "Accès revue",
  context: contextMenu.PageContext(),
  contentScript: 'self.on("click", function () {' +
                 '  self.postMessage();' +
                 '});',
  accessKey: "l",
  onMessage: function () {
    var host = '.bibliopam.ens-cachan.fr';
    var url = require("sdk/url").URL(tabs.activeTab.url);

    if (url.host.substr(url.host.length - host.length) == host) return false;

    var bibliUrl = 'https://' + url.host.replace(/\./g, '-') + host + url.path;
    var newTab = require('sdk/simple-prefs').prefs['newTab'];
    if (newTab) {
      tabs.open(bibliUrl);
    } else {
      tabs.activeTab.url = bibliUrl;
    }
  }
});
