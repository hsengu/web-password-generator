// Function to generate password based on chosen criteria
function generatePassword() {
  var userChoices = promptUserCriteria();
  var characterOptions = ["abcdefghijklmnopqrstuvwxyz","1234567890"," !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"];
  var selectedOptions = "";
  var password = "";
  
  if(userChoices) {
    for(var checkCriteria = 0; checkCriteria < userChoices.length; checkCriteria++) {
      if(userChoices[checkCriteria + 1]) {
        if(checkCriteria === 1)
          selectedOptions += characterOptions[checkCriteria - 1].toUpperCase();   //If Uppercase is selected
        else if(checkCriteria > 1)
          selectedOptions += characterOptions[checkCriteria - 1].toString();    //If Numbers or Symbols are selected
        else
          selectedOptions += characterOptions[checkCriteria];    //If Lowercase is selected
      }
    }

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

  // Call createCopyButton function
  createCopyButton(password);

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Create a copy button if password is not an empty string, remove button if an empty string
function createCopyButton(pass) {
  var copyBtn;
  
  // Try to remove copy button if it's present.
  copyBtn = document.getElementById("copy");
  if(copyBtn)
    copyBtn.remove;
  
  // Generate a copy button if password is not an empty string
  if(pass != "" && !document.getElementById("copy")) {
    copyBtn = document.createElement('button');
    copyBtn.addEventListener("click", copyPassword);
    copyBtn.id = "copy";
    copyBtn.className = "btn";
    copyBtn.innerHTML = "Copy to Clipboard";
    document.getElementById("generate").insertAdjacentElement("afterend",copyBtn);
  }
}

// Copy password function for copy button
function copyPassword() {
  var passwordText = document.querySelector("#password");

  navigator.clipboard.writeText(passwordText.value);
}

