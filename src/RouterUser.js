import express from 'express'
import User from './logic/user'
const RouterUser = express.Router();
const ob = new User()
RouterUser.post('/newuserguess',async (req,res)=>{
    await ob.newUSERguess(req.body.username,req.body.password)
    res.send('You sign in already')
})
RouterUser.post('/newuseradmin',async (req,res)=>{
    await ob.newUSERadmin(req.body.username,req.body.password)
    res.send('You sign in already')
})
RouterUser.post('/login',async (req,res)=>{
    const Datauser = await ob.Login(req.body.username,req.body.password)
    res.send(Datauser)
})
export default RouterUser