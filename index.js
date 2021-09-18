import express from 'express'
import bodyParser from 'body-parser'
import Routerredirect from './src/Routerredirect'
import RouterUser from './src/RouterUser'
import cors from 'cors'


const app = express()
const port = 3000
app.use(cors({origin:'http://localhost:8080/'}));                      
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(Routerredirect)
app.use(RouterUser)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))