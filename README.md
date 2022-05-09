# NeoRestApi

## Primeros pasos
* "cd api" entra al directorio de la api
* "npm install" instala las dependencias necesarias para la api
* "cd client"  entra al directorio del cliente
* "npm install" instala las dependencias necesarias para el cliente

## Correr servicio en modo development
* "npm run start" corre el servicio con nodemon
* "npm run start2" corre el servicio sin nodemon

## Instalar servicio en modo produccion
* "npm run wininstall" instala como servicio de windows
* "npm run winuninstall" desinstala el servicio de windows

## Configuraciones

Todas las claves, rutas y datos goblales del servicio se deben configurar en el archivo *.config.json*

El atributo "mode" del json, define si el servicio corre con las configuraciones de produccion o desarrollo. "Production/Development"

## Swagger

Siempre que se agrega un controller a la api, se debe configurar la ruta en el route/swagger.js para que quede listado en el front de pruebas y documentacion del servicio.

Tomar ejemplos de comentarios de las rutas route/index.js y route/users.js y aplicarlo siempre _*SIN EXCEPCION*_ para que la api quede documentada y tenga un front de pruebas.

## Cliente

El servicio cuenta con un cliente para poder visualizar los logs generados por la api. 

Se ingresa http://localhost:{port}/login

Las credenciales de ingreso son las configuradas en el .config.json del proyecto api