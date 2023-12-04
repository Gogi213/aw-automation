// statByCreativeConfig

function updateCreativeDisplay() {
  const ssId = '1a9qhTubxbdew9IfstH0v7dQijexTBs9jbkkBIIXV-cs';
  const sourceSheetName = 'creatives';
  const folderId = '1S2HuGudocrjfLY8Ag65RrYceCFZfzdzC';
  const targetSheetName = 'Stat by creatives';

  const sourceSpreadsheet = SpreadsheetApp.openById(ssId);
  const sourceSheet = sourceSpreadsheet.getSheetByName(sourceSheetName);
  const lastRow = sourceSheet.getLastRow();
  const dataRange = sourceSheet.getRange(2, 7, lastRow - 1, 3);
  const data = dataRange.getValues();

  const fileNames = data.map(row => row[0]);
  const creativeNames = data.map(row => row[1]);
  const creativeData = data.map(row => row[2]);

  const targetFolder = DriveApp.getFolderById(folderId);
  const files = targetFolder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    const fileIndex = fileNames.indexOf(fileName);

    if (fileIndex > -1) {
      const targetSpreadsheet = SpreadsheetApp.open(file);
      const targetSheet = targetSpreadsheet.getSheetByName(targetSheetName);
      const totalSheet = targetSpreadsheet.getSheetByName('Total');

      if (targetSheet && totalSheet) {
        const rowsToClear = targetSheet.getLastRow() - 1;
        const columnsToClear = targetSheet.getLastColumn();
        if (rowsToClear > 1) {
          targetSheet.getRange(2, 1, rowsToClear, columnsToClear).clearContent();
        }

        const totalData = totalSheet.getDataRange().getValues().slice(1);
        const totalDict = totalData.reduce((dict, row) => {
          dict[row[0]] = { C: row[2], E: row[4] };
          return dict;
        }, {});

        const filteredIndices = fileNames.reduce((indices, fName, i) => {
          if (fName === fileName) indices.push(i);
          return indices;
        }, []);

        const uniqueCreativeNames = [...new Set(filteredIndices.map(i => creativeNames[i]))];
        const creativeCounts = uniqueCreativeNames.reduce((counts, name) => {
          counts[name] = filteredIndices.filter(i => creativeNames[i] === name).length;
          return counts;
        }, {});

        // Получаем случайное распределение для каждого креатива
        const randomDistributions = uniqueCreativeNames.map(name => {
          // Проверяем, существует ли запись для данного имени в totalDict
          if (!totalDict[name]) {
            Logger.log(`Не найдены данные для креатива с именем "${name}" в totalDict.`);
            return {
              name: name,
              distributionC: [], // Пустой массив, так как не можем сгенерировать распределение
              distributionE: []  // Пустой массив, так как не можем сгенерировать распределение
            };
          }

          return {
            name: name,
            distributionC: getRandomDistribution(creativeCounts[name], totalDict[name].C, 0.1),
            distributionE: getRandomDistribution(creativeCounts[name], totalDict[name].E, 0.1)
          };
        });

        // Собираем данные для записи в лист
        const combinedData = filteredIndices.map(i => {
          const cName = creativeNames[i];
          const distributions = randomDistributions.find(d => d.name === cName);
          const index = filteredIndices.filter(fi => creativeNames[fi] === cName).indexOf(i);
          return [cName, creativeData[i], distributions.distributionC[index], distributions.distributionE[index]];
        });

        const targetRange = targetSheet.getRange(2, 1, combinedData.length, 4);
        targetRange.setValues(combinedData);

        // Применяем форматирование к столбцам 3 и 4
        targetSheet.getRange(2, 3, combinedData.length, 2).setNumberFormat("#,##0");

        // Добавляем формулу в столбец 5 и форматируем его как процентный
        const formulaRange = targetSheet.getRange(2, 5, combinedData.length);
        formulaRange.setFormulaR1C1("=iferror(R[0]C[-1]/R[0]C[-2],)");
        formulaRange.setNumberFormat("0.00%");

        // Добавляем строку Total в конец таблицы
        const lastRow = targetSheet.getLastRow();
        const totalRow = lastRow + 1; // Строка для Total будет следующей после последней заполненной строки

        // Записываем слово "Total" в первый столбец строки Total
        targetSheet.getRange(totalRow, 1).setValue('Total').setFontWeight('bold');

        // Считаем сумму для столбца 3 и записываем в строку Total
        targetSheet.getRange(totalRow, 3).setFormula(`=SUM(C2:C${lastRow})`).setNumberFormat("#,##0").setFontWeight('bold');

        // Считаем сумму для столбца 4 и записываем в строку Total
        targetSheet.getRange(totalRow, 4).setFormula(`=SUM(D2:D${lastRow})`).setNumberFormat("#,##0").setFontWeight('bold');

        // Добавляем формулу для процентного расчета в столбец 5
        targetSheet.getRange(totalRow, 5).setFormula("=iferror(D" + totalRow + "/C" + totalRow + ",)").setNumberFormat("0.00%").setFontWeight('bold');

        SpreadsheetApp.flush();
      } else {
        Logger.log(`Лист "${targetSheetName}" или "Total" не найден в файле: ${fileName}`);
      }
    }
  }
}

function getRandomDistribution(count, total, variance, minProportion = 0.1) {
  let distribution = [];
  let sum = 0;
  let baseValue = Math.floor(total * minProportion); // Минимальный порог для каждого значения, округлённый в меньшую сторону
  let remainingTotal = total - baseValue * count; // Оставшееся значение для распределения

  // Генерируем случайные числа для оставшегося значения
  for (let i = 0; i < count; i++) {
    let randomValue = Math.random();
    distribution.push(randomValue);
    sum += randomValue;
  }

  // Нормализуем числа, чтобы в сумме они давали оставшееся значение
  distribution = distribution.map(value => Math.round(baseValue + (value / sum) * remainingTotal));

  // Применяем дисперсию и убеждаемся, что сумма не изменится
  let adjustedSum = distribution.reduce((a, b) => a + b, 0);
  distribution = distribution.map(value => {
    let adjustedValue = Math.round(value * (1 + (Math.random() * variance * 2 - variance)));
    return adjustedValue;
  });

  // Если после округления сумма изменилась, корректируем последнее значение
  let finalSum = distribution.reduce((a, b) => a + b, 0);
  if (finalSum !== total) {
    distribution[distribution.length - 1] += total - finalSum;
  }

  return distribution;
}