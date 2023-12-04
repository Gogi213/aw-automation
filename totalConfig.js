// totalConfig

const configTotal = {
  sourceSpreadsheetId: '1a9qhTubxbdew9IfstH0v7dQijexTBs9jbkkBIIXV-cs',
  folderDisplay: '1S2HuGudocrjfLY8Ag65RrYceCFZfzdzC',
  folderAudio: '14WsWzAGV5OBOcOyc3vRBTtLAoPYytsfu',
  folderVideo: '1Voz3zu5Tkx6Gtdn9KOsnhXpAQB79yie3',
  folderCTV: '1ZbnqzT5jGAxkL6bFt6V9aqZdnvs5VdAf',
  folderDOOH: '1RJ67YMvjnypypU2gq-I-Utgmxlp-pi6t'
};

// totalConfig / Display
function aggregateAndMapDataForAllFiles_campaignsDisplay900() {
  const cacheControl = new CacheControl();
  cacheControl.setNoCache();

  const folderId = configTotal.folderDisplay;
  const sourceSpreadsheetId = configTotal.sourceSpreadsheetId;

  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();

    if (fileName.includes("Display")) {
      const ss = SpreadsheetApp.openById(sourceSpreadsheetId);
      const sheet = ss.getSheetByName('union_date');
      const allData = sheet.getRange('A2:AE' + sheet.getLastRow()).getValues();
      const filteredData = allData.filter(row => row[30] === fileName);
      const mapping = { 1: 3, 2: 9, 3: 10, 4: 11, 5: 13, 7: 15, 9: 20, 10: 21, 11: 22, 12: 23, 13: 24, 14: 25, 15: 26 };
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
          if (typeof row[sourceCol] === 'number' && !isNaN(row[sourceCol])) {
            aggregatedData[combinedKey][targetCol] += row[sourceCol];
          }
        });
      });

      const targetSpreadsheet = SpreadsheetApp.openById(file.getId());
      const targetSheet = targetSpreadsheet.getSheetByName('Total');
      targetSheet.getRange('A3:Z' + targetSheet.getMaxRows()).clearContent().clearFormat();

      const output = [];

      Object.keys(aggregatedData).forEach(combinedKey => {
        const row = new Array(23).fill('');
        const data = aggregatedData[combinedKey];
        row[0] = data[1]; // Текст
        row[1] = data[2]; // Число - 1,000
        row[2] = data[3]; // Число - 1,000
        row[3] = data[4]; // Число - 1,000
        row[4] = data[5]; // Число - 1,000
        row[5] = '=iferror(E:E/C:C,0)'; // Формула для столбца 10
        row[6] = data[7]; // Денежный
        row[7] = '=iferror(G:G/C:C*1000,0)'


        for (let i = 8; i <= 14; i++) {
          row[i] = data[i + 1];
        }
        row[15] = `=SUM(I${output.length + 3}:O${output.length + 3})`; // Сумма столбцов 12-18

        output.push(row);
      });

      const totalsRow = new Array(23).fill('');
      totalsRow[0] = "Total";
      for (let i = 1; i <= 4; i++) {
        totalsRow[i] = `=SUM(${String.fromCharCode(65 + i)}3:${String.fromCharCode(65 + i)}${output.length + 2})`;
      }
      totalsRow[5] = '=iferror(E:E/C:C,0)';
      totalsRow[6] = `=SUM(G3:G${output.length + 2})`;
      totalsRow[7] = '=iferror(G:G/C:C*1000,0)'

      for (let i = 8; i <= 14; i++) {
        totalsRow[i] = `=SUM(${String.fromCharCode(65 + i)}3:${String.fromCharCode(65 + i)}${output.length + 2})`;
      }
      totalsRow[15] = `=SUM(S3:S${output.length + 2})`;

      output.push(totalsRow);

      const targetRange = targetSheet.getRange(3, 1, output.length, 23);
      targetRange.setValues(output);

      targetSheet.getRange(3, 2, output.length + 1, 4).setNumberFormat("#,##0");
      targetSheet.getRange(3, 6, output.length + 1, 1).setNumberFormat("0.00%");
      targetSheet.getRange(3, 7, output.length + 1, 2).setNumberFormat("$#,##0.00");
      targetSheet.getRange(3, 9, output.length + 1, 1).setNumberFormat("#,##0");
      targetSheet.getRange(3, 10, output.length + 1, 1).setNumberFormat("#,##0");
      targetSheet.getRange(3, 11, output.length + 1, 1).setNumberFormat("#,##0");
      targetSheet.getRange(3, 12, output.length + 1, 7).setNumberFormat("#,##0");
      targetSheet.getRange(3, 13, output.length + 1, 7).setNumberFormat("#,##0");
      targetSheet.getRange(3, 14, output.length + 1, 7).setNumberFormat("#,##0");
      targetSheet.getRange(3, 15, output.length + 1, 7).setNumberFormat("#,##0");
      targetSheet.getRange(3, 16, output.length + 1, 7).setNumberFormat("#,##0");

      targetSheet.getRange(output.length + 2, 1, 1, 23).setFontWeight("bold");

      Logger.log('Данные успешно агрегированы и записаны для файла: ' + fileName);
    }
  }
}

