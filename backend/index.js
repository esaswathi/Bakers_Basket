const express = require('express')
require('dotenv').config();
const cors = require('cors')


const app = express();
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



const RegisterUser = require('./Controller/Register.js') 
const LoginUser = require('./Controller/Login.js')


app.post('/register', RegisterUser)
app.post('/login', LoginUser)
