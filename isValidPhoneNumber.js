const twilio = require('twilio');

function isValidPhoneNumber(phoneNumber) {
  try {
    // Use the Twilio library to validate the phone number
    const phoneNumber = twilio.validate.phone(phoneNumber);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  isValidPhoneNumber
};