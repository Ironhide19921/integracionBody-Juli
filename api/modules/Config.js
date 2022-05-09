const fs = require('fs');
const path = require('path');
const rootPath = path.join(__dirname, "../");

let configPath = path.join(rootPath, ".config.json");
let _config = JSON.parse(fs.readFileSync(configPath), 'utf-8');
let _configMode = _config[_config.mode];

Object.keys(_configMode).forEach((key) => {
    if (["path", "paths"].includes(key.toLocaleLowerCase())) {
        setFullPath(_configMode[key]);
    }
});

function setFullPath(obj) {
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] == "object") {
            setFullPath(obj[key])
        } else {
            obj[key] = path.join(rootPath, obj[key]);
        }
    })
}

module.exports = _configMode;