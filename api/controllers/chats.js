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
    // const url = `http://127.0.0.1/neoapi/webservice.asmx/ExecuteTask10`;
    // const url = `http://127.0.0.1/neoapi/webservice.asmx/ExecuteTask10?idTask=${siteConfig.idTask}&param1=${operator.username}&param2=${subcategoria}`;
    
    const url = `https://jsonplaceholder.typicode.com/comments`;
    const postId=1;

    const params = {
      idTask: siteConfig.idTask,
      param1: operator.username,
      param2: subcategoria,
    };
    const params2 = {
      postId
    }

 
    // const instance = axios.create({
    //   baseURL:`https://jsonplaceholder.typicode.com/posts/1/comments`,
    //   params: {
    //     postId:this.postId
    //   }
    // });

    // const instance = axios.default.create(url, { params: this.params });
    // const instance = axios.create(url, { params:{ postId: this.postId} });
    // const resp = await instance.get();
    
    // anda
    const resp = await axios.get(url,{ params:{ postId: this.params2} });
    const {data} = resp;
    const {idTask,parameters,jsonParam} = req.body;

    console.log('idTask',idTask);
    console.log('parameters',parameters);
    console.log('jsonParam',jsonParam);

    res.json({
      msg: "post API - resultadoChat",
      conversationId,
      platform,
      data      
    });
  } catch (error) {
    console.log(error);
    res.send('404 | Resource not found')
  }

  //   return res.json(req.status);
};

module.exports = {
  resultadoChat,
};
