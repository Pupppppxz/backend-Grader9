// Link
var sheet     = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1RKm6l5pr49VeoKpmHwoCe2Y7frpLff5eeRYP9T7SNNs/edit#gid=0');
var db_post   = "https://api.ceboostup.com/api/add-question";
var db_del    = "https://api.ceboostup.com/api/del-question/"

// data
var data      = sheet.getSheetByName('[Main] Question').getDataRange().getValues();
var data_db   = sheet.getSheetByName('[Database]').getDataRange().getValues();
var data_pdf  = sheet.getSheetByName('[PDF]').getDataRange().getValues();

const checkBoxChange = (e) => {
  const checkBoxRange = "D11:D510";
  const range = e.range;

  // set status
  const values = sheet.getSheetByName('[Main] Question')
    .getRange(checkBoxRange)
    .offset(0, 0, range.getRow())
    .getValues()
    .map(([a], i) => [a === true ? "OPEN" : "CLOSE"]);
  sheet.getSheetByName('[Main] Question')
    .getRange(checkBoxRange)
    .offset(0, 1, values.length, values[0].length)
    .setValues(values);

  Logger.log("RUN")

  // lenght 4 => OPEN, lenght 5 => close
  if (sheet.getSheetByName('[Main] Question')
    .getRange(checkBoxRange)
    .offset(0, 1, values.length, values[0].length)
    .getValues()[values[0].length - 1].toString().length == 4) {
    
    Logger.log("OPEN");
    Web_Post(values.length - 1);  
  }
  else if (sheet.getSheetByName('[Main] Question')
    .getRange(checkBoxRange)
    .offset(0, 1, values.length, values[0].length)
    .getValues()[values[0].length - 1].toString().length == 5) {
    Logger.log("CLOSE");
    Web_Del(values.length - 1);
  }
};

const onEdit_Methods = (e) => checkBoxChange(e);

function Web_Post(row) {
  var number = data[row][1];
  var rank = data[row][5];
  var unit = data[row][7].toString();
  var title = data[row][8].toString();
  var question = data[row][9].toString();
  var detail = data[row][10].toString();
  var q_input = data[row][11].toString();
  var q_output = data[row][12].toString();
  var chaya = data[row][13].toString();
  var linkPDF = data[row][19].toString();

  var str_input1 = data_pdf[row - 10][6];
  var str_output1 = data_pdf[row - 10][7];
  var str_input2 = data_pdf[row - 10][8];
  var str_output2 = data_pdf[row - 10][9];
  var str_input3 = data_pdf[row - 10][10];
  var str_output3 = data_pdf[row - 10][11];

  var input = data_db[row - 10][2].toString();
  var output = data_db[row - 10][3].toString();

  var object = {
    "number":         number,
    "chaya":          chaya,
    "title":          title,
    "unit":           unit,
    "rank":           rank,

    "question":       question,
    "input":          input,
    "output" :        output,

    "str_input_1":    str_input1,
    "str_output_1":   str_output1,
    "str_input_2":    str_input2,
    "str_output_2":   str_output2,
    "str_input_3":    str_input3,
    "str_output_3":   str_output3,

    "detail" :        detail,
    "linkPDF" :       linkPDF,
    "q_input" :       q_input,
    "q_output" :      q_output,
  };

  // Logger.log(object);
  var json = JSON.stringify(object);
  Logger.log(json)

  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : json,
  };

  var id_;
  
  try {
    Logger.log(row);
    if (sheet.getSheetByName('[Main] Question').getRange("A" + row.toString()).getValue() == None) {
        // เอาไว้ถาม
      id_ = UrlFetchApp.fetch(db_post, options);
      Logger.log(id_);
    }
    else {
      Web_Del(row - 1);
      id_ = UrlFetchApp.fetch(db_post, options);
      Logger.log(id_);
    }
  }
  catch (e) {
    Logger.log(e);
  }

  // sheet.getRange()
  row = row + 1;
  
  if (sheet.getSheetByName('[Main] Question').getRange("D" + row.toString()).getValue() == true) {
    sheet.getSheetByName('[Main] Question').getRange("S" + row.toString()).setValue(id_);
  }
  else {
    sheet.getSheetByName('[Main] Question').getRange("S" + row.toString()).setValue(id_);
    Web_Del(row - 1);
  }
}

function Web_Del(row) {
  var id = data[row][0];
  var db_del_link = db_del + id;
  Logger.log(db_del_link);

  var options = {
    'method' : 'delete',
    'contentType': 'application/json'
  }
  row = row + 1;

  try {
    Logger.log(row);
    Logger.log(sheet.getSheetByName('[Main] Question').getRange("A" + row.toString()).getValue())
    if (sheet.getSheetByName('[Main] Question').getRange("A" + row.toString()).getValue() != "None" || 
        sheet.getSheetByName('[Main] Question').getRange("A" + row.toString()).getValue() != "NaN"
    )
      Logger.log(UrlFetchApp.fetch(db_del_link, options));
  }
  catch (e) {
    Logger.log(e);
  }
  sheet.getSheetByName('[Main] Question').getRange("S" + row.toString()).setValue("None"); 
}