// totalConfig / Audio
function aggregateAndMapDataForAllFiles_campaignsAudio900() {
  const cacheControl = new CacheControl();
  cacheControl.setNoCache();
  const folderId = configTotal.folderAudio;
  const sourceSpreadsheetId = configTotal.sourceSpreadsheetId;

  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();

    if (fileName.includes("Audio")) {
      const ss = SpreadsheetApp.openById(sourceSpreadsheetId);
      const sheet = ss.getSheetByName('union_date');
      const allData = sheet.getRange('A2:AE' + sheet.getLastRow()).getValues();
      const filteredData = allData.filter(row => row[30] === fileName);
      const mapping = { 1: 3, 2: 9, 3: 10, 4: 11, 5: 13, 7: 15, 10: 17, 12: 20, 13: 21, 14: 22, 15: 23, 16: 24, 17: 25, 18: 26 };
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
          if (typeof row[sourceCol] === 'number' && !isNaN(row[sourceCol])) {
            aggregatedData[combinedKey][targetCol] += row[sourceCol];
          }
        });
      });

      const targetSpreadsheet = SpreadsheetApp.openById(file.getId());
      const targetSheet = targetSpreadsheet.getSheetByName('Total');
      targetSheet.getRange('A3:Z' + targetSheet.getMaxRows()).clearContent().clearFormat();

      const output = [];

      Object.keys(aggregatedData).forEach(combinedKey => {
        const row = new Array(26).fill('');
        const data = aggregatedData[combinedKey];
        row[0] = data[1]; // Текст
        row[1] = data[2]; // Число - 1,000
        row[2] = data[3]; // Число - 1,000
        row[3] = data[4]; // Число - 1,000
        row[4] = data[5]; // Число - 1,000
        row[5] = '=iferror(E:E/C:C,0)'; // Формула для столбца 10
        row[6] = data[7]; // Денежный
        row[7] = '=iferror(G:G/C:C*1000,0)'
        row[8] = '=iferror(C:C/B:B,0)'; // Формула для столбца 9
        row[9] = data[10];
        row[10] = '=iferror(J:J/C:C,0)'; // Формула для столбца 11

        for (let i = 11; i <= 17; i++) {
          row[i] = data[i + 1];
        }
        row[18] = `=SUM(L${output.length + 3}:R${output.length + 3})`; // Сумма столбцов 12-18

        output.push(row);
      });

      const totalsRow = new Array(26).fill('');
      totalsRow[0] = "Total";
      for (let i = 1; i <= 4; i++) {
        totalsRow[i] = `=SUM(${String.fromCharCode(65 + i)}3:${String.fromCharCode(65 + i)}${output.length + 2})`;
      }
      totalsRow[5] = '=iferror(E:E/C:C,0)';
      totalsRow[6] = `=SUM(G3:G${output.length + 2})`;
      totalsRow[7] = '=iferror(G:G/C:C*1000,0)'
      totalsRow[8] = '=iferror(C:C/B:B,0)'
      totalsRow[9] = `=SUM(${String.fromCharCode(65 + 9)}3:${String.fromCharCode(65 + 9)}${output.length + 2})`;
      totalsRow[10] = '=iferror(J:J/C:C,0)';

      for (let i = 11; i <= 17; i++) {
        totalsRow[i] = `=SUM(${String.fromCharCode(65 + i)}3:${String.fromCharCode(65 + i)}${output.length + 2})`;
      }
      totalsRow[18] = `=SUM(S3:S${output.length + 2})`;

      output.push(totalsRow);

      const targetRange = targetSheet.getRange(3, 1, output.length, 26);
      targetRange.setValues(output);

      targetSheet.getRange(3, 2, output.length + 1, 4).setNumberFormat("#,##0");
      targetSheet.getRange(3, 6, output.length + 1, 1).setNumberFormat("0.00%");
      targetSheet.getRange(3, 7, output.length + 1, 2).setNumberFormat("$#,##0.00");
      targetSheet.getRange(3, 9, output.length + 1, 1).setNumberFormat("0.00%");
      targetSheet.getRange(3, 10, output.length + 1, 1).setNumberFormat("#,##0");
      targetSheet.getRange(3, 11, output.length + 1, 1).setNumberFormat("0.00%");
      targetSheet.getRange(3, 12, output.length + 1, 7).setNumberFormat("#,##0");

      targetSheet.getRange(output.length + 2, 1, 1, 26).setFontWeight("bold");

      Logger.log('Данные успешно агрегированы и записаны для файла: ' + fileName);
    }
  }
}

