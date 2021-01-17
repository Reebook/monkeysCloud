
const { expressPort } = require('enviroment')

const Express = require('express')
const App = Express()

App.use(Express.urlencoded({ extended: true }))

App.use(Express.json())

// Index route
App.get('/', (req, res) => {
  return res.json({ message: `im running on port ${expressPort}` })
})

App.listen(Number(expressPort))

module.exports = App
