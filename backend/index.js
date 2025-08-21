const express = require('express')
const app = express()

app.use(express.json());
// The code snippet app.use(express.json()); in an Express.js application serves as a middleware function.
//  Its primary purpose is to parse incoming request bodies that contain JSON data.


const cors = require('cors');
app.use(cors());

const connectDb = require('./db/db.js')
connectDb()

app.get('/' , (req , res) => {
    res.send('api is running')
})

const employeeRoutes = require('./routes/employeeRoutes');
const leaveRoutes = require('./routes/leaveRoutes');

app.use('/api/employees', employeeRoutes);
app.use('/api/leaves', leaveRoutes);

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);



const PORT = 5000;
app.listen(PORT , ()=>{
    console.log(`app listening in port ${PORT}`)
})