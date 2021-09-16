function onEdit(e) {
  var folderName = "cHE$$50Ld3R";
  var alumnopath = DriveApp.getFoldersByName(folderName);
  var folderalumno = alumnopath.hasNext() ? alumnopath.next() : DriveApp.createFolder(folderName);
  var destFolderId = DriveApp.getFoldersByName(folderName).next().getId();
  var emailTopologies = saveAsSpreadsheet(destFolderId);
  // Logger.log(new_file_url);
   MailApp.sendEmail(emailTopologies.white, 'Chess Game Starts', 'Link to Chess Game: '+ emailTopologies.url, {name: 'Google Chess Engine', "cc": emailTopologies.black});
}

function saveAsSpreadsheet(destFolderId) {
  var destFolder = DriveApp.getFolderById(destFolderId);
  var random_number  = randomNumber();
  var new_file_id = DriveApp.getFileById("1kbVbgGk9rj3yfP4A2ILQUxMMhQTP5McKcrpAaYBwD34").makeCopy(random_number, destFolder).getId();
  var new_file = DriveApp.getFileById(new_file_id);
  new_file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
  var new_file_url = getFileUrl(new_file_id);
  var emails = getEmailsFromSheet(new_file_id);
  return {"white" : emails.white, "black": emails.black, "url": new_file_url};
}

function randomNumber(){
  var random_number = Math.random();
  random_number = (random_number * 100 + 1) + (Math.random() + 200) + (Math.random() * 10);
  random_number = parseInt(random_number);
  random_number = random_number.toString();
  return "Chess Game_" + random_number;
}

function getFileUrl(new_file_id){
  var url = "https://docs.google.com/spreadsheets/d/"+new_file_id;
  return url;
}

function getEmailsFromSheet(new_file_id){
  var data = FormApp.getActiveForm();
  var formResponses = data.getResponses();
  formResponses = formResponses[formResponses.length - 1];
  var formItems = data.getItems();
  var white = formResponses.getResponseForItem(formItems[0]).getResponse();;
  var black = formResponses.getResponseForItem(formItems[1]).getResponse();;
  return {"white" : white, "black" : black};
}







