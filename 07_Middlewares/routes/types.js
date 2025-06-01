const express = require("express")
const router = express.Router()

//Application-level :
//app.use() not router.use() just for example
router.use((req,res,next)=>{
  console.log("Application-level")
  next()
})
router.get('/',(req,res)=>{
  res.send("This is Application-level Router Response..")
})

//Route-level :
const middleFun = (req,res,next)=>{
  console.log("Route-level")
  next()
}
router.get('/route',middleFun,(req,res)=>{
  res.send("This is route level Router response.")
})

//Built-in :
router.use(express.json())
router.use(express.urlencoded({extended:true}))

//Third-Pparty : 
const morgan = require('morgan')
router.use(morgan('dev'))

//Error handling :
router.get('/error',(req,res,next)=>{
  const err = new Error('Test Error')
  err.status = 400
  next(err)
})

router.use((err,req,res,next)=>{
  console.log(err.stack)
  res.status(500).send("Something broke!")
})
module.exports = router