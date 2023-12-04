// Stat dy day

// Stat dy day / Display
function aggregateAndMapDataForAllFiles_statbydayDisplay() {
  const folderId = configTotal.folderDisplay;
  const sourceSpreadsheetId = configTotal.sourceSpreadsheetId;

  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    const ss = SpreadsheetApp.openById(sourceSpreadsheetId);
    const sheet = ss.getSheetByName('union_date');
    const allData = sheet.getRange('A2:AE' + sheet.getLastRow()).getValues();
    const filteredData = allData.filter(row => row[30] === fileName);
    const mapping = { 1: 3, 2: 4, 3: 7, 4: 9, 5: 10, 6: 11, 7: 13, 9: 15, 11: 20, 12: 21, 13: 22, 14: 23, 15: 24, 16: 25, 17: 26 };
    const aggregatedData = {};

    filteredData.forEach(row => {
      const key1 = row[mapping[1] - 1];
      const key2 = row[mapping[2] - 1];
      const key3 = Utilities.formatDate(new Date(row[mapping[3] - 1]), Session.getScriptTimeZone(), "MM/dd/yyyy");
      const combinedKey = `${key1}_${key2}_${key3}`;

      if (!aggregatedData[combinedKey]) {
        aggregatedData[combinedKey] = {};
        aggregatedData[combinedKey][1] = key1;
        aggregatedData[combinedKey][2] = key2;
        aggregatedData[combinedKey][3] = key3;
      }

      Object.keys(mapping).forEach(targetCol => {
        if (targetCol == 1 || targetCol == 2 || targetCol == 3) return;
        const sourceCol = mapping[targetCol] - 1;
        if (!aggregatedData[combinedKey][targetCol]) {
          aggregatedData[combinedKey][targetCol] = 0;
        }
        if (typeof row[sourceCol] === 'number' && !isNaN(row[sourceCol])) {
          aggregatedData[combinedKey][targetCol] += row[sourceCol];
        }
      });
    });

    const targetSpreadsheet = SpreadsheetApp.openById(file.getId());
    const targetSheet = targetSpreadsheet.getSheetByName('Stat by day');
    targetSheet.getRange('A2:Z' + targetSheet.getMaxRows()).clearContent().clearFormat();

    const output = [];

    Object.keys(aggregatedData).forEach(combinedKey => {
      const row = new Array(26).fill('');
      const data = aggregatedData[combinedKey];
      row[0] = data[1];
      row[1] = data[2];
      row[2] = data[3];
      Object.keys(mapping).forEach(targetCol => {
        if (targetCol == 1 || targetCol == 2 || targetCol == 3) return;
        row[targetCol - 1] = data[targetCol];
      });

      // Форматирование числовых значений без округления
      row[3] = row[3] || 0; // 4-й столбец
      row[4] = row[4] || 0; // 5-й столбец
      row[5] = row[5] || 0; // 6-й столбец
      row[6] = row[6] || 0; // 7-й столбец

      // Формула для процентного столбца
      row[7] = `=IFERROR(G:G/E:E,0)`;

      // Форматирование денежных значений без округления
      row[8] = row[8] ? `\$${row[8]}` : '$0.00'; // 9-й столбец
      row[9] = `=IFERROR(I:I/E:E*1000,0)`;

      output.push(row);
    });

    const targetRange = targetSheet.getRange(2, 1, output.length, 26);
    targetRange.setValues(output);

    // Применение форматирования к столбцам
    targetSheet.getRange(2, 4, output.length).setNumberFormat("#,##0"); // 4-й столбец
    targetSheet.getRange(2, 5, output.length).setNumberFormat("#,##0"); // 5-й столбец
    targetSheet.getRange(2, 6, output.length).setNumberFormat("#,##0"); // 6-й столбец
    targetSheet.getRange(2, 7, output.length).setNumberFormat("0"); // 7-й столбец
    targetSheet.getRange(2, 8, output.length).setNumberFormat("0.00%"); // 8-й столбец
    // Для 9-го столбца форматирование применять не нужно, так как они уже представлены в виде строк
    targetSheet.getRange(2, 10, output.length).setNumberFormat("$#,##0.00"); // 10-й столбец
    targetSheet.getRange(2, 11, output.length, 7).setNumberFormat("#,##0"); // 11-й столбец


    Logger.log('Данные успешно агрегированы и записаны для файла: ' + fileName);
  }
}

