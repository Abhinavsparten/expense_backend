
const mongoose=require('mongoose')
const validator=require('validator')

const users=mongoose.model('User',{
    uname:{
        type:String,
        requierd:true,
        trim:true
    },
 
    email:{
        type:String,
        requierd:true,
        trim:true,
        validator(value){
            if(validator.isEmail(value)){
                throw Error("invalid Email")
            }
        }
    },
   
    psw:{
        type:String,
        requierd:true

    }


})

//expense model
const expenses=mongoose.model('Expense',{
    uid:{
        type:String,
        requierd:true,
        
    },
 
    reason:{
        type:String,
        requierd:true,
      
    },
   
    category:{
        type:String,
        requierd:true

    },
    amount:{
        type:Number,
        requierd:true

    },
    cdate:{
        type:Date,
        requierd:true

    }


})




module.exports={users,expenses}