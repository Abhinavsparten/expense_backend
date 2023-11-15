


const express=require('express')
const { userRegister, loginRegister,expensAdd,
    deleteExpense,getHistory,getUser,accDelete,expensEdit
    ,passReset,getallTransactions,getExpSingle, updatePassword} = require('../controllers/logic')
const { decodeToken } = require('../middleware/auth');

//create an object for router class in object
const router=new express.Router()

//route for register
router.post('/users/register',userRegister)
//roote for login
router.post('/users/login',loginRegister)
//route for reset pass
router.post('/users/resetpass',passReset)
//route for addexpense
router.post('/users/updatepass',updatePassword)
//route for addexpense
router.post('/users/addexp',expensAdd)
//roote for Editxpense
router.post('/users/editexp/:id',decodeToken,expensEdit)
//route for get user
router.post('/users/getuser',getUser)
//route for get transactions
router.post('/users/gettransactions',getallTransactions)
//route for get history
router.post('/users/gethistory',getHistory)
//route for get single expense
router.get('/users/singleexp/:id',getExpSingle)
//route for delete expense
router.delete('/users/deleteexp/:id',decodeToken,deleteExpense)
//route for delete acc
router.delete('/users/deleteacc/:id',accDelete)


module.exports=router