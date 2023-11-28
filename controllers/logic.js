const jwt =require('jsonwebtoken')
const users = require("../models/schema");
const nodemailer = require('nodemailer');
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
          
            res.status(200).send({message:"Registration Successfull"}).json(newUser)
        }

    }
    catch (error) {
        res.status(401).json(error)

    }

}
// for verify email
exports.Emailverify = async (req, res) => {
   


    const { email } = req.body
  

    if ( !email ) {

        res.status(401).json("all inputs are required")

    }
    try{
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'abhinavabhiz088@gmail.com',
              pass: 'lmgjytjilobcyjmt'
            }
          });
          
          var mailOptions = {
            from: 'abhinavabhiz088@gmail.com',
            to: email,
            subject: 'Verify your email',
            text: `https://epexpense-tracker-pro.netlify.app/registeruser/${email}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
            return res.send({message:"Click the link on your mail for reset password"})
            }
          });

    }catch (error) {
        res.status(402).json(error)

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
           
            //token generation
            const token=jwt.sign(email,"secretkey123");
           if(psw === preUser.psw){
            
            res.send({message:"login Successfull",token})
             
            
           }
           else{
            res.send({message:"Incorrect Password"})
           }
        }
        else {
            res.send({message:"User not found"}) 
    
        }

    }
    catch (error) {
        res.status(401).json(error)

    }

}
// for reset password
exports.passReset = async (req, res) => {
   


    const { email,uid } = req.body
  

    if ( !email ) {

        res.status(401).json("all inputs are required")

    }
    try{
        const preUser = await users.users.findOne({email})

        if (!preUser) {
            return res.send({message:"User not existed"})
        }
        const uid=preUser._id
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'abhinavabhiz088@gmail.com',
              pass: 'lmgjytjilobcyjmt'
            }
          });
          
          var mailOptions = {
            from: 'abhinavabhiz088@gmail.com',
            to: email,
            subject: 'Reset your password',
            text: `https://epexpense-tracker-pro.netlify.app/updatepass/${uid}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
            return res.send({message:"Click the link on your mail to reset password"})
            }
          });

    }catch (error) {
        res.status(402).json(error)

    }


}
// for Update password
exports.updatePassword = async (req, res) => {
   

   
    const { pass,id } = req.body
  

    if ( !pass ) {

        res.status(401).json("all inputs are required")

    }
    try{
        const preUser = await users.users.findOne({ _id:id })

        if (!preUser) {
            return res.send({message:"User not existed"})
        }else{
            preUser.psw=pass
         
            preUser.save()

        res.status(200).json({message:"Password updated"})

        }
      

    }catch (error) {
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
// for edit expense
exports.expensEdit = async (req, res) => {

    // res.send("register works")

    //req.file
    const {id}=req.params
    const { reason,category, amount,cdate,uid} = req.body
    
   
    if (!reason || !category || !amount || !cdate) {

        res.status(401).json("all inputs are required")

    }

    try {
        const preuser = await users.expenses.findOne({ _id:id })
        if (preuser) {
            preuser.reason=reason,
            preuser.category=category,
            preuser.amount=amount,
            preuser.cdate=cdate
            preuser.save()

        res.status(200).json({message:"Expense updated"})
        }

    }

    catch (err) {

        res.status(401).json("expense not found")

    }
}
// //logic to delete employee

exports.deleteExpense=async (req,res)=>{
    const {id}=req.params

   try{ //remove and get deleted response as object

    const removedItem=await users.expenses.findByIdAndDelete({_id:id})

    res.status(200).json(removedItem)}
    catch{
        res.status(401).json("expense not present")
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

        res.status(401).json(" not found")

    }


}

//for get all transactions
exports.getallTransactions = async (req, res) => {
    const {uid} = req.body
    

    try {
        const preuser = await users.expenses.find({ uid });
        res.status(200).json(preuser)


    }

    catch (err) {

        res.status(401).json(" not found")

    }


}
//for get single expense
exports.getExpSingle = async (req, res) => {
    const {id}=req.params
   
   

    try {
        const preuser = await users.expenses.findOne({_id:id})
        res.status(200).json(preuser)


    }

    catch (err) {

        res.status(401).json("expense not found")

    }

}
//delte acc

exports.accDelete = async (req, res) => {
    const {id}=req.params

    try{

        const removedItem=await users.users.findByIdAndDelete({_id:id})
    
        res.status(200).json(removedItem)
    }
        catch{
            res.status(401).json("expense not present")
        }

}