// Stat dy day / Audio
function aggregateAndMapDataForAllFiles_statbydayAudio() {
  const folderId = configTotal.folderAudio;
  const sourceSpreadsheetId = configTotal.sourceSpreadsheetId;

  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    const ss = SpreadsheetApp.openById(sourceSpreadsheetId);
    const sheet = ss.getSheetByName('union_date');
    const allData = sheet.getRange('A2:AE' + sheet.getLastRow()).getValues();
    const filteredData = allData.filter(row => row[30] === fileName);
    const mapping = { 1: 3, 2: 4, 3: 7, 4: 9, 5: 10, 6: 11, 7: 13, 9: 15, 12: 17, 14: 20, 15: 21, 16: 22, 17: 23, 18: 24, 19: 25, 20: 26 };
    const aggregatedData = {};

    filteredData.forEach(row => {
      const key1 = row[mapping[1] - 1];
      const key2 = row[mapping[2] - 1];
      const key3 = Utilities.formatDate(new Date(row[mapping[3] - 1]), Session.getScriptTimeZone(), "MM/dd/yyyy");
      const combinedKey = `${key1}_${key2}_${key3}`;

      if (!aggregatedData[combinedKey]) {
        aggregatedData[combinedKey] = {};
        aggregatedData[combinedKey][1] = key1;
        aggregatedData[combinedKey][2] = key2;
        aggregatedData[combinedKey][3] = key3;
      }

      Object.keys(mapping).forEach(targetCol => {
        if (targetCol == 1 || targetCol == 2 || targetCol == 3) return;
        const sourceCol = mapping[targetCol] - 1;
        if (!aggregatedData[combinedKey][targetCol]) {
          aggregatedData[combinedKey][targetCol] = 0;
        }
        if (typeof row[sourceCol] === 'number' && !isNaN(row[sourceCol])) {
          aggregatedData[combinedKey][targetCol] += row[sourceCol];
        }
      });
    });

    const targetSpreadsheet = SpreadsheetApp.openById(file.getId());
    const targetSheet = targetSpreadsheet.getSheetByName('Stat by day');
    targetSheet.getRange('A2:Z' + targetSheet.getMaxRows()).clearContent().clearFormat();

    const output = [];

    Object.keys(aggregatedData).forEach(combinedKey => {
      const row = new Array(26).fill('');
      const data = aggregatedData[combinedKey];
      row[0] = data[1];
      row[1] = data[2];
      row[2] = data[3];
      Object.keys(mapping).forEach(targetCol => {
        if (targetCol == 1 || targetCol == 2 || targetCol == 3) return;
        row[targetCol - 1] = data[targetCol];
      });

      // Форматирование числовых значений без округления
      row[3] = row[3] || 0; // 4-й столбец
      row[4] = row[4] || 0; // 5-й столбец
      row[5] = row[5] || 0; // 6-й столбец
      row[6] = row[6] || 0; // 7-й столбец

      // Формула для процентного столбца
      row[7] = `=IFERROR(G:G/E:E,0)`;

      // Форматирование денежных значений без округления
      row[8] = row[8] ? `\$${row[8]}` : '$0.00'; // 9-й столбец
      row[9] = `=IFERROR(I:I/E:E*1000,0)`;
      row[10] = '=iferror(E:E/D:D,0)';
      row[12] = '=iferror(L:L/E:E,0)';



      output.push(row);
    });

    const targetRange = targetSheet.getRange(2, 1, output.length, 26);
    targetRange.setValues(output);

    // Применение форматирования к столбцам
    targetSheet.getRange(2, 4, output.length).setNumberFormat("#,##0"); // 4-й столбец
    targetSheet.getRange(2, 5, output.length).setNumberFormat("#,##0"); // 5-й столбец
    targetSheet.getRange(2, 6, output.length).setNumberFormat("#,##0"); // 6-й столбец
    targetSheet.getRange(2, 7, output.length).setNumberFormat("0"); // 7-й столбец
    targetSheet.getRange(2, 8, output.length).setNumberFormat("0.00%"); // 8-й столбец
    // Для 9-го столбца форматирование применять не нужно, так как они уже представлены в виде строк
    targetSheet.getRange(2, 10, output.length).setNumberFormat("$#,##0.00"); // 10-й столбец
    targetSheet.getRange(2, 11, output.length).setNumberFormat("0.00%"); // 11-й столбец
    targetSheet.getRange(2, 12, output.length).setNumberFormat("#,##0"); // 12-й столбец
    targetSheet.getRange(2, 13, output.length).setNumberFormat("0.00%");

    Logger.log('Данные успешно агрегированы и записаны для файла: ' + fileName);
  }
}

