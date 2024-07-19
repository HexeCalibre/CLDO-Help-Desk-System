// Column indices for specific fields in the sheet
const COL_REQUIREMENT = 3;
const COL_USER_EMAIL = 4;
const COL_STATUS = 9;
const COL_PROCESSING = 11;
const COL_CLOSED = 12;
const COL_CANCELLED = 13;

// Function to check Gmail aliases (for permissions)
function permissions(){
  GmailApp.getAliases()
}

// Function to change the status of a requirement and send emails based on status changes
function changeStatus() {
  // Get the active cell, sheet, column, row, and value
  var activeCell = SpreadsheetApp.getActiveRange();
  var activeSheet = activeCell.getSheet();
  var activeColumn = activeCell.getColumn();
  var activeRow = activeCell.getRow();
  var activeValue = activeCell.getValue();

  // Get the user's email and requirement code from the sheet
  var email = activeSheet.getRange(activeRow,COL_USER_EMAIL).getValue()
  var reqCode=activeSheet.getRange(activeRow,COL_REQUIREMENT).getValue()

  // Check if the active sheet is "Requirements" and the active column is the status column, excluding the header row
  if (activeSheet.getName() == "Requirements" && activeColumn == COL_STATUS && activeRow > 1) {
    // If the status is "Processing", set the processing date to the current date
    if (activeValue == "Processing") activeSheet.getRange(activeRow, COL_PROCESSING).setValue(new Date())
    // If the status is "Solved", set the closed date to the current date and send an email to the user
    else if (activeValue == "Solved") {
      activeSheet.getRange(activeRow, COL_CLOSED).setValue(new Date())
      GmailApp.sendEmail(email, "Case Solved", "Dear Customer. \nWe would like to inform you that your Help Desk Case No." + reqCode + " has been marked as solved. Please help us improve by filling out our satisfaction questionnaire.")
    }
    // If the status is "Cancelled", set the cancelled date to the current date and send an email to the user
    else if (activeValue == "Cancelled") {
      activeSheet.getRange(activeRow, COL_CANCELLED).setValue(new Date())
      GmailApp.sendEmail(email, "Case Solved", "Dear Customer. \nWe would like to inform you that your Help Desk Case No." + reqCode + " has been marked as cancelled. Please help us improve by filling out our satisfaction questionnaire.")
    }
  }
}