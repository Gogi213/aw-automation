// main

function runBothFunctions1() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var isOperationCompleted = scriptProperties.getProperty('isOperationCompleted');

  if (isOperationCompleted !== 'true') {
    // aggregateAndMapDataForAllFiles_campaignsDisplay900();
    // aggregateAndMapDataForAllFiles_campaignsAudio900();    
    // aggregateAndMapDataForAllFiles_campaignsVideo900();
    // aggregateAndMapDataForAllFiles_campaignsCTV900();
    // aggregateAndMapDataForAllFiles_campaignsDOOH900();


    // aggregateAndMapDataForAllFiles_totalCreativeDisplay900();
    // aggregateAndMapDataForAllFiles_totalCreativeAudio900();
    // aggregateAndMapDataForAllFiles_totalCreativeVideo900();
    // aggregateAndMapDataForAllFiles_totalCreativeCTV900();
    // aggregateAndMapDataForAllFiles_totalCreativeDOOH900();   

    // aggregateAndMapDataForAllFiles_statbydayDisplay();
    // aggregateAndMapDataForAllFiles_statbydayAudio();
    // aggregateAndMapDataForAllFiles_statbydayVideo();
    // aggregateAndMapDataForAllFiles_statbydayCTV();
    // aggregateAndMapDataForAllFiles_statbydayDOOH();

    // updateCreativeDisplay();


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
