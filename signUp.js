const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();



const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL);

// Use body-parser to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle GET request to '/' endpoint
app.get('/', (req, res) => {

    res.sendfile("jsTest.html");

});

// Handle POST request to '/signup' endpoint
app.post('/signup', (req, res) => {
    
  // Get the form data from the request body
  const { email, username, password, repeatPassword, phoneNumber } = req.body;


  // Validate input
  if (password !== repeatPassword) {
    // If passwords do not match, return an error message
    return res.send("Passwords do not match");
  }
  if(!email || !username || !password || !repeatPassword || !phoneNumber) {
    return res.send("Please fill all the fields");
  }
  // Save user to database

    var SQL = 'INSERT INTO users (name, phone_number, email, password) VALUES("' + username + '", "' + phoneNumber + '", "' + email + '", "' + password +'");';

    connection.query(SQL, function (err, rows, fields) {
        if (err) throw err

        res.send(rows)
    })

  // Send a success message to the user
    res.send(`Thank you for signing up, ${username}! Your details have been saved.`);
    res.sendFile("sucsessPage.html");

});

// Start the server on port 3000
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
