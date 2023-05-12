import express from 'express'
const {Router} = express

const router = new Router()

router.get('/', (req, res)=>{
  res.render('home', {})
})

export default router