// Stat dy day / Video
function aggregateAndMapDataForAllFiles_statbydayVideo() {
  const folderId = configTotal.folderVideo;
  const sourceSpreadsheetId = configTotal.sourceSpreadsheetId;

  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    const ss = SpreadsheetApp.openById(sourceSpreadsheetId);
    const sheet = ss.getSheetByName('union_date');
    const allData = sheet.getRange('A2:AE' + sheet.getLastRow()).getValues();
    const filteredData = allData.filter(row => row[30] === fileName);
    const mapping = { 1: 3, 2: 4, 3: 7, 4: 9, 5: 10, 6: 11, 7: 13, 9: 15, 12: 17, 14: 20, 15: 21, 16: 22, 17: 23, 18: 24, 19: 25, 20: 26 };
    const aggregatedData = {};

    filteredData.forEach(row => {
      const key1 = row[mapping[1] - 1];
      const key2 = row[mapping[2] - 1];
      const key3 = Utilities.formatDate(new Date(row[mapping[3] - 1]), Session.getScriptTimeZone(), "MM/dd/yyyy");
      const combinedKey = `${key1}_${key2}_${key3}`;

      if (!aggregatedData[combinedKey]) {
        aggregatedData[combinedKey] = {};
        aggregatedData[combinedKey][1] = key1;
        aggregatedData[combinedKey][2] = key2;
        aggregatedData[combinedKey][3] = key3;
      }

      Object.keys(mapping).forEach(targetCol => {
        if (targetCol == 1 || targetCol == 2 || targetCol == 3) return;
        const sourceCol = mapping[targetCol] - 1;
        if (!aggregatedData[combinedKey][targetCol]) {
          aggregatedData[combinedKey][targetCol] = 0;
        }
        if (typeof row[sourceCol] === 'number' && !isNaN(row[sourceCol])) {
          aggregatedData[combinedKey][targetCol] += row[sourceCol];
        }
      });
    });

    const targetSpreadsheet = SpreadsheetApp.openById(file.getId());
    const targetSheet = targetSpreadsheet.getSheetByName('Stat by day');
    targetSheet.getRange('A2:Z' + targetSheet.getMaxRows()).clearContent().clearFormat();

    const output = [];

    Object.keys(aggregatedData).forEach(combinedKey => {
      const row = new Array(26).fill('');
      const data = aggregatedData[combinedKey];
      row[0] = data[1];
      row[1] = data[2];
      row[2] = data[3];
      Object.keys(mapping).forEach(targetCol => {
        if (targetCol == 1 || targetCol == 2 || targetCol == 3) return;
        row[targetCol - 1] = data[targetCol];
      });

      // Форматирование числовых значений без округления
      row[3] = row[3] || 0; // 4-й столбец
      row[4] = row[4] || 0; // 5-й столбец
      row[5] = row[5] || 0; // 6-й столбец
      row[6] = row[6] || 0; // 7-й столбец

      // Формула для процентного столбца
      row[7] = `=IFERROR(G:G/E:E,0)`;

      // Форматирование денежных значений без округления
      row[8] = row[8] ? `\$${row[8]}` : '$0.00'; // 9-й столбец
      row[9] = `=IFERROR(I:I/E:E*1000,0)`;
      row[10] = '=iferror(E:E/D:D,0)';
      row[12] = '=iferror(L:L/E:E,0)';



      output.push(row);
    });

    const targetRange = targetSheet.getRange(2, 1, output.length, 26);
    targetRange.setValues(output);

    // Применение форматирования к столбцам
    targetSheet.getRange(2, 4, output.length).setNumberFormat("#,##0"); // 4-й столбец
    targetSheet.getRange(2, 5, output.length).setNumberFormat("#,##0"); // 5-й столбец
    targetSheet.getRange(2, 6, output.length).setNumberFormat("#,##0"); // 6-й столбец
    targetSheet.getRange(2, 7, output.length).setNumberFormat("0"); // 7-й столбец
    targetSheet.getRange(2, 8, output.length).setNumberFormat("0.00%"); // 8-й столбец
    // Для 9-го столбца форматирование применять не нужно, так как они уже представлены в виде строк
    targetSheet.getRange(2, 10, output.length).setNumberFormat("$#,##0.00"); // 10-й столбец
    targetSheet.getRange(2, 11, output.length).setNumberFormat("0.00%"); // 11-й столбец
    targetSheet.getRange(2, 12, output.length).setNumberFormat("#,##0"); // 12-й столбец
    targetSheet.getRange(2, 13, output.length).setNumberFormat("0.00%");

    Logger.log('Данные успешно агрегированы и записаны для файла: ' + fileName);
  }
}

