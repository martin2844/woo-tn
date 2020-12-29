const express = require('express');
require('dotenv').config();
const connectDB = require("./config/db");
const https = require('https');
const fs = require('fs');
const logger = require('./utils/logger')(module);
// const Bree = require('bree');
//initialize express.
const app = express();
// const path = require("path")
//Body Parser
app.use(express.json({ extended: false, limit: '50mb'}));
app.use(express.urlencoded({extended: false, limit: '50mb' }));

//public dir
app.use('/public', express.static(__dirname + '/public/'));
// app.use('/orderpanel/', express.static(__dirname + "/orderpanel/build"));
// Set view engine.
app.set("view engine", "ejs");

//Crons if needed
// const bree = new Bree({
//     jobs: [
//         {
//             name: "queue",
//             interval: "2m"
//         }
//     ]
// });
// bree.start();

app.get("/", (req, res) => {
    console.log("home")
    res.render('home', {
    });
 
})


// React panel if needed:
// app.use(express.static(__dirname + "/orderpanel/build"));
// app.get("/panel", (req, res) => {
//     res.sendFile(path.join(__dirname, "/orderpanel/build", "index.html"))
// })


//Initialize DB
connectDB();

//ROUTES
app.use("/api/tiendanube/auth", require('./routes/tiendanube/auth'));
app.use("/api/tiendanube/setup", require("./routes/tiendanube/setup"));

/*Webhook routes*/
//Order Created
// app.use("/api/webhooks/created", require("./routes/webhooks/created"));
//Order Packed
// app.use("/api/webhooks/packed", require("./routes/webhooks/packed"));

// Add logger process.on
process.on('unhandledRejection', (reason, p) => {
    logger.error('exception occurred \n' + JSON.stringify(reason) );
    throw reason;
  });
process.on('unhandledException', (reason, p) => {
    logger.error('exception occurred \n' + JSON.stringify(reason));
    throw reason;
  });
  
const PORT = process.env.PORT || 5000;
// 

// if(process.env.NODE_ENV === "test") {
if(false){
    app.listen(PORT, console.log(`server started on ${PORT}`));
} else {
    // For https on localhost
    const httpsOptions = {
        key: fs.readFileSync('./security/selfsigned.key'),
        cert: fs.readFileSync('./security/selfsigned.crt')
    }

    const server = https.createServer(httpsOptions, app)
        .listen(PORT, () => {
            logger.info('server started at ' + PORT)
        })
    }

