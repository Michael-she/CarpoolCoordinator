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
    // Send an HTML form as the response
    res.send(`
    
<form method="post" action="/signup">
    Email: <input type="email" name="email"><br>
        Username: <input type="text" name="username"><br>
            Password: <input type="password" id="password" name="password"><br>
                Repeat Password: <input type="password" id="repeatPassword" name="repeatPassword"><br>
                    Phone Number: <input type="tel" id="phoneNumber" name="phoneNumber" ><br>
                        <div id="error"></div>
                        <div id="errorPhone"></div>
                        <input type="submit" value="Sign Up">
                        </form>
                        <script>
    // Add event listener for input event on password fields
                            document.getElementById("password").addEventListener("input", validatePassword);
                       document.getElementById("repeatPassword").addEventListener("input", validatePassword);
                            document.getElementById("phoneNumber").addEventListener("focusout", validatePhoneNumber);
                            document.getElementById("phoneNumber").addEventListener("input", clearError);


                            // Validate function to check if passwords match

       function validatePassword() {
                                console.log("Checking Password");
                            // Get the values of the password fields

                            var password = document.getElementById("password").value;
                            var repeatPassword = document.getElementById("repeatPassword").value;
                            // Check if passwords match
                            if(password !== repeatPassword){
                                // If passwords do not match, display an error message
                                document.getElementById("error").innerHTML = "Passwords do not match";
        } else {
                                // If passwords match, clear the error message
                                document.getElementById("error").innerHTML = "";
        }
      }


                            function clearError() {

                                document.getElementById("errorPhone").innerHTML = "";
                            }
    //Validate the phone Number
 function validatePhoneNumber() {
   console.log("Testing Phone Number");
   var phoneNumber = document.getElementById("phoneNumber").value;
   if(phoneNumber === ""){
      return;
   }
   var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
   if(phoneRegex.test(phoneNumber)){
       document.getElementById("errorPhone").innerHTML = "";
console.log("Passed");
    } else {
       document.getElementById("errorPhone").innerHTML = "PHNE NUMBER Not valid";
       console.log("It failed...");
    }
 }
                        </script>
  `);
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
});

// Start the server on port 3000
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