// Stat dy day / CTV
function aggregateAndMapDataForAllFiles_statbydayCTV() {
  const folderId = configTotal.folderCTV;
  const sourceSpreadsheetId = configTotal.sourceSpreadsheetId;

  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    const ss = SpreadsheetApp.openById(sourceSpreadsheetId);
    const sheet = ss.getSheetByName('union_date');
    const allData = sheet.getRange('A2:AE' + sheet.getLastRow()).getValues();
    const filteredData = allData.filter(row => row[30] === fileName);
    const mapping = { 1: 3, 2: 4, 3: 7, 4: 9, 5: 10, 6: 11, 7: 13, 9: 15, 12: 17, 14: 20, 15: 21, 16: 22, 17: 23, 18: 24, 19: 25, 20: 26 };
    const aggregatedData = {};

    filteredData.forEach(row => {
      const key1 = row[mapping[1] - 1];
      const key2 = row[mapping[2] - 1];
      const key3 = Utilities.formatDate(new Date(row[mapping[3] - 1]), Session.getScriptTimeZone(), "MM/dd/yyyy");
      const combinedKey = `${key1}_${key2}_${key3}`;

      if (!aggregatedData[combinedKey]) {
        aggregatedData[combinedKey] = {};
        aggregatedData[combinedKey][1] = key1;
        aggregatedData[combinedKey][2] = key2;
        aggregatedData[combinedKey][3] = key3;
      }

      Object.keys(mapping).forEach(targetCol => {
        if (targetCol == 1 || targetCol == 2 || targetCol == 3) return;
        const sourceCol = mapping[targetCol] - 1;
        if (!aggregatedData[combinedKey][targetCol]) {
          aggregatedData[combinedKey][targetCol] = 0;
        }
        if (typeof row[sourceCol] === 'number' && !isNaN(row[sourceCol])) {
          aggregatedData[combinedKey][targetCol] += row[sourceCol];
        }
      });
    });

    const targetSpreadsheet = SpreadsheetApp.openById(file.getId());
    const targetSheet = targetSpreadsheet.getSheetByName('Stat by day');
    targetSheet.getRange('A2:Z' + targetSheet.getMaxRows()).clearContent().clearFormat();

    const output = [];

    Object.keys(aggregatedData).forEach(combinedKey => {
      const row = new Array(26).fill('');
      const data = aggregatedData[combinedKey];
      row[0] = data[1];
      row[1] = data[2];
      row[2] = data[3];
      Object.keys(mapping).forEach(targetCol => {
        if (targetCol == 1 || targetCol == 2 || targetCol == 3) return;
        row[targetCol - 1] = data[targetCol];
      });

      // Форматирование числовых значений без округления
      row[3] = row[3] || 0; // 4-й столбец
      row[4] = row[4] || 0; // 5-й столбец
      row[5] = row[5] || 0; // 6-й столбец
      row[6] = row[6] || 0; // 7-й столбец

      // Формула для процентного столбца
      row[7] = `=IFERROR(G:G/E:E,0)`;

      // Форматирование денежных значений без округления
      row[8] = row[8] ? `\$${row[8]}` : '$0.00'; // 9-й столбец
      row[9] = `=IFERROR(I:I/D:D*1000,0)`;
      row[10] = '=iferror(E:E/D:D,0)';
      row[12] = '=iferror(L:L/D:D,0)';



      output.push(row);
    });

    const targetRange = targetSheet.getRange(2, 1, output.length, 26);
    targetRange.setValues(output);

    // Применение форматирования к столбцам
    targetSheet.getRange(2, 4, output.length).setNumberFormat("#,##0"); // 4-й столбец
    targetSheet.getRange(2, 5, output.length).setNumberFormat("#,##0"); // 5-й столбец
    targetSheet.getRange(2, 6, output.length).setNumberFormat("#,##0"); // 6-й столбец
    targetSheet.getRange(2, 7, output.length).setNumberFormat("0"); // 7-й столбец
    targetSheet.getRange(2, 8, output.length).setNumberFormat("0.00%"); // 8-й столбец
    // Для 9-го столбца форматирование применять не нужно, так как они уже представлены в виде строк
    targetSheet.getRange(2, 10, output.length).setNumberFormat("$#,##0.00"); // 10-й столбец
    targetSheet.getRange(2, 11, output.length).setNumberFormat("0.00%"); // 11-й столбец
    targetSheet.getRange(2, 12, output.length).setNumberFormat("#,##0"); // 12-й столбец
    targetSheet.getRange(2, 13, output.length).setNumberFormat("0.00%");

    Logger.log('Данные успешно агрегированы и записаны для файла: ' + fileName);
  }
}

