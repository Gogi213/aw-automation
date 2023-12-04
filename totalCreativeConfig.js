// totalCreativeConfig

// totalCreativeConfig / Display
function aggregateAndMapDataForAllFiles_totalCreativeDisplay900() {
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
    const mapping = { 1: 4, 2: 9, 3: 10, 4: 11, 5: 13, 7: 15, 9: 20, 10: 21, 11: 22, 12: 23, 13: 24, 14: 25, 15: 26 };
    const aggregatedData = {};

    filteredData.forEach(row => {
      const key1 = row[mapping[1] - 1];
      const combinedKey = `${key1}`;

      if (!aggregatedData[combinedKey]) {
        aggregatedData[combinedKey] = {};
        aggregatedData[combinedKey][1] = key1;
      }

      Object.keys(mapping).forEach(targetCol => {
        if (targetCol == 1) return;
        const sourceCol = mapping[targetCol] - 1;
        if (!aggregatedData[combinedKey][targetCol]) {
          aggregatedData[combinedKey][targetCol] = 0;
        }
        let value = row[sourceCol];
        if (value === "" || value === null) {
          value = 0;
        } else if (typeof value === 'string') {
          value = value.replace(/[$,]/g, '');
          value = parseFloat(value) || 0;
        }
        aggregatedData[combinedKey][targetCol] += value;
      });
    });

    const targetSpreadsheet = SpreadsheetApp.openById(file.getId());
    const targetSheet = targetSpreadsheet.getSheetByName('Total');
    const lastRow = targetSheet.getLastRow();
    const startRow = lastRow + 4;
    const headerRow = targetSheet.getRange("A2:Z2");
    headerRow.copyTo(targetSheet.getRange(startRow - 1, 1), { formatOnly: true });

    // Получаем значения скопированной шапки
    const headerValues = headerRow.getValues();

    // Изменяем значение первого столбца на "Creative"
    headerValues[0][0] = "Creative";

    // Вставляем изменённые значения обратно в лист
    targetSheet.getRange(startRow - 1, 1, 1, 26).setValues(headerValues);
    targetSheet.getRange(startRow - 1, 1, 1, 26).setFontWeight("bold");


    const output = [];

    Object.keys(aggregatedData).forEach(combinedKey => {
      const row = new Array(26).fill('');
      const data = aggregatedData[combinedKey];
      row[0] = data[1];
      if (row[0].trim() !== "") { // Добавляем условие, чтобы игнорировать пустые значения
        for (let i = 1; i <= 25; i++) {
          row[i] = data[i + 1] !== undefined ? data[i + 1] : '';
        }
        row[15] = `=SUM(I${startRow + output.length}:O${startRow + output.length})`;
        row[5] = `=IFERROR(E${startRow + output.length}/C${startRow + output.length},0)`;
        row[7] = `=IFERROR(G${startRow + output.length}/C${startRow + output.length}*1000,0)`;
        output.push(row);
      }
    });

    // Добавляем строки с "Total"
    if (output.length > 0) {
      const totalsRow = new Array(26).fill('');
      totalsRow[0] = "Total";
      for (let i = 1; i <= 15; i++) {
        if (i === 5 || i === 7) continue;
        totalsRow[i] = `=SUM(${String.fromCharCode(65 + i)}${startRow}:${String.fromCharCode(65 + i)}${startRow + output.length - 1})`;
      }
      totalsRow[5] = `=iferror(E:E/C:C,0)`;
      totalsRow[7] = `=iferror(G:G/C:C*1000,0)`;
      output.push(totalsRow);
    }

    if (output.length > 0) {
      targetSheet.getRange(startRow, 1, output.length, 26).setValues(output);
      targetSheet.getRange(startRow, 1, output.length, 26).setNumberFormat("@STRING@");
    }

    // Дополнительное форматирование и расчеты, если необходимо
    // Применение форматирования к столбцам
    targetSheet.getRange(startRow, 2, output.length, 4).setNumberFormat("#,##0"); // Столбцы 2-5 числовые
    targetSheet.getRange(startRow, 6, output.length, 1).setNumberFormat("0.00%"); // Процентный формат для столбца 6
    targetSheet.getRange(startRow, 7, output.length).setNumberFormat("$#,##0.00"); // Денежный формат для столбца 7
    targetSheet.getRange(startRow, 8, output.length, 1).setNumberFormat("$#,##0.00"); // Денежный формат для столбца 8
    targetSheet.getRange(startRow, 9, output.length, 8).setNumberFormat("#,##0"); // Столбцы 9-16 стандартный числовой

    targetSheet.getRange(startRow + output.length - 1, 1, 1, 26).setFontWeight("bold");
  }
}

