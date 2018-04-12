const Promise = require('bluebird')
const GoogleSpreadsheet = require('google-spreadsheet')
const fs = require('fs')
const path = require('path')

require('dotenv').config()

const dataFile = path.resolve(__dirname, '../assets/data/businesses.json')

const googleCreds = {
  type: 'service_account',
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\[NL\]/g, "\n"),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://accounts.google.com/o/oauth2/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/editor%40business-data-munger.iam.gserviceaccount.com"
}

async function main() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID)
  const setAuth = Promise.promisify(doc.useServiceAccountAuth)
  const getRows = Promise.promisify(doc.getRows)
  const worksheet = 1

  await setAuth(googleCreds)
  const rows = await getRows(worksheet)
  const verifiedRows = rows.filter(r => r.verified && r.verified.toUpperCase() === 'Y')

  const businesses = verifiedRows.map(row => {
    let zip = row.zipcode.trim()
    
    if (zip.length === 4) {
      zip = `0${zip}`
    }

    return {
      name: row.company.trim(),
      city: row.city.trim(),
      state: row.state.trim(),
      zip_code: zip
    }
  })

  const unique = {}

  for (let biz of businesses) {
    const key = `${biz.name}${biz.city}`.toLowerCase()

    if (!unique[key]) {
      unique[key] = biz
    }
  }

  const sorted = Object.values(unique).sort((a, b) => a.name - b.name)

  fs.writeFileSync(dataFile, JSON.stringify(sorted, null, 2))
}

main().catch(console.error)