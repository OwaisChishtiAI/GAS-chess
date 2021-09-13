function setEmails() {
    var emails = findItem();
    SpreadsheetApp.getActiveSheet().getRange('J10').setValue(emails.white);
    SpreadsheetApp.getActiveSheet().getRange('J11').setValue(emails.black);
  }
  
  function setTimer(){
    var timerCell = SpreadsheetApp.getActiveSheet().getRange('J7');
    timerCell.setValue("00:00");
    timerCell.setHorizontalAlignment("center").setVerticalAlignment("middle");
    timerCell.setFontSize(28);
  }
  
  function reset_timer(){
    setTimer();
  }
  
  function start_timer(){
    var d = new Date();
    var tick = d.getTime()
    var sourceSS = SpreadsheetApp.getActiveSpreadsheet();      //= Spreadsheet
    var dataSheet = sourceSS.getSheetByName("Executions");
    dataSheet.getRange('Z999').setValue(tick);
  }
  
  function stop_timer(){
    var d = new Date();
    var tock = d.getTime()
    var sourceSS = SpreadsheetApp.getActiveSpreadsheet();      //= Spreadsheet
    var dataSheet = sourceSS.getSheetByName("Executions");
    var tick = dataSheet.getRange('Z999').getValue();
    var minutes = Math.floor((tock-tick)/(24*3600));
    var seconds = Math.floor((tock-tick)/(24*60));
    var delta = minutes + " : " + seconds;
    Logger.log(delta);
    var timerCell = SpreadsheetApp.getActiveSheet().getRange('J7');
    timerCell.setValue(delta.toString());
    timerCell.setHorizontalAlignment("center").setVerticalAlignment("middle");
    timerCell.setFontSize(28);
  }
  
  
  function onOpen(e) {
    // Add a custom menu to the spreadsheet.
    setEmails();
    setTimer();
  }
  
  function sendMail(){
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var ssID = ss.getId();
    var sheetgId = ss.getActiveSheet().getSheetId();
    var sheetName = "Chess";
  
    var token = ScriptApp.getOAuthToken();
  
    var emails = findItem()
  
    var email = emails.white;
    var subject = "Important Info!";
    var body = "PFA the report \n\nCheers,\n Roportobot";
  
    var url = "https://docs.google.com/spreadsheets/d/"+ssID+"/export?" + "format=xlsx" +  "&gid="+sheetgId+ "&portrait=true" + "&exportFormat=pdf";
  
    var result = UrlFetchApp.fetch(url, {
    headers: {
      'Authorization': 'Bearer ' +  token
    }
    });
  
    var contents = result.getContent();
  
    MailApp.sendEmail(email,subject ,body, {name: 'Google Chess Engine', "cc": emails.black, attachments:[{fileName:sheetName+".pdf", content:contents, mimeType:"application//pdf"}]});
  }
  
  function findItem(){
    var sourceSS = SpreadsheetApp.getActiveSpreadsheet();      //= Spreadsheet
    var dataSheet = sourceSS.getSheetByName("players");           //= Sheet
    var dataLastRow = dataSheet.getLastRow(); 
    var white = dataSheet.getRange("B"+(dataLastRow)).getValues();
    var black = dataSheet.getRange("C"+(dataLastRow)).getValues();
    return {"white": white, "black": black}
  }