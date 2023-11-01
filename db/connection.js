const mongoose=require('mongoose')

mongoose.connect(process.env.DATABASE,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("...Mongodb atlas connected ");
}).catch((error)=>{
    console.log("connection error"+error);
})