// totalConfig / Video
function aggregateAndMapDataForAllFiles_campaignsVideo900() {
  const cacheControl = new CacheControl();
  cacheControl.setNoCache();
  const folderId = configTotal.folderVideo;
  const sourceSpreadsheetId = configTotal.sourceSpreadsheetId;

  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();

    if (fileName.includes("Video")) {
      const ss = SpreadsheetApp.openById(sourceSpreadsheetId);
      const sheet = ss.getSheetByName('union_date');
      const allData = sheet.getRange('A2:AE' + sheet.getLastRow()).getValues();
      const filteredData = allData.filter(row => row[30] === fileName);
      const mapping = { 1: 3, 2: 9, 3: 10, 4: 11, 5: 13, 7: 15, 10: 17, 12: 20, 13: 21, 14: 22, 15: 23, 16: 24, 17: 25, 18: 26 };
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
          if (typeof row[sourceCol] === 'number' && !isNaN(row[sourceCol])) {
            aggregatedData[combinedKey][targetCol] += row[sourceCol];
          }
        });
      });

      const targetSpreadsheet = SpreadsheetApp.openById(file.getId());
      const targetSheet = targetSpreadsheet.getSheetByName('Total');
      targetSheet.getRange('A3:Z' + targetSheet.getMaxRows()).clearContent().clearFormat();

      const output = [];

      Object.keys(aggregatedData).forEach(combinedKey => {
        const row = new Array(26).fill('');
        const data = aggregatedData[combinedKey];
        row[0] = data[1]; // Текст
        row[1] = data[2]; // Число - 1,000
        row[2] = data[3]; // Число - 1,000
        row[3] = data[4]; // Число - 1,000
        row[4] = data[5]; // Число - 1,000
        row[5] = '=iferror(E:E/C:C,)'; // Формула для столбца 10
        row[6] = data[7]; // Денежный
        row[7] = '=iferror(G:G/C:C*1000,0)'
        row[8] = '=iferror(C:C/B:B0,)'; // Формула для столбца 9
        row[9] = data[10];
        row[10] = '=iferror(J:J/C:C,0)'; // Формула для столбца 11

        for (let i = 11; i <= 17; i++) {
          row[i] = data[i + 1];
        }
        row[18] = `=SUM(L${output.length + 3}:R${output.length + 3})`; // Сумма столбцов 12-18

        output.push(row);
      });

      const totalsRow = new Array(26).fill('');
      totalsRow[0] = "Total";
      for (let i = 1; i <= 4; i++) {
        totalsRow[i] = `=SUM(${String.fromCharCode(65 + i)}3:${String.fromCharCode(65 + i)}${output.length + 2})`;
      }
      totalsRow[5] = '=iferror(E:E/C:C,0)';
      totalsRow[6] = `=SUM(G3:G${output.length + 2})`;
      totalsRow[7] = '=iferror(G:G/C:C*1000,0)'
      totalsRow[8] = '=iferror(C:C/B:B,0)'
      totalsRow[9] = `=SUM(${String.fromCharCode(65 + 9)}3:${String.fromCharCode(65 + 9)}${output.length + 2})`;
      totalsRow[10] = '=iferror(J:J/C:C,0)';

      for (let i = 11; i <= 17; i++) {
        totalsRow[i] = `=SUM(${String.fromCharCode(65 + i)}3:${String.fromCharCode(65 + i)}${output.length + 2})`;
      }
      totalsRow[18] = `=SUM(S3:S${output.length + 2})`;

      output.push(totalsRow);

      const targetRange = targetSheet.getRange(3, 1, output.length, 26);
      targetRange.setValues(output);

      targetSheet.getRange(3, 2, output.length + 1, 4).setNumberFormat("#,##0");
      targetSheet.getRange(3, 6, output.length + 1, 1).setNumberFormat("0.00%");
      targetSheet.getRange(3, 7, output.length + 1, 2).setNumberFormat("$#,##0.00");
      targetSheet.getRange(3, 9, output.length + 1, 1).setNumberFormat("0.00%");
      targetSheet.getRange(3, 10, output.length + 1, 1).setNumberFormat("#,##0");
      targetSheet.getRange(3, 11, output.length + 1, 1).setNumberFormat("0.00%");
      targetSheet.getRange(3, 12, output.length + 1, 7).setNumberFormat("#,##0");

      targetSheet.getRange(output.length + 2, 1, 1, 26).setFontWeight("bold");

      Logger.log('Данные успешно агрегированы и записаны для файла: ' + fileName);
    }
  }
}

