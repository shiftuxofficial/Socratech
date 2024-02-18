const express = require('express');
const bodyParser = require('body-parser');

const path=require('path')
const ROOT_DIR=path.resolve()

const Landing=(_,res)=>{
    const filepath=`${ROOT_DIR}/src/landing.html`
    res.sendFile(filepath)
}
const Signup=(_,res)=>{
    const filepath=`${ROOT_DIR}/src/signup.html`
    res.sendFile(filepath)
}
const Login=(_,res)=>{
    const filepath=`${ROOT_DIR}/src/login.html`
    res.sendFile(filepath)
}
const Explore=(_,res)=>{
    const filepath=`${ROOT_DIR}/src/explore.html`
    res.sendFile(filepath)
}

const createApp=()=>{
    const app = express();
    app.use(bodyParser.json());
    app.get("/",Landing)
    app.get("/signup",Signup)
    app.get("/login",Login)
    app.get("/explore",Explore)
    app.use(express.static("src"))
    return app
}

module.exports={createApp}