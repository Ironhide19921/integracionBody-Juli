var Service = require("node-windows").Service;
const siteConfig = require("../modules/Config");
// Create a new service object
var svc = new Service({
  name: "Integracion service",
  description: `Modificar nombre para ver en Windows Services. http:${siteConfig.serverPort.http}`,
  script: siteConfig.path.winservice,
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on("install", function () {
  svc.start();
});

svc.install();
