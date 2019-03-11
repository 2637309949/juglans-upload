"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const ExcelJs = require('exceljs');

const is = require('is');

const repo = exports;

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

repo.strategys = [{
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  strategys: function () {
    var _ref = _asyncToGenerator(function* (file) {
      const workbook = new ExcelJs.Workbook();
      const books = yield workbook.xlsx.readFile(file.path);
      const result = {
        name: file.name,
        content: []
      };
      books.worksheets.forEach(sheet => {
        const ret = {
          sheet: sheet.name,
          rows: []
        };
        sheet.eachRow(function (row, rowNumber) {
          ret.rows.push(row.values);
        });
        result.content.push(ret);
      });
      return result;
    });

    return function strategys(_x) {
      return _ref.apply(this, arguments);
    };
  }()
}];