function processFilesInFolder(folderId) {
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();

    if (fileName.includes("Display")) {
      // Вызов функции из displayTotalCampaign.js
      aggregateAndMapDataForAllFiles_campaignsDisplay(file);
    } else if (fileName.includes("Video")) {
      // Вызов функции из videoTotalCampaign.js
      aggregateAndMapDataForAllFiles_campaignsVideo(file);
    } else {
      // Обработка других случаев или вывод сообщения об ошибке
      console.log("Неизвестный тип файла: " + fileName);
    }
  }
}

function processMultipleFolders() {
  const folderIds = ['1S2HuGudocrjfLY8Ag65RrYceCFZfzdzC', '1Voz3zu5Tkx6Gtdn9KOsnhXpAQB79yie3'];
  folderIds.forEach(folderId => processFilesInFolder(folderId));
}

// Вызов функции для обработки файлов во всех папках
processMultipleFolders();
