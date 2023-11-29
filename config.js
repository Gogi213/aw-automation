const config = {
    // Идентификаторы ресурсов
    folderId: '1BBJSkhFeA67WDOgbRFnrBOb82JqbbMn4',
    spreadsheetId: '1a9qhTubxbdew9IfstH0v7dQijexTBs9jbkkBIIXV-cs',
  
    // Названия листов
    sheetNames: {
      unionDate: 'union_date'
    },
  
    // Типы файлов для обработки
    fileTypes: ['Video', 'Audio', 'CTV', 'DOOH', 'Display'],
  
    // Настройки листов
    sheetsData: [
      {
        name: 'Total',
        headers: [
          'Totals by campaign,,,,,,,,,,,,,,,,,,',
          'Creative,Impressions,Viewable Impressions,Unique Inpressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,Book a Visit,Map Directions,Phone Calls,Book a Visit  -  Post View,Map Directions - Post View,Phone Calls  - Post View,In-Store Visits,Total Conversions'
        ],
        merge: [1, 1, 1, 19]
      },
      {
        name: 'Stat by day',
        headers: [
          'Campaign,Creative,Date,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,Book a Visit,Map Directions,Phone Calls,Book a Visit  -  Post View,Map Directions - Post View,Phone Calls  - Post View,In-store Visits'
        ]
      },
      {
        name: 'Stat by sites',
        headers: ['Site,Viewable Impressions,Clicks,CTR']
      }
      // Добавьте здесь другие настройки листов, если они есть
    ],
  
    // Другие общие настройки
    // ...
  };
  