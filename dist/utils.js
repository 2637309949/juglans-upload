"use strict";

const is = require('is');

const repo = exports;
/**
   * Generate string
   * @param {number} number
   */

repo.randomStr = function () {
  let number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
  let text = '';

  if (is.number(number)) {
    const CARDINALSTR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < number; i++) {
      text += CARDINALSTR.charAt(Math.floor(Math.random() * CARDINALSTR.length));
    }
  }

  return text;
};