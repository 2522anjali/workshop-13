const mongoose  = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const fs = require('fs');
const nodeCron = require('node-cron');

//Import ROutes
const authRoute = require('./route/auth');
const postRoute = require('./route/posts');


dotenv.config();

mongoose.connect( process.env.DB_CONNECT
    , {
    useNewUrlParser: true,
}).then(() => {
    console.log('connection successful');
}).catch((err) => console.log('no connection'));


//Middleware
app.use(express.json());
//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

nodeCron.schedule('* * * * *', () =>{
    write();
})

function write()
{
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours()+ ":" + today.getMinutes() +":" + today.getSeconds();
    var dateTime = date+ ''+ time;
    const data = "Data inserted-" + dateTime + "\n";
    fs.appendFile("anjali.txt",data,() =>{
        console.log("Data is inserted into the file after one minutes");
    })
}

app.listen(443, () =>
    console.log('up and running')
);
