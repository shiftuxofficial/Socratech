const express = require('express');
const bodyParser = require('body-parser');

const path=require('path')
const ROOT_DIR=path.resolve()

const Signup=(_,res)=>{
    const filepath=`${ROOT_DIR}/src/signup.html`
    res.sendFile(filepath)
}
const signupdetails=(req,res)=>{
    console.log(req.body)
}

const createApp=()=>{
    const app = express();
    app.use(bodyParser.json());
    app.get("/signup",Signup)
    app.use(express.static("src"))
    return app
}

module.exports={createApp}