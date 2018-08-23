const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')
const uniq = require('lodash/uniq')

const config = require(path.join(__dirname, '../config.json'))
const signatures = require(path.join(__dirname, '../assets/data/signatures.json'))
const states = require(path.join(__dirname, '../assets/data/states.json'))

// font styles
const headerFont = path.join(__dirname, '../assets/fonts/Montserrat-Black.ttf')
const bodyFont = path.join(__dirname, '../assets/fonts/OpenSans-Regular.ttf')
const headerFontSize = 34
const subheaderFontSize = 16
const bodyFontSize = 11

function createPDF(selectedState) {
  const stateSigs = signatures[selectedState.abbr]

  // open write stream to file
  const doc = new PDFDocument()
  doc.pipe(fs.createWriteStream(path.join(__dirname, `../static/pdfs/${selectedState.abbr.toLowerCase()}.pdf`)))

//-- PAGE 1: Title Page
  doc
    .font(headerFont)
    .fontSize(headerFontSize)
    .text('Veterans support net neutrality'.toUpperCase(), { align: 'center' })
    .moveDown()

  doc
    .font(bodyFont)
    .fontSize(bodyFontSize)
    .text(`${config.signatureCount} US Veterans support the CRA to block the FCC's repeal of net neutrality.\n\n${stateSigs.length} veterans in ${selectedState.name} support the CRA to block the FCC's repeal of net neutrality.`, { align: 'center' })


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
    .text(config.letterToCongress.trim())

  //-- PAGE 3+: Signature list

  // create a list of states with signatures, sorted alphabetically but with
  // the selected state first
  let statesWithSigs = Object.keys(signatures).filter(abbr => signatures[abbr].length > 0)
  statesWithSigs.sort()

  if (stateSigs.length > 0) {
    statesWithSigs.unshift(selectedState.abbr)
  }

  // draw business lists by state
  for (let state of statesWithSigs) {
    const stateName = states[state]

    // start a new page and draw state header
    doc
      .addPage()
      .font(headerFont)
      .fontSize(subheaderFontSize)
      .text(stateName.toUpperCase())
      .moveDown(0.5)

    // draw signatures in 2 columns
    doc
      .font(bodyFont)
      .fontSize(bodyFontSize)
      .text(signatures[state].map(name => `• ${name}`).join('\n'), { columns: 2 })
      .moveDown(2.0)
  }

  // all done
  doc.end()
}

if (process.argv[2]) {
  const abbr = process.argv[2].toUpperCase()
  const name = states[abbr]

  if (name) {
    createPDF({ name: name, abbr: abbr })
    console.log(`Created ${abbr.toLowerCase()}.pdf`)
  }
  else {
    return console.error(`Invalid state: ${abbr}`)
  }
}
else {
  for (let abbr of Object.keys(states)) {
    console.log({ name: states[abbr], abbr: abbr })
    createPDF({ name: states[abbr], abbr: abbr })
    console.log(`Created ${abbr.toLowerCase()}.pdf`)
  }
}
