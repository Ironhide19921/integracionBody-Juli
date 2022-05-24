const fs = require("fs");
const path = require("path");
class Logger {
  constructor() {
    this.rootFolder = path.join(__dirname, "../logs");
    if (!fs.existsSync(this.rootFolder)) {
      fs.mkdirSync(this.rootFolder);
    }
  }
  setPathFileName() {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    this.path = this.rootFolder + "/" + date;
  }
  responseError(content, response) {
    this.setPathFileName();
    if (typeof content != "object") {
      console.log("Logger error:  content must be json object");
      return false;
    }
    if (response != undefined) {
      if (response.status == undefined) {
        content.response = response;
      } else {
        content.response = {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
        };
      }
    }

    let time = new Date();
    let errorFileContent = { errors: [] };
    if (fs.existsSync(this.path + "_response_error.json")) {
      errorFileContent = JSON.parse(
        fs.readFileSync(this.path + "_response_error.json", "utf-8")
      );
    }

    content.date =
      time.getFullYear() +
      "/" +
      (time.getMonth() + 1) +
      "/" +
      time.getDate() +
      " " +
      time.getHours() +
      ":" +
      time.getMinutes() +
      ":" +
      time.getSeconds();
    errorFileContent.errors.push(content);
    fs.writeFile(
      this.path + "_response_error.json",
      JSON.stringify(errorFileContent),
      (error) => {
        if (error) {
          console.log(time + " ERROR:: Error writting file responseError.");
        }
      }
    );
  }

  logError(content) {
    this.setPathFileName();
    if (typeof content != "object") {
      console.log("Logger error:  content must be json object");
      return false;
    }
    let time = new Date();
    let errorFileContent = { errors: [] };
    if (fs.existsSync(this.path + "_log_error.json")) {
      errorFileContent = JSON.parse(
        fs.readFileSync(this.path + "_log_error.json", "utf-8")
      );
    }

    content.date =
      time.getFullYear() +
      "/" +
      (time.getMonth() + 1) +
      "/" +
      time.getDate() +
      " " +
      time.getHours() +
      ":" +
      time.getMinutes() +
      ":" +
      time.getSeconds();
    errorFileContent.errors.push(content);
    fs.writeFile(
      this.path + "_log_error.json",
      JSON.stringify(errorFileContent),
      (error) => {
        if (error) {
          console.log(time + " ERROR:: Error writting file logError.");
        }
      }
    );
  }

  log(content) {
    this.setPathFileName();
    let time = new Date();
    let timeString =
      time.getFullYear() +
      "/" +
      (time.getMonth() + 1) +
      "/" +
      time.getDate() +
      " " +
      time.getHours() +
      ":" +
      time.getMinutes() +
      ":" +
      time.getSeconds();
    let message = timeString + ":: " + JSON.stringify(content) + "\r\n";
    console.log(message);

    fs.appendFile(this.path + "_log", message, (error) => {
      if (error) {
        console.log(time + " ERROR:: Error writting file logError.");
      }
    });
  }
}

module.exports = new Logger();
