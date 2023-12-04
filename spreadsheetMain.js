// spreadsheetMain

function createMultipleSpreadsheets() {
  const uniqueFileNames = getUniqueFileNames();
  uniqueFileNames.forEach((fileName) => {
    if (!fileName) return;
    if (isFileExists(fileName)) {
      Logger.log(`Файл с именем ${fileName} уже существует.`);
      return;
    }
    const newFile = createNewSpreadsheet(fileName);
    createSheets(newFile, fileName, getFileType(fileName)); // Передаем fileName как аргумент
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

function getFileType(fileName, currentSheetName, fileType) {
  if (fileName.includes('GOH') && fileName.includes('Video')) return 'GOH / Video';
  if (fileName.includes('GOH') && fileName.includes('CTV')) return 'GOH / CTV';
  if (fileName.includes('GOH') && fileName.includes('Display')) return 'GOH / Display';
  if (fileName.includes('GOH') && fileName.includes('Audio')) return 'GOH / Audio';
  if (fileName.includes('GOH') && fileName.includes('DOOH')) return 'GOH / DOOH';
  if (fileName.includes('GOH') && fileName.includes('YouTube')) return 'GOH / YouTube';

  // if (fileName.includes('MOL') && fileName.includes('Video')) return 'MOL / Video';
  // if (fileName.includes('MOL') && fileName.includes('CTV')) return 'MOL / CTV';
  // if (fileName.includes('MOL') && fileName.includes('Display')) return 'MOL / Display';
  // if (fileName.includes('MOL') && fileName.includes('Audio')) return 'MOL / Audio';

  // if (fileName.includes('SJNY') && fileName.includes('Video')) return 'SJNY / Video';
  // if (fileName.includes('SJNY') && fileName.includes('CTV')) return 'SJNY / CTV';
  // if (fileName.includes('SJNY') && fileName.includes('Display')) return 'SJNY / Display';
  // if (fileName.includes('SJNY') && fileName.includes('Audio')) return 'SJNY / Audio';

  // if (!fileName.includes('GOH') && !fileName.includes('SJNY') && !fileName.includes('MOL') && fileName.includes('Video')) return 'Others / Video';
  // if (!fileName.includes('GOH') && !fileName.includes('SJNY') && !fileName.includes('MOL') && fileName.includes('CTV')) return 'Others / CTV';
  // if (!fileName.includes('GOH') && !fileName.includes('SJNY') && !fileName.includes('MOL') && fileName.includes('Display')) return 'Others / Display';
  // if (!fileName.includes('GOH') && !fileName.includes('SJNY') && !fileName.includes('MOL') && fileName.includes('Audio')) return 'Others / Audio';


}

function createSheets(spreadsheet, fileName, fileType) {
  config.sheetsData.forEach((sheetData) => {
    let updatedFileType = fileType;

    // Для листа "Stat by sites" выбираем структуру в зависимости от наличия "GOH" в имени файла
    if (sheetData.name === 'Stat by sites') {
      updatedFileType = fileName.includes('GOH') ? 'SBS + GOH' : 'SBS + ALL - GOH';
    }

    switch (sheetData.name) {
      case 'Total':
        createSheetWithHeaders(spreadsheet, sheetData, updatedFileType);
        break;
      case 'Stat by day':
        createSheetWithHeaders(spreadsheet, sheetData, updatedFileType);
        break;
      case 'Stat by creatives':
        createSheetWithHeaders(spreadsheet, sheetData, updatedFileType);
        break;
      case 'Stat by sites':
        createSheetWithHeaders(spreadsheet, sheetData, updatedFileType);
        break;
    }
  });
}


function createSheetWithHeaders(spreadsheet, sheetData, fileType) {
  let headers, merge;
  if (sheetData.types && sheetData.types[fileType]) {
    headers = sheetData.types[fileType].headers;
    merge = sheetData.types[fileType].merge;
  } else {
    headers = sheetData.headers;
    merge = sheetData.merge;
  }

  if (!headers) {
    Logger.log('Ошибка: заголовки не определены для fileType: ' + fileType);
    return;
  }

  const sheet = spreadsheet.insertSheet(sheetData.name);
  const headerRows = headers.map(header => header.split(','));
  sheet.getRange(1, 1, headerRows.length, headerRows[0].length).setValues(headerRows).setFontWeight('bold');
  if (merge) {
    sheet.getRange(...merge).merge().setHorizontalAlignment('center');
  }
}

