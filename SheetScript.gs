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
  
    var email = emails.white[0][0];
    var subject = "Opponent Player Made Move";
    var body = "PFA Current Board Positions Snap.";
  
    var url = "https://docs.google.com/spreadsheets/d/"+ssID+"/export?" + "format=xlsx" +  "&gid="+sheetgId+ "&portrait=true" + "&exportFormat=pdf";
  
    var result = UrlFetchApp.fetch(url, {
    headers: {
      'Authorization': 'Bearer ' +  token
    }
    });
  
    var contents = result.getContent();
    // Logger.log(emails.white[0][0]);
    MailApp.sendEmail(email,subject ,body, {name: 'Google Chess Engine', "cc": emails.black[0][0], attachments:[{fileName:sheetName+".pdf", content:contents, mimeType:"application//pdf"}]});
    Browser.msgBox("Opponent has been Notified.");
  }
  
  function findItem(){
    var sourceSS = SpreadsheetApp.getActiveSpreadsheet();      //= Spreadsheet
    var dataSheet = sourceSS.getSheetByName("players");           //= Sheet
    var dataLastRow = dataSheet.getLastRow(); 
    var white = dataSheet.getRange("B"+(dataLastRow)).getValues();
    var black = dataSheet.getRange("C"+(dataLastRow)).getValues();
    return {"white": white, "black": black}
  }
  
  function end_game() {
    var ui = SpreadsheetApp.getUi();
    
    // var black_button = CardService.newTextButton().setText("Black");
    // var white_button = CardService.newTextButton().setText("White");
    // var custom_buttons = CardService.newButtonSet().addButton(black_button).addButton(white_button);
    var result = ui.prompt("Who Wins? Enter Black or White.");
    //Get the button that the user pressed.
    var button = result.getSelectedButton();
    
    if (button === ui.Button.OK) {
      Logger.log("The user clicked the [OK] button.");
      Logger.log(result.getResponseText());
      var winner = result.getResponseText();
      ui.alert("Congrats " + winner + "!");
    } else if (button === ui.Button.CLOSE) {
      Logger.log("The user clicked the [X] button and closed the prompt dialog."); 
    }
  
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var ssID = ss.getId();
    var file = DriveApp.getFileById(ssID);
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var ssID = ss.getId();
    var sheetgId = ss.getActiveSheet().getSheetId();
    var sheetName = "Chess";
  
    var token = ScriptApp.getOAuthToken();
  
    var emails = findItem()
  
    var email = emails.white[0][0];
    var subject = winner + "Wins, Game Ended.";
    var body = "PFA Last Board Positions Snap.";
  
    var url = "https://docs.google.com/spreadsheets/d/"+ssID+"/export?" + "format=xlsx" +  "&gid="+sheetgId+ "&portrait=true" + "&exportFormat=pdf";
  
    var result = UrlFetchApp.fetch(url, {
    headers: {
      'Authorization': 'Bearer ' +  token
    }
    });
  
    var contents = result.getContent();
    // Logger.log(emails.white[0][0]);
    MailApp.sendEmail(email,subject ,body, {name: 'Google Chess Engine', "cc": emails.black[0][0], attachments:[{fileName:sheetName+".pdf", content:contents, mimeType:"application//pdf"}]});
    Browser.msgBox("The Game has Ended.");
  
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  }
  
  
  
  
  
  
  
  
  
  
  