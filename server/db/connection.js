const mongoose = require("mongoose");
const databaseConnetion = async(uri) =>{
    try{
        await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DBconnected Successfully")
    }catch(err){
        console.log(`DBconnection ERROR : ${err}`)
        process.exit(1);
    }
}
module.exports = {
    connectDB: databaseConnetion
}