// totalConfig / CTV
function aggregateAndMapDataForAllFiles_campaignsCTV900() {
  const cacheControl = new CacheControl();
  cacheControl.setNoCache();
  const folderId = configTotal.folderCTV;
  const sourceSpreadsheetId = configTotal.sourceSpreadsheetId;

  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();

    if (fileName.includes("CTV")) {
      const ss = SpreadsheetApp.openById(sourceSpreadsheetId);
      const sheet = ss.getSheetByName('union_date');
      const allData = sheet.getRange('A2:AE' + sheet.getLastRow()).getValues();
      const filteredData = allData.filter(row => row[30] === fileName);
      const mapping = { 1: 3, 2: 9, 3: 10, 4: 11, 5: 13, 7: 15, 10: 17, 12: 20, 13: 21, 14: 22, 15: 23, 16: 24, 17: 25, 18: 26 };
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
          if (typeof row[sourceCol] === 'number' && !isNaN(row[sourceCol])) {
            aggregatedData[combinedKey][targetCol] += row[sourceCol];
          }
        });
      });

      const targetSpreadsheet = SpreadsheetApp.openById(file.getId());
      const targetSheet = targetSpreadsheet.getSheetByName('Total');
      targetSheet.getRange('A3:Z' + targetSheet.getMaxRows()).clearContent().clearFormat();

      const output = [];

      Object.keys(aggregatedData).forEach(combinedKey => {
        const row = new Array(26).fill('');
        const data = aggregatedData[combinedKey];
        row[0] = data[1]; // Текст
        row[1] = data[2]; // Число - 1,000
        row[2] = data[3]; // Число - 1,000
        row[3] = data[4]; // Число - 1,000
        row[4] = data[5]; // Число - 1,000
        row[5] = '=iferror(E:E/B:B,0)'; // Формула для столбца 10
        row[6] = data[7]; // Денежный
        row[7] = '=iferror(G:G/B:B*1000,0)'
        row[8] = '=iferror(C:C/B:B,0)'; // Формула для столбца 9
        row[9] = data[10];
        row[10] = '=iferror(J:J/B:B,0)'; // Формула для столбца 11

        for (let i = 11; i <= 17; i++) {
          row[i] = data[i + 1];
        }
        row[18] = `=SUM(L${output.length + 3}:R${output.length + 3})`; // Сумма столбцов 12-18

        output.push(row);
      });

      const totalsRow = new Array(26).fill('');
      totalsRow[0] = "Total";
      for (let i = 1; i <= 4; i++) {
        totalsRow[i] = `=SUM(${String.fromCharCode(65 + i)}3:${String.fromCharCode(65 + i)}${output.length + 2})`;
      }
      totalsRow[5] = '=iferror(E:E/B:B,0)';
      totalsRow[6] = `=SUM(G3:G${output.length + 2})`;
      totalsRow[7] = '=iferror(G:G/B:B*1000,0)'
      totalsRow[8] = '=iferror(C:C/B:B,0)'
      totalsRow[9] = `=SUM(${String.fromCharCode(65 + 9)}3:${String.fromCharCode(65 + 9)}${output.length + 2})`;
      totalsRow[10] = '=iferror(J:J/B:B,0)';

      for (let i = 11; i <= 17; i++) {
        totalsRow[i] = `=SUM(${String.fromCharCode(65 + i)}3:${String.fromCharCode(65 + i)}${output.length + 2})`;
      }
      totalsRow[18] = `=SUM(S3:S${output.length + 2})`;

      output.push(totalsRow);

      const targetRange = targetSheet.getRange(3, 1, output.length, 26);
      targetRange.setValues(output);

      targetSheet.getRange(3, 2, output.length + 1, 4).setNumberFormat("#,##0");
      targetSheet.getRange(3, 6, output.length + 1, 1).setNumberFormat("0.00%");
      targetSheet.getRange(3, 7, output.length + 1, 2).setNumberFormat("$#,##0.00");
      targetSheet.getRange(3, 9, output.length + 1, 1).setNumberFormat("0.00%");
      targetSheet.getRange(3, 10, output.length + 1, 1).setNumberFormat("#,##0");
      targetSheet.getRange(3, 11, output.length + 1, 1).setNumberFormat("0.00%");
      targetSheet.getRange(3, 12, output.length + 1, 7).setNumberFormat("#,##0");

      targetSheet.getRange(output.length + 2, 1, 1, 26).setFontWeight("bold");

      Logger.log('Данные успешно агрегированы и записаны для файла: ' + fileName);
    }
  }
}

