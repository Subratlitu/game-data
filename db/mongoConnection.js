const mongoose = require('mongoose')


async function connectToMongo(){
    try{
        await mongoose.connect('mongodb+srv://subrat1234:litu1234@cluster0.h1cfx.mongodb.net/subrat?retryWrites=true&w=majority',{
        useNewUrlParser:true
    })
    console.log('Mongodb connected ..');
    }
    catch(err){
       console.log('Error in connecting mongo',err)
    }
} 
module.exports = {mongoose,connectToMongo}
 