// totalCreativeConfig / Audio
function aggregateAndMapDataForAllFiles_totalCreativeAudio900() {
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
    const mapping = { 1: 4, 2: 9, 3: 10, 4: 11, 5: 13, 7: 15, 10: 17, 12: 20, 13: 21, 14: 22, 15: 23, 16: 24, 17: 25, 18: 26 };
    const aggregatedData = {};

    filteredData.forEach(row => {
      const key1 = row[mapping[1] - 1];
      const combinedKey = `${key1}`;

      if (!aggregatedData[combinedKey]) {
        aggregatedData[combinedKey] = {};
        aggregatedData[combinedKey][1] = key1;
      }

      Object.keys(mapping).forEach(targetCol => {
        if (targetCol == 1) return;
        const sourceCol = mapping[targetCol] - 1;
        if (!aggregatedData[combinedKey][targetCol]) {
          aggregatedData[combinedKey][targetCol] = 0;
        }
        let value = row[sourceCol];
        if (value === "" || value === null) {
          value = 0;
        } else if (typeof value === 'string') {
          value = value.replace(/[$,]/g, '');
          value = parseFloat(value) || 0;
        }
        aggregatedData[combinedKey][targetCol] += value;
      });
    });

    const targetSpreadsheet = SpreadsheetApp.openById(file.getId());
    const targetSheet = targetSpreadsheet.getSheetByName('Total');
    const lastRow = targetSheet.getLastRow();
    const startRow = lastRow + 4;
    const headerRow = targetSheet.getRange("A2:Z2");
    headerRow.copyTo(targetSheet.getRange(startRow - 1, 1), { formatOnly: true });

    // Получаем значения скопированной шапки
    const headerValues = headerRow.getValues();

    // Изменяем значение первого столбца на "Creative"
    headerValues[0][0] = "Creative";

    // Вставляем изменённые значения обратно в лист
    targetSheet.getRange(startRow - 1, 1, 1, 26).setValues(headerValues);
    targetSheet.getRange(startRow - 1, 1, 1, 26).setFontWeight("bold");


    const output = [];

    Object.keys(aggregatedData).forEach(combinedKey => {
      const row = new Array(26).fill('');
      const data = aggregatedData[combinedKey];
      row[0] = data[1];
      if (row[0].trim() !== "") { // Добавляем условие, чтобы игнорировать пустые значения
        for (let i = 1; i <= 25; i++) {
          row[i] = data[i + 1] !== undefined ? data[i + 1] : '';
        }
        row[5] = `=IFERROR(E${startRow + output.length}/C${startRow + output.length},0)`;
        row[7] = `=IFERROR(G${startRow + output.length}/C${startRow + output.length}*1000,0)`;
        row[8] = '=iferror(C:C/B:B,0)'
        row[9] = data[10]//ПОДПРАВИТЬ
        row[10] = '=iferror(J:J/C:C,0)'
        row[18] = `=SUM(L${startRow + output.length}:R${startRow + output.length})`;
        output.push(row);
      }
    });

    // Добавляем строки с "Total"
    if (output.length > 0) {
      const totalsRow = new Array(26).fill('');
      totalsRow[0] = "Total";
      for (let i = 1; i <= 18; i++) {
        if (i === 5 || i === 7 || i === 8 || i === 10) continue;
        totalsRow[i] = `=SUM(${String.fromCharCode(65 + i)}${startRow}:${String.fromCharCode(65 + i)}${startRow + output.length - 1})`;
      }
      totalsRow[5] = `=iferror(E:E/C:C,0)`;
      totalsRow[7] = `=iferror(G:G/C:C*1000,0)`;
      totalsRow[8] = '=iferror(C:C/B:B,0)';
      totalsRow[10] = '=iferror(J:J/C:C,0)';
      totalsRow[18] = `=SUM(L${startRow + output.length}:R${startRow + output.length})`;
      output.push(totalsRow);
    }

    if (output.length > 0) {
      targetSheet.getRange(startRow, 1, output.length, 26).setValues(output);
      targetSheet.getRange(startRow, 1, output.length, 26).setNumberFormat("@STRING@");
    }

    // Дополнительное форматирование и расчеты, если необходимо
    // Применение форматирования к столбцам
    targetSheet.getRange(startRow, 2, output.length, 4).setNumberFormat("#,##0"); // Столбцы 2-5 числовые
    targetSheet.getRange(startRow, 6, output.length, 1).setNumberFormat("0.00%"); // Процентный формат для столбца 6
    targetSheet.getRange(startRow, 7, output.length).setNumberFormat("$#,##0.00"); // Денежный формат для столбца 7
    targetSheet.getRange(startRow, 8, output.length, 1).setNumberFormat("$#,##0.00"); // Денежный формат для столбца 8
    targetSheet.getRange(startRow, 9, output.length, 1).setNumberFormat("0.00%"); // Процентный формат для столбца 9
    targetSheet.getRange(startRow, 11, output.length, 1).setNumberFormat("0.00%"); // Процентный формат для столбца 11
    targetSheet.getRange(startRow, 10, output.length, 1).setNumberFormat("#,##0");
    targetSheet.getRange(startRow, 12, output.length, 8).setNumberFormat("#,##0");
    targetSheet.getRange(startRow + output.length - 1, 1, 1, 26).setFontWeight("bold");
  }
}

