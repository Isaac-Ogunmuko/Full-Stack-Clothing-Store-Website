const mongoose = require('mongoose')


const url = `mongodb+srv://isaacogunmuko_db_user:IKZ0rsEyNP7Wvs44@cluster0.qri3xfq.mongodb.net/todo-db?retryWrites=true&w=majority&appName=Cluster0`

const mongoDB = async () => {

    await mongoose.connect(url)
        .then(async () => {
            console.log('Connected to the database ')
            


        }).catch ( (err) => {
    console.error(`Error connecting to the database. n${err}`);
})
}
module.exports = mongoDB;