// totalConfig / DOOH
function aggregateAndMapDataForAllFiles_campaignsDOOH900() {
  const cacheControl = new CacheControl();
  cacheControl.setNoCache();
  const folderId = configTotal.folderDOOH
  const sourceSpreadsheetId = configTotal.sourceSpreadsheetId;

  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();

    if (fileName.includes("DOOH")) {
      const ss = SpreadsheetApp.openById(sourceSpreadsheetId);
      const sheet = ss.getSheetByName('union_date');
      const allData = sheet.getRange('A2:AE' + sheet.getLastRow()).getValues();
      const filteredData = allData.filter(row => row[30] === fileName);
      const mapping = { 1: 3, 2: 9, 3: 15 };
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
          if (typeof row[sourceCol] === 'number' && !isNaN(row[sourceCol])) {
            aggregatedData[combinedKey][targetCol] += row[sourceCol];
          }
        });
      });

      const targetSpreadsheet = SpreadsheetApp.openById(file.getId());
      const targetSheet = targetSpreadsheet.getSheetByName('Total');
      targetSheet.getRange('A3:Z' + targetSheet.getMaxRows()).clearContent().clearFormat();

      const output = [];

      Object.keys(aggregatedData).forEach(combinedKey => {
        const row = new Array(4).fill('');
        const data = aggregatedData[combinedKey];
        row[0] = data[1]; // Текст
        row[1] = data[2]; // Число - 1,000
        row[2] = data[3]; // Число - 1,000
        row[3] = '=iferror(C:C/B:B*1000,0)'

        output.push(row);
      });

      const totalsRow = new Array(4).fill('');
      totalsRow[0] = "Total";
      for (let i = 1; i <= 2; i++) {
        totalsRow[i] = `=SUM(${String.fromCharCode(65 + i)}3:${String.fromCharCode(65 + i)}${output.length + 2})`;
      }

      totalsRow[3] = '=iferror(C:C/B:B*1000,0)'

      output.push(totalsRow);

      const targetRange = targetSheet.getRange(3, 1, output.length, 4);
      targetRange.setValues(output);

      targetSheet.getRange(3, 2, output.length + 1, 4).setNumberFormat("#,##0");
      targetSheet.getRange(3, 3, output.length + 1, 2).setNumberFormat("$#,##0.00");
      targetSheet.getRange(3, 4, output.length + 1, 2).setNumberFormat("$#,##0.00");

      targetSheet.getRange(output.length + 2, 1, 1, 4).setFontWeight("bold");

      Logger.log('Данные успешно агрегированы и записаны для файла: ' + fileName);
    }
  }
}