// totalCreativeConfig / Video
function aggregateAndMapDataForAllFiles_totalCreativeVideo900() {
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
    const mapping = { 1: 4, 2: 9, 3: 10, 4: 11, 5: 13, 7: 15, 10: 17, 12: 20, 13: 21, 14: 22, 15: 23, 16: 24, 17: 25, 18: 26 };
    const aggregatedData = {};

    filteredData.forEach(row => {
      const key1 = row[mapping[1] - 1];
      const combinedKey = `${key1}`;

      if (!aggregatedData[combinedKey]) {
        aggregatedData[combinedKey] = {};
        aggregatedData[combinedKey][1] = key1;
      }

      Object.keys(mapping).forEach(targetCol => {
        if (targetCol == 1) return;
        const sourceCol = mapping[targetCol] - 1;
        if (!aggregatedData[combinedKey][targetCol]) {
          aggregatedData[combinedKey][targetCol] = 0;
        }
        let value = row[sourceCol];
        if (value === "" || value === null) {
          value = 0;
        } else if (typeof value === 'string') {
          value = value.replace(/[$,]/g, '');
          value = parseFloat(value) || 0;
        }
        aggregatedData[combinedKey][targetCol] += value;
      });
    });

    const targetSpreadsheet = SpreadsheetApp.openById(file.getId());
    const targetSheet = targetSpreadsheet.getSheetByName('Total');
    const lastRow = targetSheet.getLastRow();
    const startRow = lastRow + 4;
    const headerRow = targetSheet.getRange("A2:Z2");
    headerRow.copyTo(targetSheet.getRange(startRow - 1, 1), { formatOnly: true });

    // Получаем значения скопированной шапки
    const headerValues = headerRow.getValues();

    // Изменяем значение первого столбца на "Creative"
    headerValues[0][0] = "Creative";

    // Вставляем изменённые значения обратно в лист
    targetSheet.getRange(startRow - 1, 1, 1, 26).setValues(headerValues);
    targetSheet.getRange(startRow - 1, 1, 1, 26).setFontWeight("bold");


    const output = [];

    Object.keys(aggregatedData).forEach(combinedKey => {
      const row = new Array(26).fill('');
      const data = aggregatedData[combinedKey];
      row[0] = data[1];
      if (row[0].trim() !== "") { // Добавляем условие, чтобы игнорировать пустые значения
        for (let i = 1; i <= 25; i++) {
          row[i] = data[i + 1] !== undefined ? data[i + 1] : '';
        }
        row[5] = `=IFERROR(E${startRow + output.length}/C${startRow + output.length},0)`;
        row[7] = `=IFERROR(G${startRow + output.length}/C${startRow + output.length}*1000,0)`;
        row[8] = '=iferror(C:C/B:B,0)'
        row[9] = data[10]//ПОДПРАВИТЬ
        row[10] = '=iferror(J:J/C:C,0)'
        row[18] = `=SUM(L${startRow + output.length}:R${startRow + output.length})`;
        output.push(row);
      }
    });

    // Добавляем строки с "Total"
    if (output.length > 0) {
      const totalsRow = new Array(26).fill('');
      totalsRow[0] = "Total";
      for (let i = 1; i <= 18; i++) {
        if (i === 5 || i === 7 || i === 8 || i === 10) continue;
        totalsRow[i] = `=SUM(${String.fromCharCode(65 + i)}${startRow}:${String.fromCharCode(65 + i)}${startRow + output.length - 1})`;
      }
      totalsRow[5] = `=iferror(E:E/C:C,0)`;
      totalsRow[7] = `=iferror(G:G/C:C*1000,0)`;
      totalsRow[8] = '=iferror(C:C/B:B,0)';
      totalsRow[10] = '=iferror(J:J/C:C,0)';
      totalsRow[18] = `=SUM(L${startRow + output.length}:R${startRow + output.length})`;
      output.push(totalsRow);
    }

    if (output.length > 0) {
      targetSheet.getRange(startRow, 1, output.length, 26).setValues(output);
      targetSheet.getRange(startRow, 1, output.length, 26).setNumberFormat("@STRING@");
    }

    // Дополнительное форматирование и расчеты, если необходимо
    // Применение форматирования к столбцам
    targetSheet.getRange(startRow, 2, output.length, 4).setNumberFormat("#,##0"); // Столбцы 2-5 числовые
    targetSheet.getRange(startRow, 6, output.length, 1).setNumberFormat("0.00%"); // Процентный формат для столбца 6
    targetSheet.getRange(startRow, 7, output.length).setNumberFormat("$#,##0.00"); // Денежный формат для столбца 7
    targetSheet.getRange(startRow, 8, output.length, 1).setNumberFormat("$#,##0.00"); // Денежный формат для столбца 8
    targetSheet.getRange(startRow, 9, output.length, 1).setNumberFormat("0.00%"); // Процентный формат для столбца 9
    targetSheet.getRange(startRow, 11, output.length, 1).setNumberFormat("0.00%"); // Процентный формат для столбца 11
    targetSheet.getRange(startRow, 10, output.length, 1).setNumberFormat("#,##0");
    targetSheet.getRange(startRow, 12, output.length, 8).setNumberFormat("#,##0");
    targetSheet.getRange(startRow + output.length - 1, 1, 1, 26).setFontWeight("bold");
  }
}

