const config = {
  // Идентификаторы ресурсов
  folderId: '1BBJSkhFeA67WDOgbRFnrBOb82JqbbMn4',
  spreadsheetId: '1a9qhTubxbdew9IfstH0v7dQijexTBs9jbkkBIIXV-cs',
  // Названия листов
  sheetNames: {
    unionDate: 'union_date'
  },
  // Типы файлов для обработки
  fileTypes: ['Video', 'Audio', 'CTV', 'DOOH', 'Display', 'YouTube'],

  // Настройки листов
  sheetsData: [
    {
      name: 'Total',
      types: {
        'GOH / Video': {
          headers: ['Totals by campaign,,,,,,,,,,,,,,,,,,',
            'Creative,Impressions,Viewable Impressions,Unique Inpressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,Book a Visit,Map Directions,Phone Calls,Book a Visit  -  Post View,Map Directions - Post View,Phone Calls  - Post View,In-Store Visits,Total Conversions'],
          merge: [1, 1, 1, 19]
        },
        'GOH / CTV': {
          headers: ['Totals by campaign,,,,,,,,,,,,,,,,,,',
            'Creative,Impressions,Viewable Impressions,Unique Inpressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,Book a Visit,Map Directions,Phone Calls,Book a Visit  -  Post View,Map Directions - Post View,Phone Calls  - Post View,In-Store Visits,Total Conversions'],
          merge: [1, 1, 1, 19]
        },

        'GOH / Display': {
          headers: ['Totals by campaign,,,,,,,,,,,,,,,,,,',
            'Creative,Impressions,Viewable Impressions,Unique Inpressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,Book a Visit,Map Directions,Phone Calls,Book a Visit  -  Post View,Map Directions - Post View,Phone Calls  - Post View,In-Store Visits,Total Conversions'],
          merge: [1, 1, 1, 19]
        },

        'GOH / Audio': {
          headers: ['Totals by campaign,,,,,,,,,,,,,,,,,,',
            'Campaign,Impressions,Viewable Impressions,Unique Inpressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,Book a Visit,Map Directions,Phone Calls,Book a Visit  -  Post View,Map Directions - Post View,Phone Calls  - Post View,In-Store Visits,Total Conversions'],
          merge: [1, 1, 1, 19]
        },



        'MOL / Video': {
          headers: ['Totals by campaign,,,,,,,,,,,,',
            'Campaign,Impressions,Viewable Impressions,Unique Inpressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,PV Conversions,Total Conversions'],
          merge: [1, 1, 1, 13]
        },
        'MOL / CTV': {
          headers: ['Totals by campaign,,,,,,,,,,,,',
            'Campaign,Impressions,Viewable Impressions,Unique Inpressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,PV Conversions,Total Conversions'],
          merge: [1, 1, 1, 13]
        },

        'MOL / Display': {
          headers: ['Totals by campaign,,,,,,,,,',
            'Campaign,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM,PV Conversions,Total Conversions'],
          merge: [1, 1, 1, 10]
        },

        'MOL / Audio': {
          headers: ['Totals by campaign,,,,,,,,,,,,',
            'Campaign,Impressions,Viewable Impressions,Unique Inpressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,PV Conversions,Total Conversions'],
          merge: [1, 1, 1, 13]
        },



        'SJNY / Video': {
          headers: ['Totals by campaign,,,,,,,,,,,,,,,,,,,,,',
            'Campaign,Impressions,Viewable Impressions,Unique Inpressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,Brookyln RFI Form PV,Brooklyn Application PV ,Long Island RFI Form PV,Online RFI Form PV,Long Island & Online Application PV,Brookyln RFI Form PC,Brooklyn Application PC,Long Island RFI Form PC,Online RFI Form PC ,Long Island & Online Application PC,Total Conversions'],
          merge: [1, 1, 1, 22]
        },
        'SJNY / CTV': {
          headers: ['Totals by campaign,,,,,,,,,,,,,,,,,,,,,',
            'Campaign,Impressions,Viewable Impressions,Unique Inpressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,Brookyln RFI Form PV,Brooklyn Application PV ,Long Island RFI Form PV,Online RFI Form PV,Long Island & Online Application PV,Brookyln RFI Form PC,Brooklyn Application PC,Long Island RFI Form PC,Online RFI Form PC ,Long Island & Online Application PC,Total Conversions'],
          merge: [1, 1, 1, 22]
        },

        'SJNY / Display': {
          headers: ['Totals by campaign,,,,,,,,,,,,,,,,,,',
            'Campaign,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM,Brookyln RFI Form PV,Brooklyn Application PV ,Long Island RFI Form PV,Online RFI Form PV,Long Island & Online Application PV,Brookyln RFI Form PC,Brooklyn Application PC,Long Island RFI Form PC,Online RFI Form PC ,Long Island & Online Application PC,Total Conversions'],
          merge: [1, 1, 1, 19]
        },

        'SJNY / Audio': {
          headers: ['Totals by campaign,,,,,,,,,,,,,,,,,,,,,',
            'Campaign,Impressions,Viewable Impressions,Unique Inpressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,Brookyln RFI Form PV,Brooklyn Application PV ,Long Island RFI Form PV,Online RFI Form PV,Long Island & Online Application PV,Brookyln RFI Form PC,Brooklyn Application PC,Long Island RFI Form PC,Online RFI Form PC ,Long Island & Online Application PC,Total Conversions'],
          merge: [1, 1, 1, 22]
        },


        'Others / Video': {
          headers: ['Totals by campaign,,,,,,,,,,',
            'Campaign,Impressions,Viewable Impressions,Unique Inpressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR'],
          merge: [1, 1, 1, 11]
        },
        'Others / CTV': {
          headers: ['Totals by campaign,,,,,,,,,,',
            'Campaign,Impressions,Viewable Impressions,Unique Inpressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR'],
          merge: [1, 1, 1, 11]
        },

        'Others / Display': {
          headers: ['Totals by campaign,,,,,,,',
            'Campaign,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM'],
          merge: [1, 1, 1, 8]
        },

        'Others / Audio': {
          headers: ['Totals by campaign,,,,,,,,,,',
            'Campaign,Impressions,Viewable Impressions,Unique Inpressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR'],
          merge: [1, 1, 1, 11]
        },


        // YOUTUBE и DOOH
        'All YouTube': {
          headers: ['Totals by campaign,,,,,,',
            'Campaign,Impressions,Views,Clicks,Cost,VCR,CPV'],
          merge: [1, 1, 1, 7]
        },

        'All DOOH': {
          headers: ['Totals by campaign,,,',
            'Campaign,Impressions,Cost,CPM'],
          merge: [1, 1, 1, 4]
        }
      }
    },
    {
      name: 'Stat by day',
      types: {
        'GOH / Video': {
          headers: ['Campaign,Creative,Date,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,Book a Visit,Map Directions,Phone Calls,Book a Visit  -  Post View,Map Directions - Post View,Phone Calls  - Post View,In-store Visits']
        },

        'GOH / CTV': {
          headers: ['Campaign,Creative,Date,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,Book a Visit,Map Directions,Phone Calls,Book a Visit  -  Post View,Map Directions - Post View,Phone Calls  - Post View,In-store Visits']
        },

        'GOH / Display': {
          headers: ['Campaign,Creative,Date,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM,Book a Visit,Map Directions,Phone Calls,Book a Visit  -  Post View,Map Directions - Post View,Phone Calls  - Post View,In-Store Visits']
        },

        'GOH / Audio': {
          headers: ['Campaign,Creative,Date,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,Book a Visit,Map Directions,Phone Calls,Book a Visit  -  Post View,Map Directions - Post View,Phone Calls  - Post View,In-store Visits']
        },



        'MOL / Video': {
          headers: ['Campaign,Creative,Date,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,PV Conversions']
        },

        'MOL / CTV': {
          headers: ['Campaign,Creative,Date,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,PV Conversions']
        },

        'MOL / Display': {
          headers: ['Campaign,Creative,Date,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM,PV Conversions']
        },

        'MOL / Audio': {
          headers: ['Campaign,Creative,Date,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,PV Conversions']
        },



        'SJNY / Video': {
          headers: ['Campaign,Creative,Date,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,Brookyln RFI Form PV,Brooklyn Application PV ,Long Island RFI Form PV,Online RFI Form PV,Long Island & Online Application PV,Brookyln RFI Form PC,Brooklyn Application PC,Long Island RFI Form PC,Online RFI Form PC ,Long Island & Online Application PC']
        },

        'SJNY / CTV': {
          headers: ['Campaign,Creative,Date,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,Brookyln RFI Form PV,Brooklyn Application PV ,Long Island RFI Form PV,Online RFI Form PV,Long Island & Online Application PV,Brookyln RFI Form PC,Brooklyn Application PC,Long Island RFI Form PC,Online RFI Form PC ,Long Island & Online Application PC']
        },

        'SJNY / Display': {
          headers: ['Campaign,Creative,Date,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM,Brookyln RFI Form PV,Brooklyn Application PV ,Long Island RFI Form PV,Online RFI Form PV,Long Island & Online Application PV,Brookyln RFI Form PC,Brooklyn Application PC,Long Island RFI Form PC,Online RFI Form PC ,Long Island & Online Application PC']
        },

        'SJNY / Audio': {
          headers: ['Campaign,Creative,Date,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,Brookyln RFI Form PV,Brooklyn Application PV ,Long Island RFI Form PV,Online RFI Form PV,Long Island & Online Application PV,Brookyln RFI Form PC,Brooklyn Application PC,Long Island RFI Form PC,Online RFI Form PC ,Long Island & Online Application PC']
        },


        'Others / Video': {
          headers: ['Campaign,Creative,Date,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR']
        },

        'Others / CTV': {
          headers: ['Campaign,Creative,Date,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR']
        },

        'Others / Display': {
          headers: ['Campaign,Creative,Date,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM']
        },

        'Others / Audio': {
          headers: ['Campaign,Creative,Date,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR']
        },



        // YOUTUBE и DOOH
        'YouTube': {
          headers: ['Campaign,Creative,Date,Impressions,Views,Clicks,Cost,VCR,CPV']
        },

        'DOOH': {
          headers: ['Campaign,Creative,Date,Impressions,CPM,Cost,Location']
        },

      }
    },
    {
      name: 'Stat by creatives',
      types: {
        'GOH / Display': {
          headers: ['Creative,Viewable Impressions,Clicks,CTR']
        },
        'All - GOH': {
          headers: ['Creative,Impressions,Clicks,CTR']
        },
      }
    },
    {
      name: 'Stat by sites',
      types: {
        'GOH / Display': {
          headers: ['Site,Viewable Impressions,Clicks,CTR']
        },
        'ALL - GOH': {
          headers: ['Site,Impressions,Clicks,CTR']
        },
      }
    }
  ],
};

