
const path = require('path')

if (!process.env.NODE_ENV) {
  try {
    require('dotenv').config({
      path: path.join(__dirname, '.env')
    })
  } catch (error) {
    throw error
  }
}

const express_port = process.env.EXPRESS_PORT

const enviromentVariables = {
  expressPort: express_port || null
}

const keys = Object.keys(enviromentVariables)
keys.forEach((key) => {
  if (enviromentVariables[key] === null) {
    throw new Error(`Environment variable ${key} was not defined`)
  }
})

module.exports = enviromentVariables