// totalCreativeConfig / CTV
function aggregateAndMapDataForAllFiles_totalCreativeCTV900() {
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
    const mapping = { 1: 4, 2: 9, 3: 10, 4: 11, 5: 13, 7: 15, 10: 17, 12: 20, 13: 21, 14: 22, 15: 23, 16: 24, 17: 25, 18: 26 };
    const aggregatedData = {};

    filteredData.forEach(row => {
      const key1 = row[mapping[1] - 1];
      const combinedKey = `${key1}`;

      if (!aggregatedData[combinedKey]) {
        aggregatedData[combinedKey] = {};
        aggregatedData[combinedKey][1] = key1;
      }

      Object.keys(mapping).forEach(targetCol => {
        if (targetCol == 1) return;
        const sourceCol = mapping[targetCol] - 1;
        if (!aggregatedData[combinedKey][targetCol]) {
          aggregatedData[combinedKey][targetCol] = 0;
        }
        let value = row[sourceCol];
        if (value === "" || value === null) {
          value = 0;
        } else if (typeof value === 'string') {
          value = value.replace(/[$,]/g, '');
          value = parseFloat(value) || 0;
        }
        aggregatedData[combinedKey][targetCol] += value;
      });
    });

    const targetSpreadsheet = SpreadsheetApp.openById(file.getId());
    const targetSheet = targetSpreadsheet.getSheetByName('Total');
    const lastRow = targetSheet.getLastRow();
    const startRow = lastRow + 4;
    const headerRow = targetSheet.getRange("A2:Z2");
    headerRow.copyTo(targetSheet.getRange(startRow - 1, 1), { formatOnly: true });

    // Получаем значения скопированной шапки
    const headerValues = headerRow.getValues();

    // Изменяем значение первого столбца на "Creative"
    headerValues[0][0] = "Creative";

    // Вставляем изменённые значения обратно в лист
    targetSheet.getRange(startRow - 1, 1, 1, 26).setValues(headerValues);
    targetSheet.getRange(startRow - 1, 1, 1, 26).setFontWeight("bold");


    const output = [];

    Object.keys(aggregatedData).forEach(combinedKey => {
      const row = new Array(26).fill('');
      const data = aggregatedData[combinedKey];
      row[0] = data[1];
      if (row[0].trim() !== "") { // Добавляем условие, чтобы игнорировать пустые значения
        for (let i = 1; i <= 25; i++) {
          row[i] = data[i + 1] !== undefined ? data[i + 1] : '';
        }
        row[5] = `=iferror(E:E/B:B,0)`;
        row[7] = `=iferror(G:G/B:B*1000,0)`;
        row[8] = '=iferror(C:C/B:B,0)'
        row[9] = data[10]//ПОДПРАВИТЬ
        row[10] = '=iferror(J:J/B:B,0)'
        row[18] = `=SUM(L${startRow + output.length}:R${startRow + output.length})`;
        output.push(row);
      }
    });

    // Добавляем строки с "Total"
    if (output.length > 0) {
      const totalsRow = new Array(26).fill('');
      totalsRow[0] = "Total";
      for (let i = 1; i <= 18; i++) {
        if (i === 5 || i === 7 || i === 8 || i === 10) continue;
        totalsRow[i] = `=SUM(${String.fromCharCode(65 + i)}${startRow}:${String.fromCharCode(65 + i)}${startRow + output.length - 1})`;
      }
      totalsRow[5] = `=iferror(E:E/B:B,0)`;
      totalsRow[7] = `=iferror(G:G/B:B*1000,0)`;
      totalsRow[8] = '=iferror(C:C/B:B,0)'
      totalsRow[10] = '=iferror(J:J/B:B,0)';
      totalsRow[18] = `=SUM(L${startRow + output.length}:R${startRow + output.length})`;
      output.push(totalsRow);
    }

    if (output.length > 0) {
      targetSheet.getRange(startRow, 1, output.length, 26).setValues(output);
      targetSheet.getRange(startRow, 1, output.length, 26).setNumberFormat("@STRING@");
    }

    // Дополнительное форматирование и расчеты, если необходимо
    // Применение форматирования к столбцам
    targetSheet.getRange(startRow, 2, output.length, 4).setNumberFormat("#,##0"); // Столбцы 2-5 числовые
    targetSheet.getRange(startRow, 6, output.length, 1).setNumberFormat("0.00%"); // Процентный формат для столбца 6
    targetSheet.getRange(startRow, 7, output.length).setNumberFormat("$#,##0.00"); // Денежный формат для столбца 7
    targetSheet.getRange(startRow, 8, output.length, 1).setNumberFormat("$#,##0.00"); // Денежный формат для столбца 8
    targetSheet.getRange(startRow, 9, output.length, 1).setNumberFormat("0.00%"); // Процентный формат для столбца 9
    targetSheet.getRange(startRow, 11, output.length, 1).setNumberFormat("0.00%"); // Процентный формат для столбца 11
    targetSheet.getRange(startRow, 10, output.length, 1).setNumberFormat("#,##0");
    targetSheet.getRange(startRow, 12, output.length, 8).setNumberFormat("#,##0");
    targetSheet.getRange(startRow + output.length - 1, 1, 1, 26).setFontWeight("bold");
  }
}

