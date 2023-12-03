function runBothFunctions() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var isOperationCompleted = scriptProperties.getProperty('isOperationCompleted');

  if (isOperationCompleted !== 'true') {
    aggregateAndMapDataForAllFiles_campaignsDisplay900();
    aggregateAndMapDataForAllFiles_campaignsAudio900();
    aggregateAndMapDataForAllFiles_campaignsVideo900();
    aggregateAndMapDataForAllFiles_campaignsCTV900();
    aggregateAndMapDataForAllFiles_campaignsDOOH900();        

    // Установка флага, что операции выполнены
    scriptProperties.setProperty('isOperationCompleted', 'true');
  } else {
    Logger.log('Операции уже были выполнены в этой сессии.');
  }

  // Сброс флага в конце выполнения функций
  resetOperationFlag();
}

function resetOperationFlag() {
  PropertiesService.getScriptProperties().deleteProperty('isOperationCompleted');
}
