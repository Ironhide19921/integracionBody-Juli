const { response } = require("express");
const axios = require("axios");
const parseString = require("xml2js").parseString;
const siteConfig = require("../modules/Config");
const siteLogger = require("../modules/Logger");

const executeTask = async (req = request, res = response) => {
  try {
    // return validarParams(req, res);
    const devolucion = validarParams(req, res);
    console.log("devolucion", devolucion);
    // const mensaje = {
    //   msg: "Faltan los siguientes parámetros en la request:asdad",
    // };
    siteLogger.logError(
      {
        errorMessage: `Faltan los siguientes parámetros en la request:${devolucion}`,
      }
      // JSON.parse(`Faltan los siguientes parámetros en la request:${devolucion}`)
    );
    if (devolucion) {
      return res.status(404).json({
        errorMessage: `Faltan los siguientes parámetros en la request:${devolucion}`,
      });
    }

    console.log("paso validacion");
    const { idTask, parameters, jsonParam } = req.body;
    const cantParameters = Object.keys(parameters[0]).length;

    parameters.forEach((element) => {
      console.log("element", element);
    });

    let newObject = {};
    let param1 = "";
    let url = "";
    let executeTask = "";
    let params = "";

    if (!jsonParam) {
      if (cantParameters > 20) {
        return res.status(400).json({
          errorMessage: `Se recibieron más de 20 parámetros, máximo posible`,
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
      console.log("param1", param1);
      newObject = { idTask };
      params = new URLSearchParams(newObject);
      //Fuerzo que sea un parámetro sólo,ExecuteTask01
      executeTask = "01";
      url = `http://200.5.98.203/neoapi/webservice.asmx/ExecuteTask${executeTask}?${params}&param1=${param1}`;
    }

    console.log("cantParameters", cantParameters);
    console.log("parameters[0]", parameters[0]);
    console.log("param1", param1);
    console.log("params", params);
    console.log("newObject", newObject);
    console.log("url", url);

    const resp = await axios.get(url);
    const { data } = resp;
    console.log("data", data);
    let dataParsed = "";

    parseString(data, (err, result) => {
      dataParsed = jsonParam ? JSON.parse(result.string._) : result.string._;
    });

    return res.status(resp.status).json({
      data: dataParsed,
    });
  } catch (error) {
    console.log("error", error);
    console.log("error.response.data", error.response.data);
    return res.status(error.response.status).json({
      errorMessage: error.response.data,
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
