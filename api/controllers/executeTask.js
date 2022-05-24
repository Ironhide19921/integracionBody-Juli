const { response } = require("express");
const axios = require("axios");
const parseString = require("xml2js").parseString;
const siteConfig = require("../modules/Config");
const siteLogger = require("../modules/Logger");

const executeTask = async (req = request, res = response) => {
  try {
    // return validarParams(req, res);
    const devolucion = validarParams(req, res);
    siteLogger.log({ devolucion: devolucion });

    if (devolucion) {
      const message = `Faltan los siguientes parámetros en la request:${devolucion}`;
      siteLogger.logError({ errorMessage: message });
      return res.status(404).json({
        errorMessage: message,
      });
    }

    siteLogger.log({ msg: "Pasó validación de parámetros vacíos" });

    const { idTask, parameters, jsonParam } = req.body;
    const cantParameters = Object.keys(parameters[0]).length;

    parameters.forEach((element) => {
      siteLogger.log({ params: element });
    });

    let newObject = {};
    let param1 = "";
    let url = "";
    let executeTask = "";
    let params = "";

    if (!jsonParam) {
      if (cantParameters > 20) {
        const message = `Se recibieron más de 20 parámetros, máximo posible`;
        siteLogger.log({ errorMessage: message });
        return res.status(400).json({
          errorMessage: message,
        });
      }
      newObject = { idTask, ...parameters[0] };
      params = new URLSearchParams(newObject);
      executeTask =
        cantParameters.toString().length == 1
          ? "0" + cantParameters
          : cantParameters;
      //Cantidad de parámetros variables,ExecuteTaskXX
      url = `http://200.5.98.203/neoapi/webservice.asmx/ExecuteTask${executeTask}?${params}`;
    } else {
      param1 = JSON.stringify(parameters[0]);
      siteLogger.log({ param1: param1 });
      newObject = { idTask };
      params = new URLSearchParams(newObject);
      //Fuerzo que sea un parámetro sólo,ExecuteTask01
      executeTask = "01";
      url = `http://200.5.98.203/neoapi/webservice.asmx/ExecuteTask${executeTask}?${params}&param1=${param1}`;
    }
    siteLogger.log({ url: url });
    siteLogger.log({ cantParameters: cantParameters });
    siteLogger.log({ parameters0: parameters[0] });
    siteLogger.log({ param1: param1 });
    siteLogger.log({ params: params });
    siteLogger.log({ newObject: newObject });
    siteLogger.log({ url: url });

    const resp = await axios.get(url);
    const { data } = resp;
    siteLogger.log({ data: data });
    let dataParsed = "";

    //Retornar resp en json
    // parseString(data, (err, result) => {
    //   dataParsed = jsonParam ? JSON.parse(result.string._) : result.string._;
    // });

    // return res.status(resp.status).json({
    //   data: dataParsed,
    // });

    return res.status(resp.status).send(data);
  } catch (error) {
    const message = error.response.data;
    // const message = error.response.data;
    siteLogger.log({ errorMessage: message });
    //Arroja error el logError al pasarle el error de la neoapi
    // siteLogger.logError({ errorMessage: error });

    return res.status(error.response.status).json({
      errorMessage: message,
      error,
    });
  }
};

function validarParams(req = request, res = response, next) {
  if (
    req.body.idTask == undefined ||
    req.body.parameters == undefined ||
    req.body.jsonParam == undefined
  ) {
    let devolucion = "";
    devolucion =
      (req.body.idTask == undefined ? devolucion + " idTask," : devolucion) +
      (req.body.parameters == undefined
        ? devolucion + " parameters,"
        : devolucion) +
      (req.body.jsonParam == undefined
        ? devolucion + " jsonParam,"
        : devolucion);
    devolucion = devolucion.substring(0, devolucion.length - 1);

    return devolucion;
  }
}

module.exports = {
  executeTask,
};
