function createMultipleSpreadsheets() {
    const uniqueFileNames = getUniqueFileNames();
  
    uniqueFileNames.forEach((fileName) => {
      if (!fileName) return;
  
      if (isFileExists(fileName)) {
        Logger.log(`Файл с именем ${fileName} уже существует.`);
        return;
      }
  
      const newFile = createNewSpreadsheet(fileName);
      createSheets(newFile);
      removeDefaultSheet(newFile);
      
      Logger.log(`Файл ${fileName} успешно создан.`);
    });
  }
  
  function getUniqueFileNames() {
    const ss = SpreadsheetApp.openById(config.spreadsheetId);
    const sheet = ss.getSheetByName(config.sheetNames.unionDate);
    const fileNames = sheet.getRange('AE3:AE' + sheet.getLastRow()).getValues().flat();
    const fileTypes = sheet.getRange('A3:A' + sheet.getLastRow()).getValues().flat();
  
    return [...new Set(fileNames.filter((_, i) => config.fileTypes.includes(fileTypes[i])))];
  }
  
  function isFileExists(fileName) {
    const folder = DriveApp.getFolderById(config.folderId);
    const files = folder.getFilesByName(fileName);
    return files.hasNext();
  }
  
  function createNewSpreadsheet(fileName) {
    const newFile = SpreadsheetApp.create(fileName);
    const newFileId = newFile.getId();
    const file = DriveApp.getFileById(newFileId);
    const folder = DriveApp.getFolderById(config.folderId);
  
    folder.addFile(file);
    DriveApp.getRootFolder().removeFile(file);
  
    return newFile;
  }
  
  function removeDefaultSheet(spreadsheet) {
    spreadsheet.deleteSheet(spreadsheet.getSheetByName('Sheet1'));
  }
  
  function createSheets(spreadsheet) {
    config.sheetsData.forEach((sheetData) => {
      switch (sheetData.name) {
        case 'Total':
        case 'Stat by day':
        case 'Stat by sites':
          createSheetWithHeaders(spreadsheet, sheetData);
          break;
        // Добавьте здесь обработку других типов листов, если они есть
        default:
          // Обработка других типов листов
          break;
      }
    });
  }
  
  function createSheetWithHeaders(spreadsheet, sheetData) {
    const sheet = spreadsheet.insertSheet(sheetData.name);
    const headers = sheetData.headers.map(header => header.split(','));
    sheet.getRange(1, 1, headers.length, headers[0].length).setValues(headers).setFontWeight('bold');
  
    if (sheetData.merge) {
      sheet.getRange(...sheetData.merge).merge().setHorizontalAlignment('center');
    }
  }
  