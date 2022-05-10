const { response } = require("express");
const axios = require("axios");
const siteConfig = require("../modules/Config");

const resultadoChat = async (req = request, res = response) => {
  //   return res.json({
  //     msg: "hola mundo",
  //   });

  try {
    const { conversationId, platform, operator } = req.body;
    const [labels] = req.body.labels;
    const subcategoria = labels.id;
    const url = `http://127.0.0.1/neoapi/webservice.asmx/ExecuteTask10`;
    // const url = `http://127.0.0.1/neoapi/webservice.asmx/ExecuteTask10?idTask=${siteConfig.idTask}&param1=${operator.username}&param2=${subcategoria}`;
    const params = {
      idTask: siteConfig.idTask,
      param1: operator.username,
      param2: subcategoria,
    };

    console.log("url", url);

    // const resp = await axios.get(
    //   // "https://jsonplaceholder.typicode.com/posts/1/comments"
    //   url
    // );
    const instance = axios.default.create(url, { params: this.params });
    // const resp = await instance.get({ params: this.params });
    const resp = await instance.post();
    console.log("req", req);
    console.log(resp.data);
    res.json({
      msg: "post API - resultadoChat",
      conversationId,
      platform,
    });
  } catch (error) {
    console.log(error);
  }

  //   return res.json(req.status);
};

module.exports = {
  resultadoChat,
};
