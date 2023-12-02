function aggregateAndMapDataForAllFiles_campaigns44444444() {
  const folderId = '1S2HuGudocrjfLY8Ag65RrYceCFZfzdzC';
  const sourceSpreadsheetId = '1a9qhTubxbdew9IfstH0v7dQijexTBs9jbkkBIIXV-cs';

  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();

    // Проверяем, содержит ли имя файла "Display"
    if (!fileName.includes("Display")) {
      continue; // Если не содержит, переходим к следующему файлу
    }

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
      const row = new Array(26).fill('');
      const data = aggregatedData[combinedKey];
      row[0] = data[1]; // Текст
      row[1] = data[2]; // Число - 1,000
      row[2] = data[3]; // Число - 1,000
      row[3] = data[4]; // Число - 1,000
      row[4] = data[5]; // Число - 1,000
      row[5] = `=IFERROR(E${output.length + 3}/C${output.length + 3},)`; // Процентный
      row[6] = data[7]; // Денежный
      row[7] = `=IFERROR(G${output.length + 3}/C${output.length + 3}*1000,)`; // Денежный с формулой
      for (let i = 8; i <= 14; i++) { // Числовой для столбцов 9-15
        row[i] = data[i + 1];
      }
      row[15] = `=SUM(I${output.length + 3}:O${output.length + 3})`; // Сумма столбцов 9-15
      output.push(row);
    });

    // Добавляем строку тоталов
    const totalsRow = new Array(26).fill('');
    totalsRow[0] = "Total";
    for (let i = 1; i <= 4; i++) { // Столбцы 2-5
      totalsRow[i] = `=SUM(${String.fromCharCode(65 + i)}3:${String.fromCharCode(65 + i)}${output.length + 2})`;
    }
    totalsRow[6] = `=SUM(G3:G${output.length + 2})`; // Столбец 7
    for (let i = 8; i <= 15; i++) { // Столбцы 9-16
      totalsRow[i] = `=SUM(${String.fromCharCode(65 + i)}3:${String.fromCharCode(65 + i)}${output.length + 2})`;
    }
    totalsRow[5] = `=IFERROR(E${output.length + 3}/C${output.length + 3},)`;
    totalsRow[7] = `=IFERROR(G${output.length + 3}/C${output.length + 3}*1000,)`;
    output.push(totalsRow);

    const targetRange = targetSheet.getRange(3, 1, output.length, 26);
    targetRange.setValues(output);

    // Применяем форматы и формулы к столбцам
    targetSheet.getRange(3, 2, output.length, 4).setNumberFormat("#,##0"); // Столбцы 2-5 числовые
    targetSheet.getRange(3, 6, output.length, 1).setNumberFormat("0.00%"); // Процентный формат для столбца 6
    targetSheet.getRange(3, 7, output.length).setNumberFormat("$#,##0.00"); // Денежный формат для столбца 7
    targetSheet.getRange(3, 8, output.length, 1).setNumberFormat("$#,##0.00"); // Денежный формат для столбца 8
    targetSheet.getRange(3, 9, output.length, 8).setNumberFormat("#,##0"); // Столбцы 9-16 стандартный числовой

    // Применяем жирное форматирование к строке тоталов
    targetSheet.getRange(output.length + 2, 1, 1, 26).setFontWeight("bold");

    Logger.log('Данные успешно агрегированы и записаны для файла: ' + fileName);
  }
}
