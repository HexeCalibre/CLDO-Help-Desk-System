const COL_REQUIREMENT = 3;
const COL_USER_EMAIL = 4;
const COL_STATUS = 9;
const COL_PROCESSING = 11;
const COL_CLOSED = 12;
const COL_CANCELLED = 13;

function permissions(){
  GmailApp.getAliases()
}

function changeStatus() {
  var activeCell = SpreadsheetApp.getActiveRange();
  var activeSheet = activeCell.getSheet();
  var activeColumn = activeCell.getColumn();
  var activeRow = activeCell.getRow();
  var activeValue = activeCell.getValue();

  var email = activeSheet.getRange(activeRow,COL_USER_EMAIL).getValue()
  var reqCode=activeSheet.getRange(activeRow,COL_REQUIREMENT).getValue()

  if (activeSheet.getName() == "Requirements" && activeColumn == COL_STATUS && activeRow > 1) {
    if (activeValue == "Processing") activeSheet.getRange(activeRow, COL_PROCESSING).setValue(new Date())
    else if (activeValue == "Solved") {
      activeSheet.getRange(activeRow, COL_CLOSED).setValue(new Date())
      GmailApp.sendEmail(email, "Case Solved", "Dear Customer. \nWe would like to inform you that your Help Desk Case No." + reqCode + " has been marked as solved. Please help us improve by filling out our satisfaction questionnaire.")
    }
    else if (activeValue == "Cancelled") {
      activeSheet.getRange(activeRow, COL_CANCELLED).setValue(new Date())
      GmailApp.sendEmail(email, "Case Solved", "Dear Customer. \nWe would like to inform you that your Help Desk Case No." + reqCode + " has been marked as cancelled. Please help us improve by filling out our satisfaction questionnaire.")
    }
  }
}