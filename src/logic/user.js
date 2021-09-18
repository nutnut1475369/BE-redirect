import database from '../database'
export default class extends database {
    async newUSERguess(username, password) {
        const findData = await this.DB.db("User").collection("UserAccount").findOne({
            username: username
        })
        if (findData === null) {
            const GuessData = {
                username: username,
                password: password,
                permission: "guess"
            }
            await this.DB.db("User").collection("UserAccount").insertOne(GuessData)

        } else {
            return res.send("Your username have been use already")
        }
    }
    async newUSERadmin(username, password) {
        const AdminData = {
            username: username,
            password: password,
            permission: "admin"

        }
        await this.DB.db("User").collection("Useraccount").insertOne(AdminData)
    }
    async Login(username, password) {
        const checkData = await this.DB.db("User").collection("Useraccount").findOne({
            username: username,
            password: password
        })
        if (checkData === null) {
            return "Your username or password are wrong"
        } else {
            const payload = {
                sub: username,
                iat: new Date().getTime() //มาจากคำว่า issued at time (สร้างเมื่อ)
            }
            const SECRET = "MY_SECRET_KEY"; //ในการใช้งานจริง คีย์นี้ให้เก็บเป็นความลับ
            res.send(jwt.encode(payload, SECRET));
        }
    }
}