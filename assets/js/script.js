// Function to generate password based on chosen criteria
function generatePassword() {
  var userChoices = getUserCriteria();
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

    selectedOptions = shuffleString(selectedOptions);   //Shuffle string to mitigate pseudorandom bias

    for(var length = userChoices[0]; length > 0; length--) {
      password += selectedOptions.charAt(Math.floor(Math.random() * selectedOptions.length));
    }
  }

  return password;
}

// Function for handling user selected password criteria.
function getUserCriteria() {
  var choices;
  var passwordLength = document.querySelector("#length-input").value;
  
  if(passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength)) {
    alert("Please specify a valid length of your desired password.\nThis should be between 8 and 128 characters.");
    return;
  }

  var includeLowercase = document.querySelector("#lowercase").checked;
  var includeUppercase = document.querySelector("#uppercase").checked;
  var includeNumbers = document.querySelector("#numbers").checked;
  var includeSpecialCharacters = document.querySelector("#special").checked;

  if(includeLowercase || includeUppercase || includeNumbers || includeSpecialCharacters) {
    choices = [passwordLength, includeLowercase, includeUppercase, includeNumbers, includeSpecialCharacters];
  } else {
    alert("You must select at least 1 criteria to include.\nPlease try again.");
  }

  return choices;
}

// Function for shuffle string to make password more randomized to try and eliminate bias
function shuffleString(pass) {
  pass = pass.split('');

  for(var i = 0; i < pass.length; i++) {
    var tempIndex = Math.floor(Math.random() * pass.length);
    var tempChar = pass[i];
    pass[i] = pass[tempIndex];
    pass[tempIndex] = tempChar;
  }

  pass = pass.join('');
  return pass;
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
  var copyBtn = null;
  
  // Try to remove copy button if it's present.
  copyBtn = document.getElementById("copy");
  if(copyBtn) {
    copyBtn.parentElement.removeChild(copyBtn);
  }
  
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

// **** Unused Code **** Function for handling prompts and collecting user inputs.
/*function getUserCriteria() {
  var validInputs = false;

  //Loop until user inputs valid selections
  while(!validInputs) {
    var passwordLength = window.prompt("Please specify the length of your desired password.\nThis should be between 8 and 128 characters.");
    
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
}*/