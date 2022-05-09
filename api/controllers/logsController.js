const fs = require('fs');
const path = require('path');

const { rootFolder } = require('../modules/Logger');
const logsRoot = path.join(__dirname, "../logs");

let today = new Date();
let folder = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

async function filesList(req, res, next) {
    try {

        let type = req.params.type;
        
        let arrFiles = [];
        fs.readdir(logsRoot, (err, files) => {
            files.forEach(file => {
                console.log(file)
                switch (type) {
                    case "response":
                        if (file.indexOf("_response_error") > -1) {
                            let objFile = { date: file.split('_')[0], type: "response error", name: file }
                            arrFiles.push(objFile);
                        }
                        break;
                    case "error":
                        if (file.indexOf("_log_error") > -1) {
                            let objFile = { date: file.split('_')[0], type: "log error", name: file }
                            arrFiles.push(objFile);
                        }
                        break;
                    default:
                        if (file.indexOf("_error") == -1) {
                            let objFile = { date: file.split('_')[0], type: "console", name: file }
                            arrFiles.push(objFile);
                        }
                        break;
                }
            });
            res.json({ error: false, data: arrFiles });
        });
    } catch (error) {
        res.json({ error: true, data: error });
    }

}
function getFile(req, res, next) {
    let name = req.params.name;
    if (fs.existsSync(rootFolder + "/" + name)) {
        fs.readFile(rootFolder + "/" + name, 'utf-8', (err, data) => {
            if (!err)
                res.json({ error: false, data: data });
            else
                res.json({ error: true, data: err });
        })
    } else {
        res.json({ error: true, data: "File does not exist!" });
    }
}

module.exports = {
    listFiles: filesList,
    getFile: getFile
}