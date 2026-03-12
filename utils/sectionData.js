// ============================================
// SECTION DATA - Grade levels, sections, strands, pins, and default passwords
// ============================================

const sectionData = {
  'Grade 7': {
    sections: [
      { name: 'St. Anthony', pin: '0017', password: 'ANTH0701' },
      { name: 'St. Elizabeth', pin: '0027', password: 'ELIZ0702' },
      { name: 'St. Francis', pin: '0037', password: 'FRAN0703' },
      { name: 'St. Joseph', pin: '0047', password: 'JOSE0704' },
      { name: 'St. Michael', pin: '0057', password: 'MICH0705' },
      { name: 'St. Roque', pin: '0067', password: 'ROQU0706' },
      { name: 'St. Thomas', pin: '0077', password: 'THOM0707' }
    ],
    strand: ''
  },
  'Grade 8': {
    sections: [
      { name: 'St. Andrew', pin: '0018', password: 'ANDR0801' },
      { name: 'St. Jude', pin: '0028', password: 'JUDE0802' },
      { name: 'St. Lorenzo', pin: '0038', password: 'LORE0803' },
      { name: 'St. Martin', pin: '0048', password: 'MART0804' },
      { name: 'St. Paul', pin: '0058', password: 'PAUL0805' },
      { name: 'St. Peter', pin: '0068', password: 'PETE0806' }
    ],
    strand: ''
  },
  'Grade 9': {
    sections: [
      { name: 'St Agnes', pin: '0019', password: 'AGNE0901' },
      { name: 'St. Anne', pin: '0029', password: 'ANNE0902' },
      { name: 'St. Bernadette', pin: '0039', password: 'BERN0903' },
      { name: 'St. Bridget', pin: '0049', password: 'BRID0904' },
      { name: 'St. Monica', pin: '0059', password: 'MONI0905' },
      { name: 'St. Therese', pin: '0069', password: 'THER0906' }
    ],
    strand: ''
  },
  'Grade 10': {
    sections: [
      { name: 'St. Benedict', pin: '0101', password: 'BENE1001' },
      { name: 'St. John', pin: '0102', password: 'JOHN1002' },
      { name: 'St. Luke', pin: '0103', password: 'LUKE1003' },
      { name: 'St. Mark', pin: '0104', password: 'MARK1004' },
      { name: 'St. Matthew', pin: '0105', password: 'MATT1005' },
      { name: 'St. Phillip', pin: '0106', password: 'PHIL1006' }
    ],
    strand: ''
  },
  'Grade 11': {
    sections: [
      { name: 'St. Gregory', pin: '0111', strand: 'STEM (Science Technology Engineering and Mathematics)', password: 'GREG1101' },
      { name: 'St. Ignatius', pin: '0112', strand: 'STEM (Science Technology Engineering and Mathematics)', password: 'IGNA1102' },
      { name: 'St. Pedro Calungsod', pin: '0113', strand: 'STEM (Science Technology Engineering and Mathematics)', password: 'PEDR1103' },
      { name: 'St. James', pin: '0114', strand: 'HUMSS (Humanities and Social Sciences)', password: 'JAME1104' },
      { name: 'St. Timothy', pin: '0115', strand: 'HUMSS (Humanities and Social Sciences)', password: 'TIMO1105' },
      { name: 'St. Hannibal', pin: '0116', strand: 'TVL (Technical-Vocational-Livelihood)', password: 'HANN1106' },
      { name: 'St. Pio', pin: '0117', strand: 'ABM (Accountancy and Business Management)', password: 'PIO1107' }
    ]
  },
  'Grade 12': {
    sections: [
      { name: 'St. Margaret', pin: '0121', strand: 'STEM (Science Technology Engineering and Mathematics)', password: 'MARG1201' },
      { name: 'St. Martha', pin: '0122', strand: 'STEM (Science Technology Engineering and Mathematics)', password: 'MART1202' },
      { name: 'St. Rita of Casia', pin: '0123', strand: 'STEM (Science Technology Engineering and Mathematics)', password: 'RITA1203' },
      { name: 'St. Philomena', pin: '0124', strand: 'HUMSS (Humanities and Social Sciences)', password: 'PHIL1204' },
      { name: 'St. Teresa de Avila', pin: '0125', strand: 'HUMSS (Humanities and Social Sciences)', password: 'TERE1205' },
      { name: 'St. Agatha', pin: '0126', strand: 'TVL (Technical-Vocational-Livelihood)', password: 'AGAT1206' },
      { name: 'St. Gertrude', pin: '0127', strand: 'ABM (Accountancy and Business Management)', password: 'GERT1207' }
    ]
  }
};

module.exports = sectionData;