// totalCreativeConfig / DOOH
function aggregateAndMapDataForAllFiles_totalCreativeDOOH900() {
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
    const mapping = { 1: 4, 2: 9, 3: 15 };
    const aggregatedData = {};

    filteredData.forEach(row => {
      const key1 = row[mapping[1] - 1];
      const combinedKey = `${key1}`;

      if (!aggregatedData[combinedKey]) {
        aggregatedData[combinedKey] = {};
        aggregatedData[combinedKey][1] = key1;
      }

      Object.keys(mapping).forEach(targetCol => {
        if (targetCol == 1) return;
        const sourceCol = mapping[targetCol] - 1;
        if (!aggregatedData[combinedKey][targetCol]) {
          aggregatedData[combinedKey][targetCol] = 0;
        }
        let value = row[sourceCol];
        if (value === "" || value === null) {
          value = 0;
        } else if (typeof value === 'string') {
          value = value.replace(/[$,]/g, '');
          value = parseFloat(value) || 0;
        }
        aggregatedData[combinedKey][targetCol] += value;
      });
    });

    const targetSpreadsheet = SpreadsheetApp.openById(file.getId());
    const targetSheet = targetSpreadsheet.getSheetByName('Total');
    const lastRow = targetSheet.getLastRow();
    const startRow = lastRow + 4;
    const headerRow = targetSheet.getRange("A2:Z2");
    headerRow.copyTo(targetSheet.getRange(startRow - 1, 1), { formatOnly: true });

    // Получаем значения скопированной шапки
    const headerValues = [headerRow.getValues()[0].slice(0, 4)];

    // Изменяем значение первого столбца на "Creative"
    headerValues[0][0] = "Creative";

    // Вставляем изменённые значения обратно в лист
    targetSheet.getRange(startRow - 1, 1, 1, 4).setValues(headerValues); // Убедитесь, что headerValues - это двумерный массив
    targetSheet.getRange(startRow - 1, 1, 1, 4).setFontWeight("bold");


    const output = [];

    Object.keys(aggregatedData).forEach(combinedKey => {
      const row = new Array(4).fill('');
      const data = aggregatedData[combinedKey];
      row[0] = data[1];
      if (row[0].trim() !== "") { // Добавляем условие, чтобы игнорировать пустые значения
        for (let i = 1; i <= 3; i++) {
          row[i] = data[i + 1] !== undefined ? data[i + 1] : '';
        }
        output.push(row);
      }
      row[3] = '=iferror(C:C/B:B*1000,)'
    });

    // Добавляем строки с "Total"
    if (output.length > 0) {
      const totalsRow = new Array(4).fill('');
      totalsRow[0] = "Total";
      for (let i = 1; i <= 2; i++) {
        totalsRow[i] = `=SUM(${String.fromCharCode(65 + i)}${startRow}:${String.fromCharCode(65 + i)}${startRow + output.length - 1})`;
      }
      totalsRow[3] = '=iferror(C:C/B:B*1000,)'
      output.push(totalsRow); // Убедитесь, что output - это двумерный массив
    }

    if (output.length > 0) {
      targetSheet.getRange(startRow, 1, output.length, 4).setValues(output); // Убедитесь, что output - это двумерный массив
    }

    // Дополнительное форматирование и расчеты, если необходимо
    // Применение форматирования к столбцам
    targetSheet.getRange(startRow, 2, output.length, 4).setNumberFormat("#,##0"); // Столбцы 2-5 числовые
    targetSheet.getRange(startRow, 3, output.length).setNumberFormat("$#,##0.00"); // Денежный формат для столбца 7
    targetSheet.getRange(startRow, 4, output.length, 1).setNumberFormat("$#,##0.00"); // Денежный формат для столбца 8
    targetSheet.getRange(startRow + output.length - 1, 1, 1, 4).setFontWeight("bold");
  }
}
