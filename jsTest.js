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
                            //  document.getElementById('phoneNumber').addEventListener("focusout", validatePhoneNumber(document.getElementById("phoneNumber").value));

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
    


                        </script>