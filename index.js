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
    var url = require("sdk/url").URL(tabs.activeTab.url);
    var bibliUrl = 'https://' + url.host.replace(/\./g, '-') + '.bibliopam.ens-cachan.fr' + url.path;
    var newTab = require('sdk/simple-prefs').prefs['newTab'];
    if(newTab) {
      tabs.open(bibliUrl);
    } else {
      tabs.activeTab.url = bibliUrl;
    }
  }
});
