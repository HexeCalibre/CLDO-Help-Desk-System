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

  // Log the email and timestamp to the console
  console.log("email: " + customerEmail);
  console.log("timestamp: " + timestamp);

  // Log the area and requirement to the Logger
  Logger.log("area: " + area);
  Logger.log("requirement: " + requirement);
  Logger.log("date: " + date);
  Logger.log("time: " + time);

  // Open the Google Sheets document by its ID
  var ws = SpreadsheetApp.openById("1yahcS09T17Vhf6nPux0hm7pljOE74sQfFtzCg5UQfVQ");

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
  requirementSheet.appendRow([date, time, code, customerEmail, area, requirement, responsible, responsibleEmail]);
}

// Function to ensure the form and sheet permissions are correct
function permissions() {
  // Open the Google Sheets document by its ID
  var ws = SpreadsheetApp.openById("1yahcS09T17Vhf6nPux0hm7pljOE74sQfFtzCg5UQfVQ");

  // Get the active form
  FormApp.getActiveForm();
}