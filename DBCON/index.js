let express = require("express")
let app = express();
app.listen("3000", ()=>{
console.log("server is connected")
})

let dbconnect= require("./ConnectDB/Connect")
dbconnect()

const createDoc= require("./Model/Model")
createDoc()

