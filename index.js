var self = require("sdk/self");
var tabs = require("sdk/tabs");

var contextMenu = require("sdk/context-menu");
var menuItem = contextMenu.Item({
  label: "Acces revue",
  context: contextMenu.PageContext(),
  contentScript: 'self.on("click", function () {' +
                 '  self.postMessage();' +
                 '});',
  accessKey: "l",
  onMessage: function () {
    var url = tabs.activeTab.url;
    var uri = require("sdk/url").URL(url);
    var bibli_url = 'https://' + uri.host.replace(/\./g, '-') + '.bibliopam.ens-cachan.fr' + uri.path;
    tabs.open(bibli_url);
  }
});
