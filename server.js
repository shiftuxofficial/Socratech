const {createApp}=require("./src/Node")
const main=()=>{
    const app=createApp()
    const port=process.env.PORT||5500
    app.listen(port,()=>console.log("Listening On",port))
}

main()