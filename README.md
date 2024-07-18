# CLDO Help Desk System

This project is a help desk system developed using Google Apps Script. It integrates Google Sheets and Google Forms to streamline the collection and management of help desk requests.

## Table of Contents

- [CLDO Help Desk System](#cldo-help-desk-system)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Setup](#setup)
  - [Usage](#usage)
  - [Functions](#functions)
    - [`addAnswer(e)`](#addanswere)
    - [`permissions()`](#permissions)

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