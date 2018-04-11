const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')
const uniq = require('lodash/uniq')

const settings = require(path.join(__dirname, '../config.json'))
const businesses = require(path.join(__dirname, '../assets/data/businesses.json'))
const states = require(path.join(__dirname, '../assets/data/states.json'))

// font styles
const headerFont = path.join(__dirname, '../assets/fonts/Montserrat-Black.ttf')
const bodyFont = path.join(__dirname, '../assets/fonts/OpenSans-Regular.ttf')
const headerFontSize = 34
const subheaderFontSize = 16
const bodyFontSize = 11

function createPDF(selectedState) {
  const localBusinesses = businesses.filter(b => b.state === selectedState.abbr)

  // open write stream to file
  const doc = new PDFDocument()
  doc.pipe(fs.createWriteStream(path.join(__dirname, `../static/pdfs/${selectedState.abbr.toLowerCase()}.pdf`)))

//-- PAGE 1: Title Page
  doc
    .font(headerFont)
    .fontSize(headerFontSize)
    .text('Small Businesses Can Save Net Neutrality'.toUpperCase(), { align: 'center' })
    .moveDown()

  doc
    .font(bodyFont)
    .fontSize(bodyFontSize)
    .text(`${businesses.length} American businesses support the CRA to block the FCC's repeal of net neutrality.\n\n${localBusinesses.length} businesses in ${selectedState.name} support the CRA to block the FCC's repeal of net neutrality.`, { align: 'center' })


//-- PAGE 2: Letter
  doc.addPage()

  const logoWidth = 300.0
  const logoX = (doc.page.width - logoWidth)/2
  doc
    .image(path.join(__dirname, '../assets/images/fftf-pdf-logo.png'), logoX, doc.page.y, { width: logoWidth })
    .moveDown(2.0)

  doc
    .font(bodyFont)
    .fontSize(bodyFontSize)
    .text(settings.letterToCongress.trim())

  //-- PAGE 3+: Business list
  doc.addPage()

  // create a list of states with businesses, sorted alphabetically but with the selected state first
  let statesWithBusinesses = uniq(businesses.map(b => b.state)).filter(s => s && s !== selectedState.abbr)
  statesWithBusinesses.sort()

  if (localBusinesses.length > 0) {
    statesWithBusinesses.unshift(selectedState.abbr)
  }

  // draw business lists by state
  for (let state of statesWithBusinesses) {
    const stateName = states[state]

    doc
      .font(headerFont)
      .fontSize(subheaderFontSize)
      .text(stateName.toUpperCase())
      .moveDown(0.1)

    const businessesInState = businesses.filter(b => b.state === state)
    for (let biz of businessesInState) {
      doc
        .font(bodyFont)
        .fontSize(bodyFontSize)
        .text(`• ${biz.name}`)
    }

    doc.moveDown()
  }

  // all done
  doc.end()
}

for (let abbr of Object.keys(states)) {
  createPDF({ name: states[abbr], abbr: abbr })
  console.log(`Created ${abbr.toLowerCase()}.pdf`)
}