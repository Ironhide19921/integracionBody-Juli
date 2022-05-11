const { response } = require("express");
const axios = require("axios");
const siteConfig = require("../modules/Config");

const resultadoChat = async (req = request, res = response) => {
  try {


    // const url = `http://127.0.0.1/neoapi/webservice.asmx/ExecuteTask10`;
    // const url = `http://127.0.0.1/neoapi/webservice.asmx/ExecuteTask10?idTask=${siteConfig.idTask}&param1=${operator.username}&param2=${subcategoria}`;
    
    // const url = `https://jsonplaceholder.typicode.com/comments`;
    // const postId=1;

    // const params = {
    //   idTask: siteConfig.idTask,
    //   param1: operator.username,
    //   param2: subcategoria,
    // };
    // const params2 = {
    //   postId
    // }

    if(req.body.idTask==undefined || req.body.parameters==undefined || req.body.jsonParam == undefined ){
      let devolucion ='' ;
      devolucion =( req.body.idTask==undefined ? devolucion + ' idTask,' :devolucion) + (req.body.parameters==undefined ? devolucion + ' parameters,' :devolucion)+(req.body.jsonParam==undefined ? devolucion + ' jsonParam,' :devolucion);      
      devolucion=devolucion.substring(0,devolucion.length-1);
      
      return res.status(404).send(`404 | Faltan los siguientes parámetros en la request:${devolucion}`)
    }

    const {idTask,parameters,jsonParam} = req.body;
    const cantParameters =Object.keys(parameters[0]).length;
    // const executeTask = cantParameters.toString().length == 1 ?'0'+1 : cantParameters;
    // const executeTask = cantParameters.toString().length == 1 ?'0'+cantParameters : cantParameters;
    
    parameters.forEach(element => {
      console.log('element',element);      
    });
    
    let newObject={};
    let param1='';
    let url='';
    let executeTask='';
    let params='';
    
    if(!jsonParam){
      newObject = {idTask, ...parameters[0]};
      params = new URLSearchParams(newObject);
      executeTask = cantParameters.toString().length == 1 ?'0'+cantParameters : cantParameters;
      //Cantidad de parámetros variables,ExecuteTaskXX
      url =`http://200.5.98.203/neoapi/webservice.asmx/ExecuteTask${executeTask}?${params}` ;
    }else{
      param1 = JSON.stringify(parameters[0]);
      console.log('param1',param1);
      newObject = {idTask};      
      params = new URLSearchParams(newObject);
      //Fuerzo que sea un parámetro sólo,ExecuteTask01
      executeTask = cantParameters.toString().length == 1 ?'0'+1 : cantParameters;
      url =`http://200.5.98.203/neoapi/webservice.asmx/ExecuteTask${executeTask}?${params}&param1=${param1}` ;
    }
    
    console.log('cantParameters',cantParameters);
    console.log('parameters[0]',parameters[0]);
    console.log('params',params);
    console.log('newObject',newObject);
    console.log('url',url);

    const resp = await axios.get(url);
    const {data} = resp;
    console.log('data',data);

    // const instance = axios.create({
    //   baseURL:`http://127.0.0.1/neoapi/webservice.asmx/ExecuteTask${idTaskParsed}`,
    //   // baseURL:`https://jsonplaceholder.typicode.com/posts/1/comments`,
    //   params: parameters
    // });
    
    // const instance = axios.create(url, { params:{ postId: this.postId} });
    // const resp = await instance.get();
    
    // anda
    // const resp = await axios.get(url,{ params:{ postId: this.params2} });
    // const {data} = resp;
    
    res.status(200).json({
      msg: "post API - resultadoChat",
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
