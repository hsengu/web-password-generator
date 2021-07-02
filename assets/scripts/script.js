// Function to generate password based on chosen criteria
function generatePassword() {
  var userChoices = promptUserCriteria();
  var characterOptions = ["abcdefghijklmnopqrstuvwxyz","1234567890","!@#$%^&*()_-+=~`[]{};\':\",./<>?"];
  var selectedOptions = "";
  var password = "";
  
  if(userChoices) {
    for(var countCriteria = 1; countCriteria < userChoices.length; countCriteria++) {
      if(userChoices[countCriteria]) {
        if(countCriteria === 2)
          selectedOptions += characterOptions[countCriteria - 2].toUpperCase();
        else if(countCriteria > 2)
          selectedOptions += characterOptions[countCriteria - 2];
        else
          selectedOptions += characterOptions[countCriteria - 1];
      }
      console.log(selectedOptions);
    }
    console.log(userChoices.length + " size of ary");

    for(var length = userChoices[0]; length > 0; length--) {
      password += selectedOptions.charAt(Math.floor(Math.random() * selectedOptions.length));
    }
  }
  
  return password;
}

// Function for handling prompts and collecting user inputs.
function promptUserCriteria() {
  var validInputs = false;

  //Loop until user inputs valid selections
  while(!validInputs) {
    var passwordLength = window.prompt("Please enter the length of your desired password.\nThis should be between 8 and 128 characters.");
    
    if(passwordLength === null)   //Check if user wants to cancel the process
      return;
    else if(passwordLength < 8 || passwordLength > 128) {   //Check for valid password length
      alert("This is not a valid password length!");
      continue;
    }
    
    var includeLowercase = window.confirm("Would you like lowercase letters in your password?");
    var includeUppercase = window.confirm("Would you like uppercase letters in your password?");
    var includeNumbers = window.confirm("Would you like numbers in your password?");
    var includeSpecialCharacters = window.confirm("Would you like special characters in your password?");
    validInputs = true;

    var choices = [passwordLength, includeLowercase, includeUppercase, includeNumbers, includeSpecialCharacters];
  }

  return choices;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
