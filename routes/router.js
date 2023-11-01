const express=require('express')
const { userRegister, loginRegister,expensAdd,getHistory,getUser,accDelete} = require('../controllers/logic')



//create an object for router class in object
const router=new express.Router()

//route for register
router.post('/users/register',userRegister)
//roote for login
router.post('/users/login',loginRegister)
//roote for addexpense
router.post('/users/addexp',expensAdd)
//route for get user
router.post('/users/getexps',getUser)
//route for get transactions
router.post('/users/gethistory',getHistory)
//route for delete acc
router.post('/users/deleteacc',accDelete)










module.exports=router