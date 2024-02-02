// statBySitesConfig

function updateStatBySites() {
  var folderIds = {
    'Display': configTotal.folderDisplay,
    'Audio': configTotal.folderAudio,
    'Video': configTotal.folderVideo,
    'CTV': configTotal.folderCTV
  };

  var unionDateId = configTotal.sourceSpreadsheetId;
  var sitesSheetId = configTotal.sourceSpreadsheetId;

  for (var key in folderIds) {
    var folderId = folderIds[key];
    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFiles();

    while (files.hasNext()) {
      var file = files.next();
      var fileName = file.getName();

      // Открытие файла как Spreadsheet
      var spreadsheet = SpreadsheetApp.open(file);

      // Шаг 2: Получение показов и кликов из union_date
      var unionDateSheet = SpreadsheetApp.openById(unionDateId).getSheetByName('union_date');
      var dataRange = unionDateSheet.getDataRange().getValues();
      var impressions = 0;
      var clicks = 0;
      for (var i = 0; i < dataRange.length; i++) {
        if (dataRange[i][30] === fileName) { // Столбец AE для имени файла
            if (fileName.includes("CTV")) {
              impressions += dataRange[i][8]; // Столбец I для показов, если файл содержит CTV
            } else {
              impressions += dataRange[i][9]; // Столбец J для показов, в остальных случаях
            }
            clicks += dataRange[i][12]; // Столбец M для кликов, суммируем значения
          }
        }

      // Шаг 3: Получение сайтов из листа sites
      var sitesSheet = SpreadsheetApp.openById(sitesSheetId).getSheetByName('sites');
      var sitesData = sitesSheet.getDataRange().getValues();
      var sites = [];
      for (var j = 0; j < sitesData.length; j++) {
        if (sitesData[j][6] === fileName) {
          sites.push(sitesData[j][7]);
        }
      }
      shuffleArray(sites); // Перемешиваем список сайтов

      // Расчет процентов для LVI
      var lviPercentage = getLowVolumePercentage(fileName);
      var lviImpressions = impressions * lviPercentage;
      var lviClicks = clicks * lviPercentage;

      // Расчет оставшихся показов и кликов для распределения
      var remainingImpressions = impressions - lviImpressions;
      var remainingClicks = clicks - lviClicks;

      // Обработка Spotify и Pandora
      var specialSites = sites.filter(site => site.match(/spotify|pandora/i));
      var specialSitesImpressions = 0;
      var specialSitesClicks = 0;
      if (specialSites.length > 0) {
        var specialShare = 0.40; // 40% от оставшихся показов и кликов
        specialSitesImpressions = remainingImpressions * specialShare;
        specialSitesClicks = remainingClicks * specialShare;
        remainingImpressions -= specialSitesImpressions;
        remainingClicks -= specialSitesClicks;
        // Распределение между специальными сайтами с дисперсией
        var distributedSpecialImpressions = distributeRandomly(specialSitesImpressions, specialSites.length);
        var distributedSpecialClicks = distributeRandomly(specialSitesClicks, specialSites.length);
      }

      // Исключение LVI и специальных сайтов из списка сайтов для распределения
      var sitesForRemainingDistribution = sites.filter(site => site !== "Low Volume Inventory" && !site.match(/spotify|pandora/i));
      shuffleArray(sitesForRemainingDistribution); // Перемешиваем оставшиеся сайты

      // Распределение оставшихся показов и кликов по оставшимся сайтам
      var distributedRemainingImpressions = distributeRandomly(remainingImpressions, sitesForRemainingDistribution.length);
      var distributedRemainingClicks = distributeRandomly(remainingClicks, sitesForRemainingDistribution.length);

      // Новый код: Округление значений и корректировка остатка
      distributedRemainingImpressions = distributedRemainingImpressions.map(Math.round);
      distributedRemainingClicks = distributedRemainingClicks.map(Math.round);

      let totalImpressions = impressions - lviImpressions - specialSitesImpressions;
      let totalClicks = clicks - lviClicks - specialSitesClicks;
      let sumRoundedImpressions = distributedRemainingImpressions.reduce((a, b) => a + b, 0);
      let sumRoundedClicks = distributedRemainingClicks.reduce((a, b) => a + b, 0);

      let diffImpressions = totalImpressions - sumRoundedImpressions;
      let diffClicks = totalClicks - sumRoundedClicks;

      lviImpressions += diffImpressions;
      lviClicks += diffClicks;

      // Шаг 4: Запись данных в лист Stat by sites
      var statSheet = spreadsheet.getSheetByName('Stat by sites');

      // Удаление существующих данных, начиная со второй строки
      var lastRow = statSheet.getLastRow();
      if (lastRow > 1) {
        statSheet.deleteRows(2, lastRow - 1);
      }

      sites.forEach(site => {
        var siteImpressions, siteClicks;
        if (site === "Low Volume Inventory") {
          siteImpressions = lviImpressions;
          siteClicks = lviClicks;
        } else if (specialSites.includes(site)) {
          siteImpressions = distributedSpecialImpressions.shift();
          siteClicks = distributedSpecialClicks.shift();
        } else {
          siteImpressions = distributedRemainingImpressions.shift();
          siteClicks = distributedRemainingClicks.shift();
        }

      var row;
      if (fileName.includes("CTV")) {
        // Если имя файла содержит "CTV", добавляем первый и второй столбцы
        row = [site, siteImpressions];
      } else {
        // В противном случае добавляем все три столбца
        row = [site, siteImpressions, siteClicks];
      }
      statSheet.appendRow(row);
    });

      // Добавление формулы и форматирования в четвёртом столбце
      var lastRow = statSheet.getLastRow();
      if (!fileName.includes("CTV")) {
        var range = statSheet.getRange(2, 4, lastRow - 1); // Начинаем с 2-й строки
        range.setFormulaR1C1('=IFERROR(R[0]C[-1]/R[0]C[-2],0)');
        range.setNumberFormat("0.00%");
      }

      // Форматирование 2-го и 3-го столбцов
      var rangeImpressions = statSheet.getRange(2, 2, lastRow - 1);
      var rangeClicks = statSheet.getRange(2, 3, lastRow - 1);
      rangeImpressions.setNumberFormat("#,##0");
      if (!fileName.includes("CTV")) {
        rangeClicks.setNumberFormat("#,##0");
      }

      var dataRange = statSheet.getDataRange(); // Получаем диапазон данных в листе
      statSheet.getRange(2, 1, dataRange.getLastRow() - 1, dataRange.getLastColumn())
        .sort({ column: 2, ascending: false }); // Сортируем данные по второму столбцу по убыванию

      // Добавление строки Total
      var totalRow = ["Total",
        "=SUM(B2:B" + lastRow + ")",
        fileName.includes("CTV") ? "" : "=SUM(C2:C" + lastRow + ")",
        fileName.includes("CTV") ? "" : "=IFERROR(C" + (lastRow + 1) + "/B" + (lastRow + 1) + ",0)"];
      statSheet.appendRow(totalRow);
      statSheet.getRange(lastRow + 1, 1, 1, 4).setFontWeight("bold");

      // Форматирование тоталов
      statSheet.getRange(lastRow + 1, 2).setNumberFormat("#,##0");
      if (!fileName.includes("CTV")) {
        statSheet.getRange(lastRow + 1, 3).setNumberFormat("#,##0");
        statSheet.getRange(lastRow + 1, 4).setNumberFormat("0.00%");
      }

    }
  }

  function distributeRandomly(total, count) {
    var distribution = [];
    var remaining = total;

    for (var i = 0; i < count - 1; i++) {
      var max = Math.min(remaining, (1 + 0.05) * (total / count));
      var value = Math.random() * (max - total / count * 0.95) + total / count * 0.95;
      distribution.push(value);
      remaining -= value;
    }

    // Добавление оставшегося значения для последнего сайта
    distribution.push(remaining);
    return distribution;
  }

  function getLowVolumePercentage(fileName) {
    if (fileName.includes("Display")) {
      return 0.65;
    } else if (fileName.includes("Video")) {
      return 0.55;
    } else if (fileName.includes("Audio")) {
      return 0.25;
    } else if (fileName.includes("CTV")) {
      return 0.35;
    }
    return 0;
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

}