const SHEETS_ID = "1yahcS09T17Vhf6nPux0hm7pljOE74sQfFtzCg5UQfVQ"

// Function to add an answer to the Google Sheets document
function addAnswer(e) {
  // Get the form response
  var formResponse = e.response;

  // Get the email address of the respondent
  var customerEmail = formResponse.getRespondentEmail();

  // Get the timestamp of the response
  var timestamp = new Date();
  var date = timestamp.toLocaleDateString();
  var time = timestamp.toLocaleTimeString();

  // Get the responses to individual questions
  var questionResponses = formResponse.getItemResponses();

  // Get the response to the first question (area)
  var area = questionResponses[0].getResponse();

  // Get the response to the second question (requirement)
  var requirement = questionResponses[1].getResponse();

  // Open the Google Sheets document by its ID
  var ws = SpreadsheetApp.openById(SHEETS_ID);

  // Get the specific sheet named "Requirements"
  var requirementSheet = ws.getSheetByName("Requirements");

  // Get the specific sheet named "Areas"
  var areasSheet = ws.getSheetByName("Areas");

  // Variable to store the requirement code
  var code;

  // Get all data from the "Areas" sheet
  var areasData = areasSheet.getDataRange().getValues();

  // Create a list of area names from the "Areas" sheet
  var areasList = areasData.map(row => row[0]);

  // Find the row number of the given area
  var row = areasList.indexOf(area) + 1;

  // Get the responsible person and their email for the area
  var responsible = areasSheet.getRange(row, 2).getValue();
  var responsibleEmail = areasSheet.getRange(row, 3).getValue();

  // Check if the last entry in column 3 (C) of "Requirements" is "Requirement Code"
  if (requirementSheet.getRange(requirementSheet.getLastRow(), 3).getValue() == "Requirement Code") {
    // If so, set the code to 1
    code = 1;
  } else {
    // Otherwise, increment the code based on the last value
    code = requirementSheet.getRange(requirementSheet.getLastRow(), 3).getValue() + 1;
  }

  // Append a new row to the "Requirements" sheet with the collected data
  requirementSheet.appendRow([date, time, code, customerEmail, area, requirement, responsible, responsibleEmail, "Open"]);

  var subject = "Help Desk System Requirement No. " + code
  var messageCustomer = "Hello. Thank you for your requirement. We are processing it, and you will hear from us soon. The number of your requirement for future reference is " + code + ".\n Regards. \n Practical Sheets Team"
  var messageResponsible = "Hello. You've been assigned the Help Desk System case No. " + code + " by the user " + customerEmail + ". \n The requirement is " + requirement
  GmailApp.sendEmail(customerEmail,subject,messageCustomer)
  GmailApp.sendEmail(responsibleEmail,subject,messageResponsible)
}

// Function to ensure the form and sheet permissions are correct
function permissions() {
  // Open the Google Sheets document by its ID
  var ws = SpreadsheetApp.openById(SHEETS_ID);

  // Get the active form
  FormApp.getActiveForm();
}