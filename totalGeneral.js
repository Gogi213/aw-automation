function processDisplayFiles() {
  const folderId = '1S2HuGudocrjfLY8Ag65RrYceCFZfzdzC'; // Замените на реальный ID папки
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();

  if (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();

    if (fileName.includes("Display")) {
      aggregateAndMapDataForAllFiles_campaignsDisplay()
    }
  }
}

function processVideoFiles() {
  const folderId = '1Voz3zu5Tkx6Gtdn9KOsnhXpAQB79yie3'; // Замените на реальный ID папки
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();

  if (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();

    if (fileName.includes("Video")) {
      aggregateAndMapDataForAllFiles_campaignsVideo()
    }
  }
}

// Вызов функций
processDisplayFiles();
processVideoFiles();