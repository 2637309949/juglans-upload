/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-09 16:55:19
 * @modify date 2019-01-09 16:55:19
 * @desc [upload]
 */
const assert = require('assert').strict
const utils = require('./utils')
const path = require('path')
const is = require('is')

module.exports = ({ urlPrefix = '/upload', deliveryPath = '/public/upload', saveAnalysis, findAnalysis }) => async ({ router }) => {
  assert.ok(is.function(saveAnalysis), 'saveAnalysis can not be empty!')
  assert.ok(is.function(findAnalysis), 'findAnalysis can not be empty!')
  assert.ok(is.string(deliveryPath), 'deliveryPath can not be empty!')
  assert.ok(is.string(urlPrefix), 'urlPrefix can not be empty!')
  router.post(urlPrefix, async (ctx) => {
    try {
      const files = ctx.request.files
      const fields = ctx.request.body
      const { toAnalysis } = fields
      const fileNames = Object.keys(files)
      const results = []
      const data = await Promise.all(fileNames.map(async x => {
        const fileName = x
        const file = files[fileName]
        const parse = path.parse(file.path)
        const { strategys } = module.exports.strategys.find(x => x.type === file.type) || {}
        const ret = {
          uid: utils.randomStr(32).toLowerCase(),
          name: file.name,
          type: file.type,
          status: 'done',
          url: `${deliveryPath}/${parse.base}`
        }
        if (toAnalysis && strategys) {
          const result = await strategys(file)
          results.push(Object.assign({}, ret, result))
        }
        return ret
      }))

      if (toAnalysis) {
        saveAnalysis(results)
      }
      ctx.status = 200
      ctx.body = data
    } catch (error) {
      console.error(error.stack)
      ctx.body = { message: error.message }
    }
  })
  return {
    upload: {
      findAnalysis
    }
  }
}

module.exports.strategys = utils.strategys
