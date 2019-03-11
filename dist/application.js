"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-09 16:55:19
 * @modify date 2019-01-09 16:55:19
 * @desc [upload]
 */
const assert = require('assert').strict;

const utils = require('./utils');

const path = require('path');

const is = require('is');

module.exports = (_ref) => {
  let {
    saveAnalysis,
    findAnalysis,
    uploadPrefix = '/public/upload'
  } = _ref;
  return (
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(function* (_ref2) {
        let {
          router
        } = _ref2;
        assert.ok(is.function(saveAnalysis), 'saveAnalysis can not be empty!');
        assert.ok(is.function(findAnalysis), 'findAnalysis can not be empty!');
        assert.ok(is.string(uploadPrefix), 'uploadPrefix can not be empty!');
        router.post('/upload',
        /*#__PURE__*/
        function () {
          var _ref4 = _asyncToGenerator(function* (ctx) {
            try {
              const files = ctx.request.files;
              const fields = ctx.request.body;
              const {
                toAnalysis
              } = fields;
              const fileNames = Object.keys(files);
              const results = [];
              const data = yield Promise.all(fileNames.map(
              /*#__PURE__*/
              function () {
                var _ref5 = _asyncToGenerator(function* (x) {
                  const fileName = x;
                  const file = files[fileName];
                  const parse = path.parse(file.path);
                  const {
                    strategys
                  } = module.exports.strategys.find(x => x.type === file.type) || {};
                  const ret = {
                    uid: utils.randomStr(32).toLowerCase(),
                    name: file.name,
                    type: file.type,
                    status: 'done',
                    url: `${uploadPrefix}/${parse.base}`
                  };

                  if (toAnalysis && strategys) {
                    const result = yield strategys(file);
                    results.push(Object.assign({}, ret, result));
                  }

                  return ret;
                });

                return function (_x3) {
                  return _ref5.apply(this, arguments);
                };
              }()));

              if (toAnalysis) {
                yield saveAnalysis(results);
              }

              ctx.status = 200;
              ctx.body = data;
            } catch (error) {
              console.error(error.stack);
              ctx.body = {
                message: error.message
              };
            }
          });

          return function (_x2) {
            return _ref4.apply(this, arguments);
          };
        }());
        return {
          upload: {
            findAnalysis
          }
        };
      });

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
};

module.exports.strategys = utils.strategys;