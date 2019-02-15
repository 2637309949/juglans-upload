const is = require('is')
const repo = exports

/**
   * Generate string
   * @param {number} number
   */
repo.randomStr = function (number = 32) {
  let text = ''
  if (is.number(number)) {
    const CARDINALSTR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    for (let i = 0; i < number; i++) {
      text += CARDINALSTR.charAt(Math.floor(Math.random() * CARDINALSTR.length))
    }
  }
  return text
}
