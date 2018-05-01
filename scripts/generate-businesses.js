const Promise = require('bluebird')
const GoogleSpreadsheet = require('google-spreadsheet')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

require('dotenv').config()

const dataFile = path.resolve(__dirname, '../static/businesses.json')
const configFile = path.resolve(__dirname, '../config.json')

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

function md5(str) {
  return crypto.createHash('md5').update(str).digest("hex")
}

async function main() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID)
  const setAuth = Promise.promisify(doc.useServiceAccountAuth)
  const getRows = Promise.promisify(doc.getRows)
  const worksheet = 1

  await setAuth(googleCreds)
  const rows = await getRows(worksheet)
  const verifiedRows = rows.filter(r => r.verified && (r.verified.toUpperCase() === 'Y' || r.verified === '*'))

  const businesses = verifiedRows.map(row => {
    let zip = row.zipcode.trim()

    if (zip.length === 4) {
      zip = `0${zip}`
    }

    return {
      id: md5([row.company, row.city, row.state].join('')),
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

  const sorted = Object.values(unique).sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1
    }
    else if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1
    }
    return 0
  })

  fs.writeFileSync(dataFile, JSON.stringify(sorted, null, 2))

  // update config with new signature count
  const config = require(configFile)
  config.signatureCount = sorted.length
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2))
}

main().catch(console.error)
