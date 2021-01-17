
const axios = require('axios').default
const assert = require('assert').strict

/* Here is where the test starts */
describe('Example', function () {
  /* it statement for mocha */
  it('Should make a request and get back a json document with a message',
    /* checks that the server is running by making a request */
    () => {
      axios.get('localhost:3000/').then((response) => {
        const status = response.status
        assert.deepStrictEqual(status, 200, 'invalid status')
      })
    }
  )
})
