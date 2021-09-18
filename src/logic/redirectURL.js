import database from '../database'
export default class extends database {
    async newURL(newData) {
        const http = newData.search("http://")
        const https = newData.search("https://")
        if (http === -1 && https === -1) {
            newData = "http://" + newData
        }
        const findData = await this.DB.db("RedirectURL").collection("URL").findOne({
            url: newData
        })
        if (findData === null) {
            const Data = {
                url: newData,
                short: this.getrandomURL(20),
                stat: 0
            }
            await this.DB.db("RedirectURL").collection("URL").insertOne(Data)
            return Data.short
        } else {
            return findData.short
        }
    }
    async getURLstat() {
        const Data = await this.DB.db("RedirectURL").collection("URL").find({}).toArray()
        return Data
    }
    async getURL(short) {
        const Data = await this.DB.db("RedirectURL").collection("URL").findOne({
            short: short
        })
        const newvalues = {
            $set: {
                stat: Data.stat + 1
            }
        };
        await this.DB.db("RedirectURL").collection("URL").updateOne(Data, newvalues)
        console.log('ok')
        return Data
    }
    getrandomURL(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}