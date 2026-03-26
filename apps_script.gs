// Google Apps Script code
// To save new patient data or update existing patient data in Google Sheets

const SHEET_NAME = "Form responses 1"; // Change if your sheet name is different

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);
    
    // Find hospitalId in the incoming JSON keys
    let hospitalIdKey = Object.keys(data).find(k => k.toLowerCase().includes("hospital id") || k.includes("હોસ્પિટલ નંબર"));
    const hospitalId = data[hospitalIdKey];
    
    // We assume the first row has headers
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Let's find if the patient already exists by Hospital ID column
    // Which column index is hospital id?
    let idColumnIndex = headers.findIndex(h => h.includes("Hospital ID") || h.includes("હોસ્પિટલ નંબર"));
    
    if (idColumnIndex === -1) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Hospital ID column missing" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    let allData = [];
    if (sheet.getLastRow() > 1) {
      allData = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
    }
    let existingRowIndex = -1;
    
    for (let i = 0; i < allData.length; i++) {
       if (String(allData[i][idColumnIndex]).trim() === String(hospitalId).trim()) {
           existingRowIndex = i + 2; // +2 because 1-based indexing and header row
           break;
       }
    }

    let newRowData = [];
    headers.forEach((header, index) => {
      let headerStr = header.toString().trim();
      let headerClean = headerStr.toLowerCase()
        .replace(/[^a-z0-9]/g, ""); // Remove non-alphanumeric for comparison
      
      let key = Object.keys(data).find(k => {
        let kClean = k.toString().trim().toLowerCase().replace(/[^a-z0-9]/g, "");
        return headerClean === kClean || headerClean.includes(kClean) || kClean.includes(headerClean);
      });

      if (key && data[key] !== undefined && data[key] !== null) {
        newRowData[index] = data[key];
      } else if (existingRowIndex > -1) {
        // Keep existing data for columns not provided in the update
        newRowData[index] = sheet.getRange(existingRowIndex, index + 1).getValue();
      } else {
        newRowData[index] = "";
      }
    });

    if (existingRowIndex > -1) {
       // Update existing patient
       sheet.getRange(existingRowIndex, 1, 1, newRowData.length).setValues([newRowData]);
    } else {
       // Append new patient
       sheet.appendRow(newRowData);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Data saved successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Add CORS support for GET requests (for fetching data if needed)
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    // return entire sheet as json just like elk.sh
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
    
    const jsonArray = data.map(row => {
      let obj = {};
      headers.forEach((header, i) => {
         obj[header] = row[i];
      });
      return obj;
    });

    return ContentService.createTextOutput(JSON.stringify(jsonArray))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
