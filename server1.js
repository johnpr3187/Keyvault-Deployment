//web server app with Express
//run as: nodemon server.js 







const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express(); 
//app.set;

hbs.registerPartials(__dirname + '\\views\\partials');
console.log(__dirname + '\\views\\partials');

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '\\public'));

/*app.use((req, res, next) => {  var now = new Date().toString();
  console.log(`${now};`);
	next(); }); 
*/

app.use((req, res, next) => {  var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
  	console.log(log);  
	fs.appendFile('server.log', log + '\n', (err) => {  if (err) {    console.log('Unable to append to server.log.')  } });

	next(); }); 

// console.log(__dirname + '\\public');

// looking for the root of the app. So we can just use forward slash (/) 
//for the first argument. In the second argument, we'll use a simple arrow function (=>).

/*
The arrow function (=>) will get called with two arguments. These are really important to how Express works: 
The first argument is request (req), which stores a ton of information about the request coming in. 
Things like the headers that were used, any body information, or the method that was made with a request to the path. 
All of that is stored in request. The second argument, respond (res), has a bunch of methods available so we can respond 
to the HTTP request in whatever way we like. We can customize what data we send back and we could set our HTTP status codes.
We'll explore both of these in detail. For now though, we'll use one method, res.send. This will let us respond to the request, sending some data back. In app.get function, let's call res.send, passing in a string. In the parentheses we'll add Hello Express!:
app.get('/', (req, res) => {  res.send('Hello Express!'); }); 

*/
//console.log('start');
/*
app.get('/', (req, res) => 
{ 
//	console.log('inside');
//	res.send('<h1>Hello Express!</h1>');
	
	 res.send(
	{    name: 'Andrew',    
		likes: ['Biking','Cities' ]  
	}); 

	
});
*/

hbs.registerHelper('getCurrentYear', () => { return new Date().getFullYear() });

hbs.registerHelper('screamIt', (text) => {  return text.toUpperCase(); }); 

app.get('/', (req, res) => {  
	res.render('home.hbs', 
	{    
		pageTitle: 'Home Page1',    
		welcomeMessage: 'Welcome to my website1',    
		currentYear: new Date().getFullYear()  
	}) 
}); 

app.get('/home', (req, res) => {  
	res.render('home.hbs', 
	{    
		pageTitle: 'Home Page',    
		welcomeMessage: 'Welcome to my website',    
		currentYear: new Date().getFullYear()  
	}) 
}); 


// app.get('/about', (req, res) => {   res.render('about.hbs');  }); 

// app.get('/about', (req, res) => {  res.render('about.hbs'); }); 

app.get('/about', (req, res) => {  res.render('about.hbs', {    pageTitle: 'About Page',    currentYear: new Date().getFullYear()  }); }); 

app.get('/bad', (req, res) => {  res.send({    errorMessage: 'Unable to handle request'  }); });





/*
call app.listen. The app.listen function will bind the application to a port on our machine. In this case, for our local 
host app, we will use port 3000, a really common port for developing locally. 
*/
// local only version
// app.listen(3000, () => {  console.log('Server is up on port 3000'); }); 
//Azure version
app.listen(port, () => {  console.log(`Server is up on port ${port}`); }); 