// Stat dy day / DOOH
function aggregateAndMapDataForAllFiles_statbydayDOOH() {
  const folderId = configTotal.folderDOOH;
  const sourceSpreadsheetId = configTotal.sourceSpreadsheetId;

  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    const ss = SpreadsheetApp.openById(sourceSpreadsheetId);
    const sheet = ss.getSheetByName('union_date');
    const allData = sheet.getRange('A2:AE' + sheet.getLastRow()).getValues();
    const filteredData = allData.filter(row => row[30] === fileName);
    const mapping = { 1: 3, 2: 4, 3: 7, 4: 9, 6: 15, 7: 6 };
    const aggregatedData = {};

    filteredData.forEach(row => {
      const key1 = row[mapping[1] - 1];
      const key2 = row[mapping[2] - 1];
      const key3 = Utilities.formatDate(new Date(row[mapping[3] - 1]), Session.getScriptTimeZone(), "MM/dd/yyyy");
      const key4 = row[mapping[7] - 1]; // Предполагается, что это текстовое значение
      const combinedKey = `${key1}_${key2}_${key3}_${key4}`;

      if (!aggregatedData[combinedKey]) {
        aggregatedData[combinedKey] = {};
        aggregatedData[combinedKey][1] = key1;
        aggregatedData[combinedKey][2] = key2;
        aggregatedData[combinedKey][3] = key3;
        aggregatedData[combinedKey][7] = key4;
      }

      Object.keys(mapping).forEach(targetCol => {
        if (targetCol == 1 || targetCol == 2 || targetCol == 3) return;
        const sourceCol = mapping[targetCol] - 1;
        if (!aggregatedData[combinedKey][targetCol]) {
          aggregatedData[combinedKey][targetCol] = 0;
        }
        if (!aggregatedData[combinedKey][7]) {
          aggregatedData[combinedKey][7] = key4 || '';
        }
        if (typeof row[sourceCol] === 'number' && !isNaN(row[sourceCol])) {
          aggregatedData[combinedKey][targetCol] += row[sourceCol];
        }
      });
    });

    const targetSpreadsheet = SpreadsheetApp.openById(file.getId());
    const targetSheet = targetSpreadsheet.getSheetByName('Stat by day');
    targetSheet.getRange('A2:Z' + targetSheet.getMaxRows()).clearContent().clearFormat();

    const output = [];

    Object.keys(aggregatedData).forEach(combinedKey => {
      const row = new Array(26).fill('');
      const data = aggregatedData[combinedKey];
      row[0] = data[1];
      row[1] = data[2];
      row[2] = data[3];
      row[6] = data[7];
      Object.keys(mapping).forEach(targetCol => {
        if (targetCol == 1 || targetCol == 2 || targetCol == 3) return;
        row[targetCol - 1] = data[targetCol];
      });

      // Форматирование числовых значений без округления
      row[3] = row[3] || 0; // 4-й столбец
      row[4] = `=IFERROR(F:F/D:D*1000,0)`;
      row[5] = row[5] || 0; // 6-й столбец

      output.push(row);
    });

    const targetRange = targetSheet.getRange(2, 1, output.length, 26);
    targetRange.setValues(output);

    // Применение форматирования к столбцам
    targetSheet.getRange(2, 4, output.length).setNumberFormat("#,##0"); // 4-й столбец
    targetSheet.getRange(2, 5, output.length).setNumberFormat("#,##0"); // 5-й столбец
    targetSheet.getRange(2, 6, output.length).setNumberFormat("$#,##0.00"); // 6-й столбец


    Logger.log('Данные успешно агрегированы и записаны для файла: ' + fileName);
  }
}