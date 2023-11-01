const users = require("../models/schema");
const jwt =require('jsonwebtoken')
const jwtkey ='e-comm'
const moment = require('moment')

// for register
exports.userRegister = async (req, res) => {

    // res.send("register works")

    //req.file

    const { uname, email, psw} = req.body

    if (!uname || !email || !psw ) {

        res.status(401).json("all inputs are required")

    }

    try {
        
        const preUser = await users.users.findOne({email})
        if (preUser) {
            res.send({message:"User already Exists"})
        }
        else {
            const newUser = new users.users({
                uname, email, psw
            })

            await newUser.save()
            res.send({message:"Registration Successfull"}).json(newUser)
        }

    }
    catch (error) {
        res.status(401).json(error)

    }



}
//for login

exports.loginRegister = async (req, res) => {

    const { email, psw} = req.body

    if ( !email || !psw ) {

        res.status(401).json("all inputs are required")

    }

    try {
        const preUser = await users.users.findOne({email})


       
        if (preUser) {
          
           if(psw === preUser.psw){
             res.send({message:"login Successfull"}).json(preUser)
           }
           else{
            res.send({message:"Incorrect Password"})
           }
        }
        else {
            res.send({message:"employee not found"}) 
    
        }

    }
    catch (error) {
        res.status(402).json(error)

    }

}

// for add expense
exports.expensAdd = async (req, res) => {

    // res.send("register works")

    //req.file
    
    const { reason,category, amount,cdate,uid} = req.body
   
    if (!reason || !category || !amount || !cdate || !uid  ) {

        res.status(401).json("all inputs are required")

    }

    try {   
     
            const newUser = new users.expenses({
                uid,reason,category,amount,cdate
            })
            await newUser.save()
            res.send({message:"Expense Added"})
 
       

    }
    catch (error) {
        res.status(200).json(error)

    }

}
//for get user
exports.getUser = async (req, res) => {
    const {email} = req.body
   

    try {
        const preuser = await users.users.findOne({email})
        res.status(200).json(preuser)


    }

    catch (err) {

        res.status(401).json("user not found")

    }

}

//for get history
exports.getHistory = async (req, res) => {
    const {uid,frequency,selectedDate,category} = req.body
    

    try {
        const preuser = await users.expenses.find({
          ...(frequency !== 'custom' ? {
            cdate:{
                $gt : moment().subtract(Number(frequency),'d').toDate(),
                   },
          } : {
            cdate:{
                $gte: selectedDate[0],
                $lte: selectedDate[1]
            }
          }),
                    uid,
            ...(category !== 'all' && {category})  });
        res.status(200).json(preuser)


    }

    catch (err) {

        res.status(401).json("user not found")

    }


}
//delte acc

exports.accDelete = async (req, res) => {
    const {uid} = req.body
   

    try {
        const preuser = await users.users.deleteOne({ uid })
        if (preuser) {
        res.status(200).json("Acount deleted")
        }

    }

    catch (err) {

        res.status(401).json("user not found")

    }

}