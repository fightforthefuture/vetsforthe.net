const Promise = require('bluebird')
const GoogleSpreadsheet = require('google-spreadsheet')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const uniq = require('lodash/uniq')
const startCase = require('lodash/startCase')
const sortBy = require('lodash/sortBy')
const states = require('../assets/data/states')

require('dotenv').config()

const dataFile = path.resolve(__dirname, '../assets/data/signatures.json')
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

  await setAuth(googleCreds)

  const signaturesSheet = 1
  const rows = await getRows(signaturesSheet)
  const verifiedRows = rows.filter(r => r.verified && (r.verified.toUpperCase() === 'Y' || r.verified === '*'))

  const branchesSheet = 2
  const branchRows = await getRows(branchesSheet)
  const branchMap = {}

  for (let row of branchRows ) {
    if (row.normalizedvalue) {
      branchMap[row.userentry] = row.normalizedvalue
    }
  }

  let signatures = {}
  let signatureCount = 0

  for (let state of Object.keys(states)) {
    signatures[state] = []
  }

  const sortedByBranch = sortBy(verifiedRows, row => {
    return branchMap[row.branchofservice]
  }).reverse()

  const dedupedBySig = {}
  sortedByBranch.forEach(row => dedupedBySig[row.signatureid] = row)

  const dedupedByEmail = {}
  Object.values(dedupedBySig).forEach(row => dedupedByEmail[row.email] = row)

  const dedupedRows = Object.values(dedupedByEmail)

  for (let row of dedupedRows) {
    const branchOfService = branchMap[row.branchofservice]
    const stateAbbr = row.state.trim()

    if (branchOfService && stateAbbr) {
      signatures[stateAbbr].push(
        `${startCase(row.name.toLowerCase().trim())}, ${branchOfService}`
      )
    }
  }

  for (let state of Object.keys(signatures)) {
    signatures[state] = uniq(signatures[state]).sort()
    signatureCount += signatures[state].length
  }

  fs.writeFileSync(dataFile, JSON.stringify(signatures, null, 2))

  // update config with new signature count
  const config = require(configFile)
  config.signatureCount = signatureCount
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2))
}

main().catch(console.error)
