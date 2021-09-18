import express from 'express'
import URL from './logic/redirectURL'
const Routerredirect = express.Router();
const ob = new URL()
Routerredirect.use('/', express.static('public'))
Routerredirect.get('/getURLstat',async (req,res)=>{
    const statData =await ob.getURLstat()
    console.log(statData)
     res.send(statData)
})
Routerredirect.post('/newURL',async (req,res)=>{
    const short = await ob.newURL(req.body.url)
    res.send('127.0.0.1:3000/r/'+ short)
})
Routerredirect.get('/r/:url',async (req,res)=>{
    const realURL = await ob.getURL(req.params.url)
    console.log(realURL)
    if(realURL===null){
        res.send("not found")
    }else{
    res.redirect(realURL.url)
    }

})
Routerredirect.get('/viewstat',async (req,res)=>{
    const realURL = await ob.getURL(req.params.url)
    console.log(realURL)
    if(realURL===null){
        res.send("not found")
    }else{
    res.redirect(realURL.url)
    }

})
export default Routerredirect