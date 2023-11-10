const express = require('express');
const config = require('./config');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express(); // ایجاد روت

global.config = require('./config');

app.use(express.static(__dirname + "/public")); //یک میدلور برای پوشه فایل های استاتیک 
app.use(express.urlencoded({ extended: false }));  //گرفتن اطلاعات از نوع جیسان از کاربر
app.set('view engine', 'ejs');
app.use('/user', require('./routes/user'));
app.use(methodOverride('method'));
app.use(cookieParser('hhgftrskjoio45'));
app.use(session({
    secret: 'gvgtrderoj457',
    resave: true,
    saveUninitialized: true,
    cookie: { secret: true }
}));
app.use(flash());


// app.get('/', function(req, res){     // یک روت ایجاد کردیم از نوع گت
//     res.send(`hiii ${req.query.name}`);
// })




app.listen(config.port, ()=>{
    console.log(`server is runing on port ${config.port}`)
});