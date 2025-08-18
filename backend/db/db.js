const mongoose = require('mongoose')

const connectDb = async ()=> {
    try {
        await mongoose.connect('mongodb+srv://shibajyotimaity06:zKdHdtkYgQOgJGuh@hrleave.kzchm23.mongodb.net/' , {
            useNewUrlParser: true,
      useUnifiedTopology: true,
        })

        console.log('created ra baba and connected')
    } catch (err) {
       console.log('mongoose connection failed ' , err);
       process.exit(1) 
    }
}

module.exports = connectDb


// useNewUrlParser: true: Use the new MongoDB connection string parser.

//useUnifiedTopology: true: Use the new server discovery and monitoring engine.