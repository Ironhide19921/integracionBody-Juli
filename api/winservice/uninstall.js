var Service = require('node-windows').Service;
const siteConfig = require('../modules/Config');
// Create a new service object
var svc = new Service({
  name: 'Nombre Servicio',
  description: `Modificar nombre para ver en Windows Services. http:${siteConfig.serverPort.http}`,
  script: siteConfig.path.winservice
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall', function () {
  console.log('Uninstall complete.');
  console.log('The service exists: ', svc.exists);
});

// Uninstall the service.
svc.uninstall();