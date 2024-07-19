# CLDO Help Desk System

This project is a help desk system developed using Google Apps Script. It integrates Google Sheets and Google Forms to streamline the collection and management of help desk requests.

## Table of Contents

- [CLDO Help Desk System](#cldo-help-desk-system)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Setup](#setup)
  - [Usage](#usage)
  - [Dashboard Formulas](#dashboard-formulas)
  - [Functions](#functions)
    - [`addAnswer(e)`](#addanswere)
    - [`permissions()`](#permissions)
    - [`changeStatus()`](#changestatus)

## Introduction

The CLDO Help Desk System is designed to automate and simplify the process of managing help desk requests. This system uses Google Forms to collect user requests and Google Sheets to store and manage the data. The Apps Script code handles the integration between these services, ensuring that all requests are logged and processed efficiently.

## Features

- Collect help desk requests via Google Forms.
- Store and manage requests in Google Sheets.
- Automatically log responses with timestamp and user information.
- Generate unique codes for each request.

## Setup

To set up the CLDO Help Desk System, follow these steps:

1. **Create a Google Form**: Set up a Google Form with the necessary questions to collect help desk requests.

2. **Create a Google Sheet**: Create a Google Sheet where the form responses will be stored.

3. **Link the Form to the Sheet**: In the Google Form, go to the "Responses" tab and link the form to the Google Sheet you created.

4. **Add the Apps Script**: Open the Google Sheet, go to `Extensions` > `Apps Script`, and paste the provided Apps Script code.

## Usage

Once the setup is complete, users can submit help desk requests through the Google Form. The Apps Script will automatically log the requests in the Google Sheet, including the respondent's email, timestamp, and their answers to the form questions.

## Dashboard Formulas
Use the following formulas in your Google Sheet dashboard to analyze and display the help desk data:

- To select open requests:

```js
=QUERY(Requirements!A1:M,"SELECT A,C,E WHERE I='Open'")
```

- To count open cases by requirement:

```js
=QUERY(Requirements!A1:M,"SELECT E, COUNT(A) WHERE I='Open' GROUP BY E LABEL COUNT(A)'Cases'")
```

- To select processing requests:

```js
=QUERY(Requirements!A1:M,"SELECT A,C,E WHERE I='Processing'")
```

- To count the number of processing requests:

```js
=COUNTIF(Requirements!I:I,"Processing")
```

- To count the number of open requests:

```js
=COUNTIF(Requirements!I:I,"Open")
```

- To count the number of responses:
```js
=COUNTA(Requirements!G2:G)
```

## Functions

### `addAnswer(e)`

This function handles the form submission event. It logs the respondent's email, timestamp, and their responses to the Google Sheet. It also generates a unique code for each request.

```javascript
function addAnswer(e) {
  var formResponse = e.response;
  var email = formResponse.getRespondentEmail();
  var timestamp = formResponse.getTimestamp();
  var questionResponses = formResponse.getItemResponses();
  var area = questionResponses[0].getResponse();
  var requirement = questionResponses[1].getResponse();
  console.log("email :" + email);
  console.log("timestamp :" + timestamp);
  Logger.log("area :" + area);
  Logger.log("requirement :" + requirement);

  var ws = SpreadsheetApp.openById("1yahcS09T17Vhf6nPux0hm7pljOE74sQfFtzCg5UQfVQ");
  var ss = ws.getSheetByName("Requirements");
  var code;
  if (ss.getRange(ss.getLastRow(), 2).getValue() == "Requirement Code") {
    code = 1;
  } else {
    code = ss.getRange(ss.getLastRow(), 2).getValue() + 1;
  }
}
```

### `permissions()`

This function ensures that the form and sheet permissions are correctly set up.

```javascript
function permissions() {
  var ws = SpreadsheetApp.openById("1yahcS09T17Vhf6nPux0hm7pljOE74sQfFtzCg5UQfVQ");
  FormApp.getActiveForm();
}
```

### `changeStatus()`

This function changes the status of a requirement and sends email notifications based on the status change. It updates the corresponding dates for processing, solved, or cancelled statuses.

```javascript
// Column indices for specific fields in the sheet
const COL_REQUIREMENT = 3;
const COL_USER_EMAIL = 4;
const COL_STATUS = 9;
const COL_PROCESSING = 11;
const COL_CLOSED = 12;
const COL_CANCELLED = 13;

// Function to check Gmail aliases (for permissions)
function permissions() {
  GmailApp.getAliases();
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
  var email = activeSheet.getRange(activeRow, COL_USER_EMAIL).getValue();
  var reqCode = activeSheet.getRange(activeRow, COL_REQUIREMENT).getValue();

  // Check if the active sheet is "Requirements" and the active column is the status column, excluding the header row
  if (activeSheet.getName() == "Requirements" && activeColumn == COL_STATUS && activeRow > 1) {
    // If the status is "Processing", set the processing date to the current date
    if (activeValue == "Processing") {
      activeSheet.getRange(activeRow, COL_PROCESSING).setValue(new Date());
    }
    // If the status is "Solved", set the closed date to the current date and send an email to the user
    else if (activeValue == "Solved") {
      activeSheet.getRange(activeRow, COL_CLOSED).setValue(new Date());
      GmailApp.sendEmail(email, "Case Solved", "Dear Customer. \nWe would like to inform you that your Help Desk Case No." + reqCode + " has been marked as solved. Please help us improve by filling out our satisfaction questionnaire.");
    }
    // If the status is "Cancelled", set the cancelled date to the current date and send an email to the user
    else if (activeValue == "Cancelled") {
      activeSheet.getRange(activeRow, COL_CANCELLED).setValue(new Date());
      GmailApp.sendEmail(email, "Case Solved", "Dear Customer. \nWe would like to inform you that your Help Desk Case No." + reqCode + " has been marked as cancelled. Please help us improve by filling out our satisfaction questionnaire.");
    }
  }
}
```