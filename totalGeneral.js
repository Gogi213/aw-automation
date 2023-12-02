function processFilesInFolder(folderId) {
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();
  const processedFiles = {}; // Объект для отслеживания обработанных файлов

  while (files.hasNext()) {
    const file = files.next();
    const fileId = file.getId();
    const fileName = file.getName();

    // Проверяем, был ли файл уже обработан
    if (processedFiles[fileId]) {
      console.log("Файл уже обработан: " + fileName);
      continue; // Пропускаем уже обработанные файлы
    }

    if (fileName.includes("Display")) {
      // Вызов функции из displayTotalCampaign.js
      aggregateAndMapDataForAllFiles_campaigns44444444(file);
    } else if (fileName.includes("Video")) {
      // Вызов функции из videoTotalCampaign.js
      aggregateAndMapDataForAllFiles_campaigns4(file);
    } else {
      console.log("Неизвестный тип файла: " + fileName);
    }

    // Отмечаем файл как обработанный
    processedFiles[fileId] = true;
  }
}

function processMultipleFolders() {
  const folderIds = ['1S2HuGudocrjfLY8Ag65RrYceCFZfzdzC', '1Voz3zu5Tkx6Gtdn9KOsnhXpAQB79yie3'];
  folderIds.forEach(folderId => processFilesInFolder(folderId));
}

// Вызов функции для обработки файлов во всех папках
processMultipleFolders();
