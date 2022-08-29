/*General Config*/
const config = require('./config/global');
const logger = require("./config/logger");

/*Server*/
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);

const { Server } = require("socket.io");
const io = new Server(server);

/*Performance*/
const cluster = require("cluster");

/*Session*/
const session =  require('express-session');
const passport = require('passport');
const { initializePassport } = require('./models/Passport');
initializePassport();
app.use(session(config.mongostoreConfig));
app.use(passport.initialize());
app.use(passport.session());

/*View Engine*/
const handlebars = require('express-handlebars');
const {engine} = handlebars;
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "layout.hbs",
    })
);
app.set("views", "./views");
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname ,'public')));

/*Settings*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*Middlewar general*/
const routeErrorHandler = require("./middlewares/routeErrorHandler");
const chatMiddleware = require("./middlewares/chatMiddleware");

/*Routers*/
const mainRouter = require("./routes/mainRouter");
const cartRouter = require("./routes/cartRouter");
const adminRouter = require("./routes/adminRouter");
const supportRouter = require("./routes/chatRouter");
const productRouter = require("./routes/productRouter");

app.use("/", mainRouter);
app.use("/support", chatMiddleware(io), supportRouter);
app.use("/cart", cartRouter);
app.use("/admin", adminRouter);
app.use("/api", productRouter);
app.use(routeErrorHandler);

if(config.global.GZIP){
    const compression = require('compression');
    app.use(compression());
}

if(config.global.MODE !== 'fork'){
    if (cluster.isMaster) {
        for (let i = 0; i < config.maxCPUs; i++) {
            try {
                cluster.fork();
            } catch (error) {
                logger.loggerError.error(`Error en cluster: ${error}`);
            }        
        }
        cluster.on("exit", (worker, code, signal) => {
            try {
                cluster.fork();
            } catch (error) {
                logger.loggerError.error(`Error en cluster: ${error}`);
            }
        });
    }else{
        server.listen(config.global.PORT, () => {
            logger.loggerConsole.log('Server On');
            logger.loggerConsole.log(`Escuchando puerto: ${server.address().port}`);
        });
    }
}else{
    server.listen(config.global.PORT, () => {
        logger.loggerConsole.log('Server On');
        logger.loggerConsole.log(`Escuchando puerto: ${server.address().port}`);
    });
}