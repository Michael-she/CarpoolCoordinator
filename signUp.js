const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Use body-parser to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle GET request to '/signup' endpoint
app.get('/signup', (req, res) => {
    // Send an HTML form as the response
    res.send(`
    <form method="post" action="/signup">
      Email: <input type="email" name="email"><br>
      Username: <input type="text" name="username"><br>
      Password: <input type="password" id="password" name="password"><br>
      Repeat Password: <input type="password" id="repeatPassword" name="repeatPassword"><br>
      Phone Number: <input type="tel" name="phoneNumber"><br>
      <div id="error"></div>
     
      <input type="submit" value="Sign Up">
    </form>
    <script>
    // Add event listener for input event on password fields
    document.getElementById("password").addEventListener("input", validate);
    document.getElementById("repeatPassword").addEventListener("input", validate);
    //document.getElementById("phoneNumber").addEventListener("input", validatePhone);

    // Validate function to check if passwords match
    function validate() {
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

  // Save user to database

  // Send a success message to the user
  res.send(`Thank you for signing up, ${username}! Your details have been saved.`);
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
