const COL_STATUS = 9;
const COL_PROCESSING = 11;
const COL_CLOSED = 12;

function changeStatus() {
  var activeCell = SpreadsheetApp.getActiveRange();
  var activeSheet = activeCell.getSheet();
  var activeColumn = activeCell.getColumn();
  var activeRow = activeCell.getRow();
  var activeValue = activeCell.getValue();

  if (activeSheet.getName() == "Requirements" && activeColumn == COL_STATUS && activeRow > 1) {
    if (activeValue == "Processing") activeSheet.getRange(activeRow, COL_PROCESSING).setValue(new Date())
    else if (activeValue == "Solved" || activeValue == "Cancelled") activeSheet.getRange(activeRow, COL_CLOSED).setValue(new Date())
  }
}

function onEdit(){
  changeStatus();
}