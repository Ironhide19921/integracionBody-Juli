require("dotenv").config();
const { response } = require("express");
const axios = require("axios");
const parseString = require("xml2js").parseString;
const siteLogger = require("../modules/Logger");

const executeTask = async (req = request, res = response) => {
  try {
    const { idTask, ipurl } = process.env;

    if (idTask == "" || !idTask) {
      const message = `No hay idtask configurado en el archivo DOTENV`;
      siteLogger.logError({ errorMessage: message });
      return res.status(404).json({
        errorMessage: message,
      });
    }

    const parameters = req.body;
    const cantParameters = Object.keys(parameters).length;

    if (cantParameters > 20) {
      const message = `Se recibieron más de 20 parámetros, máximo posible`;
      siteLogger.log({ errorMessage: message });
      return res.status(400).json({
        errorMessage: message,
      });
    }

    let newObject = {};
    let objectWithParams = {};
    let url = "";
    let executeTask = "";
    let params = "";

    newObject = { idTask, ...parameters };
    for (let i = 0; i < Object.keys(newObject).length; i++) {
      if (i == 0) {
        let newElement = `idTask`;
        objectWithParams[newElement] = idTask;
      } else {
        let newElement = `param${i}`;
        objectWithParams[newElement] =
          typeof newObject[Object.keys(newObject)[i]] == "object"
            ? JSON.stringify(newObject[Object.keys(newObject)[i]])
            : newObject[Object.keys(newObject)[i]];
      }
    }

    params = new URLSearchParams(objectWithParams);

    executeTask =
      cantParameters.toString().length == 1
        ? "0" + cantParameters
        : cantParameters;
    url = `http://${ipurl}/neoapi/webservice.asmx/ExecuteTask${executeTask}?${params}`;

    siteLogger.log({ url: url });
    siteLogger.log({ cantParameters: cantParameters });
    siteLogger.log({ objectWithParams: objectWithParams });

    const resp = await axios.get(url);
    const { data } = resp;
    siteLogger.log({ data: data });

    return res.status(resp.status).send(data);
    // return res.status(200).json({ ok: "ok" });
  } catch (error) {
    // return res.status(400).json({ error: "error" });
    const message = error.response.data;
    siteLogger.log({ errorMessage: message });
    siteLogger.log({ error: error });

    return res.status(error.response.status).json({
      errorMessage: message,
      error,
    });
  }
};

module.exports = {
  executeTask,
};
