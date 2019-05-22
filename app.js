const express = require('express');
const bodyParser = require('body-parser');

const mysql = require('mysql');

const app = express();

//File contains all string constants in form of object literals
const APP_DATA_OBJ = require('./src/appData');

//Object contains string literals in form of key:value pairs
const APP_STRINGS = APP_DATA_OBJ.appStrings; 

//object contains string data related to app
const APP_DATA = APP_DATA_OBJ.appData;

//Router file for /user routes
const userRoute = require(APP_STRINGS.USER_ROUTE_FILE); 

//Port no. : TAKE FROM ENV FILE
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//APP_DATA.USER_ROUTE => '/user'
app.use(APP_DATA.USER_ROUTE, userRoute);

app.listen(PORT, ()=> {
	console.log(`Listening to port ${PORT}`);
});