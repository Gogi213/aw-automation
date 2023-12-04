// createSpreadsheetConfig

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
            'Campaign,Impressions,Viewable Impressions,Unique Inpressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,Book a Visit,Map Directions,Phone Calls,Book a Visit  -  Post View,Map Directions - Post View,Phone Calls  - Post View,In-Store Visits,Total Conversions'],
          merge: [1, 1, 1, 19]
        },
        'GOH / CTV': {
          headers: ['Totals by campaign,,,,,,,,,,,,,,,,,,',
            'Campaign,Impressions,Viewable Impressions,Unique Inpressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,Book a Visit,Map Directions,Phone Calls,Book a Visit  -  Post View,Map Directions - Post View,Phone Calls  - Post View,In-Store Visits,Total Conversions'],
          merge: [1, 1, 1, 19]
        },

        'GOH / Display': {
          headers: ['Totals by campaign,,,,,,,,,,,,,,,',
            'Campaign,Impressions,Viewable Impressions,Unique Impressions,Clicks,CTR,Cost,CPM,Book a Visit,Map Directions,Phone Calls,Book a Visit  -  Post View,Map Directions - Post View,Phone Calls  - Post View,In-Store Visits,Total Conversions'],
          merge: [1, 1, 1, 16]
        },

        'GOH / Audio': {
          headers: ['Totals by campaign,,,,,,,,,,,,,,,,,,',
            'Campaign,Impressions,Viewable Impressions,Unique Inpressions,Clicks,CTR,Cost,CPM,VR,Complete views/listens,ACR/VCR,Book a Visit,Map Directions,Phone Calls,Book a Visit  -  Post View,Map Directions - Post View,Phone Calls  - Post View,In-Store Visits,Total Conversions'],
          merge: [1, 1, 1, 19]
        },

        'GOH / YouTube': {
          headers: ['Totals by campaign,,,,,,',
            'Campaign,Impressions,Views,Clicks,Cost,VCR,CPV'],
          merge: [1, 1, 1, 7]
        },

        'GOH / DOOH': {
          headers: ['Totals by campaign,,,',
            'Campaign,Impressions,Cost,CPM'],
          merge: [1, 1, 1, 4]
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

        'MOL / YouTube': {
          headers: ['Totals by campaign,,,,,,',
            'Campaign,Impressions,Views,Clicks,Cost,VCR,CPV'],
          merge: [1, 1, 1, 7]
        },

        'MOL / DOOH': {
          headers: ['Totals by campaign,,,',
            'Campaign,Impressions,Cost,CPM'],
          merge: [1, 1, 1, 4]
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

        'SJNY / YouTube': {
          headers: ['Totals by campaign,,,,,,',
            'Campaign,Impressions,Views,Clicks,Cost,VCR,CPV'],
          merge: [1, 1, 1, 7]
        },

        'SJNY / DOOH': {
          headers: ['Totals by campaign,,,',
            'Campaign,Impressions,Cost,CPM'],
          merge: [1, 1, 1, 4]
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

        'Others / YouTube': {
          headers: ['Totals by campaign,,,,,,',
            'Campaign,Impressions,Views,Clicks,Cost,VCR,CPV'],
          merge: [1, 1, 1, 7]
        },

        'Others / DOOH': {
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

        'GOH / YouTube': {
          headers: ['Campaign,Creative,Date,Impressions,Views,Clicks,Cost,VCR,CPV']
        },

        'GOH / DOOH': {
          headers: ['Campaign,Creative,Date,Impressions,CPM,Cost,Location']
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

        'MOL / YouTube': {
          headers: ['Campaign,Creative,Date,Impressions,Views,Clicks,Cost,VCR,CPV']
        },

        'MOL / DOOH': {
          headers: ['Campaign,Creative,Date,Impressions,CPM,Cost,Location']
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

        'SJNY / YouTube': {
          headers: ['Campaign,Creative,Date,Impressions,Views,Clicks,Cost,VCR,CPV']
        },

        'SJNY / DOOH': {
          headers: ['Campaign,Creative,Date,Impressions,CPM,Cost,Location']
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

        'Others / YouTube': {
          headers: ['Campaign,Creative,Date,Impressions,Views,Clicks,Cost,VCR,CPV']
        },

        'Others / DOOH': {
          headers: ['Campaign,Creative,Date,Impressions,CPM,Cost,Location']
        },
      }
    },
    {
      name: 'Stat by creatives',
      types: {
        'GOH / Display': {
          headers: ['Creative,Dimension,Viewable Impressions,Clicks,CTR']
        },
        'MOL / Display': {
          headers: ['Creative,Dimension,Impressions,Clicks,CTR']
        },
        'SJNY / Display': {
          headers: ['Creative,Dimension,Impressions,Clicks,CTR']
        },
        'Others / Display': {
          headers: ['Creative,Dimension,Impressions,Clicks,CTR']
        },

      }
    },
    {
      name: 'Stat by sites',
      types: {
        'SBS + GOH': {
          headers: ['Site,Viewable Impressions,Clicks,CTR']
        },
        'SBS + ALL - GOH': {
          headers: ['Site,Impressions,Clicks,CTR']
        },
      }
    }
  ],
};

