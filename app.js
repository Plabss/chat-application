//external imports
const express=require('express');
const dotenv=require('dotenv')
const mongoose=require('mongoose');
const path=require('path');
const cookieParser = require('cookie-parser');

//internal imports
const {notFoundHandler,errorHandler}=require("./middlewares/common/errorHandler");
const loginRouter=require('./routers/loginRouter');
const usersRouter=require('./routers/usersRouter');
const inboxRouter=require('./routers/inboxRouter');


const app=express();
dotenv.config();

//database connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("Database connection successful!"))
.catch(err=>console.log(err))

//request parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//set view engine
app.set("view engine","ejs");

//set static
app.use(express.static(path.join(__dirname,"public")));


//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup
app.use('/',loginRouter);
app.use('/users',usersRouter);
app.use('/inbox',inboxRouter);


//404 not found handler
app.use(notFoundHandler);

//common error handler
app.use(errorHandler);


app.listen(process.env.PORT,()=>{
    console.log(`app listening at port : ${process.env.PORT}`);
});

