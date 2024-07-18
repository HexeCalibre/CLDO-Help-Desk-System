// Function to add an answer to the Google Sheets document
function addAnswer(e) {
    // Get the form response
    var formResponse = e.response;
  
    // Get the email address of the respondent
    var email = formResponse.getRespondentEmail();
  
    // Get the timestamp of the response
    var timestamp = formResponse.getTimestamp();
  
    // Get the responses to individual questions
    var questionResponses = formResponse.getItemResponses();
  
    // Get the response to the first question (area)
    var area = questionResponses[0].getResponse();
  
    // Get the response to the second question (requirement)
    var requirement = questionResponses[1].getResponse();
  
    // Log the email and timestamp to the console
    console.log("email :" + email);
    console.log("timestamp :" + timestamp);
  
    // Log the area and requirement to the Logger
    Logger.log("area :" + area);
    Logger.log("requirement :" + requirement);
  
    // Open the Google Sheets document by its ID
    var ws = SpreadsheetApp.openById("1yahcS09T17Vhf6nPux0hm7pljOE74sQfFtzCg5UQfVQ");
  
    // Get the specific sheet named "Requirements"
    var ss = ws.getSheetByName("Requirements");
  
    // Variable to store the requirement code
    var code;
  
    // Check if the last entry in column 2 is "Requirement Code"
    if (ss.getRange(ss.getLastRow(), 2).getValue() == "Requirement Code") {
      // If so, set the code to 1
      code = 1;
    } else {
      // Otherwise, increment the code based on the last value
      code = ss.getRange(ss.getLastRow(), 2).getValue() + 1;
    }
  }
  
  // Function to ensure the form and sheet permissions are correct
  function permissions() {
    // Open the Google Sheets document by its ID
    var ws = SpreadsheetApp.openById("1yahcS09T17Vhf6nPux0hm7pljOE74sQfFtzCg5UQfVQ");
  
    // Get the active form
    FormApp.getActiveForm();
  }