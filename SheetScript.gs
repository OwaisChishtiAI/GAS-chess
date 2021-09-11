function setEmails() {
    var emails = findItem();
    SpreadsheetApp.getActiveSheet().getRange('J10').setValue(emails.white);
    SpreadsheetApp.getActiveSheet().getRange('J11').setValue(emails.black);
  }
  
  function onOpen(e) {
    // Add a custom menu to the spreadsheet.
    setEmails()
  }
  
  function randomNumber(){
    var random_number = Math.random();
    random_number = (random_number * 100 + 1) + (Math.random() + 200) + (Math.random() * 10);
    random_number = parseInt(random_number);
    random_number = random_number.toString()
    Logger.log(random_number);
  }
  
  function sendMail()
  {
    // var Drive = DriveApp;
    // var Name = "Chess Engine";
    // var app = SpreadsheetApp;
    // var LOOKUP = app.getActiveSpreadsheet().getSheetByName("Chess");
    // // var cell = LOOKUP.getRange("D1");  
    // // var Addr = cell.getValue();
    // // var ROW = LOOKUP.getLastRow();
    // var Addr = "sowais672@gmail.com"
    // var file = Drive.getFilesByName(Name);
    // var file = file.next();
    // var FORMAT = file.getAs(MimeType.GOOGLE_SHEETS);
  
    // TigerMail.sendEmail(Addr, "Hours", "Attached is a list of all of the events you have volunteered at:", {attachments: [FORMAT]} );
  
  var file = DriveApp.getFileById('1kbVbgGk9rj3yfP4A2ILQUxMMhQTP5McKcrpAaYBwD34').getSheetByName('Chess');
  // var file = SpreadsheetApp.getActiveSpreadsheet();
  // SpreadsheetApp.setActiveSheet(file.getSheetByName('Chess'))
  // var blob = Utilities.newBlob('Insert any HTML content here', 'text/html', 'my_document.html');
  MailApp.sendEmail('sowais672@gmail.com', 'Chess Board Positions', 'PFA Chess Board Positions', {
      name: 'Google Chess Engine',
      attachments: [file.getAs(MimeType.PDF)]
  });
  Browser.msgBox("Email Sent.")
  }
  function test(){
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var ssID = ss.getId();
  var sheetgId = ss.getActiveSheet().getSheetId();
  var sheetName = "Chess";
  
  var token = ScriptApp.getOAuthToken();
  
  var email = "sowais672@gmail.com";
  var subject = "Important Info!";
  var body = "PFA the report \n\nCheers,\n Roportobot";
  
  var url = "https://docs.google.com/spreadsheets/d/"+ssID+"/export?" + "format=xlsx" +  "&gid="+sheetgId+ "&portrait=true" + "&exportFormat=pdf";
  
  var result = UrlFetchApp.fetch(url, {
  headers: {
    'Authorization': 'Bearer ' +  token
  }
  });
  
  var contents = result.getContent();
  
  MailApp.sendEmail(email,subject ,body, {attachments:[{fileName:sheetName+".pdf", content:contents, mimeType:"application//pdf"}]});
  }
  
  function findItem(item){
    var sourceSS = SpreadsheetApp.getActiveSpreadsheet();      //= Spreadsheet
    var dataSheet = sourceSS.getSheetByName("players");           //= Sheet
    var dataLastRow = dataSheet.getLastRow(); 
    var white = dataSheet.getRange("B"+(dataLastRow)).getValues();
    var black = dataSheet.getRange("C"+(dataLastRow)).getValues();
    return {"white": white, "black": black}
  }