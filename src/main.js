/*const http = require('http');
const server = http.createServer((req, res) => {
    res.status = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello')
});

server.listen(3000, () => {
    console.log('Server on port 3000')
});*/

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const  morgan = require('morgan')
const mysql = require('mysql');
const myConnection = require('express-myconnection')
//initialization
const app = express();
//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    defaultLayout: 'main',
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
/*app.use(myConnection(mysql,{
        host: '192.168.40.133',
        user: 'development',
        password: '1234',
        port: 3306,
        database: 'Virtual'
}));*/
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp', 
    resave: true,
    saveUninitialized: true
}, 'single'));
app.use(express.urlencoded({extended: false}));
// Global variables
// Routes 
app.use(require('./routes/index'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'vendor')));
// Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});