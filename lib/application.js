// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const assert = require('assert').strict
const utils = require('./utils')
const koaBody = require('koa-body')
const path = require('path')
const is = require('is')

module.exports = ({
  prefix = '/upload',
  assetsPrefix = '/public/upload',
  uploadPrefix = path.join(__dirname, '../assets/public/upload'),
  bodyOptions = {
    multipart: true,
    formidable: {
      keepExtensions: true,
      uploadDir: uploadPrefix
    }
  },
  save = async (c, ret) => {}
} = {}) => async ({ router }) => {
  assert.ok(is.string(prefix), 'prefix can not be empty!')
  assert.ok(is.string(assetsPrefix), 'assetsPath can not be empty!')
  assert.ok(is.string(uploadPrefix), 'uploadPrefix can not be empty!')
  assert.ok(is.function(save), 'save should be function!')
  router.post(prefix, koaBody(bodyOptions), async (ctx) => {
    try {
      const files = ctx.request.files
      const ret = []
      for (const filename in files) {
        if (files.hasOwnProperty(filename)) {
          const file = files[filename]
          const parse = path.parse(file.path)
          const fileInfo = {
            uuid: utils.randomStr(32).toLowerCase(),
            status: 'done',
            name: file.name,
            size: file.size,
            url: `${assetsPrefix}/${parse.base}`
          }
          ret.push(fileInfo)
        }
      }
      if (save !== null) {
        await save(ctx, ret)
      }
      ctx.status = 200
      ctx.body = ret
    } catch (error) {
      console.error(error.stack)
      ctx.body = { message: error.message }
    }
  })
}
