// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const ExcelJs = require('exceljs')
const is = require('is')

const repo = exports

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

repo.strategys = [{
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  strategys: async function (file) {
    const workbook = new ExcelJs.Workbook()
    const books = await workbook.xlsx.readFile(file.path)
    const result = {
      name: file.name,
      content: []
    }
    books.worksheets.forEach(sheet => {
      const ret = {
        sheet: sheet.name,
        rows: []
      }
      sheet.eachRow(function (row, rowNumber) {
        ret.rows.push(row.values)
      })
      result.content.push(ret)
    })
    return result
  }
}]
