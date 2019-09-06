"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
const assert = require('assert').strict;

const utils = require('./utils');

const koaBody = require('koa-body');

const path = require('path');

const is = require('is');

module.exports = function () {
  let {
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
    save =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(function* (c, ret) {});

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(function* (_ref2) {
        let {
          router
        } = _ref2;
        assert.ok(is.string(prefix), 'prefix can not be empty!');
        assert.ok(is.string(assetsPrefix), 'assetsPath can not be empty!');
        assert.ok(is.string(uploadPrefix), 'uploadPrefix can not be empty!');
        assert.ok(is.function(save), 'save should be function!');
        router.post(prefix, koaBody(bodyOptions),
        /*#__PURE__*/
        function () {
          var _ref4 = _asyncToGenerator(function* (ctx) {
            try {
              const files = ctx.request.files;
              const ret = [];

              for (const filename in files) {
                if (files.hasOwnProperty(filename)) {
                  const file = files[filename];
                  const parse = path.parse(file.path);
                  const fileInfo = {
                    uuid: utils.randomStr(32).toLowerCase(),
                    status: 'done',
                    name: file.name,
                    size: file.size,
                    url: `${assetsPrefix}/${parse.base}`
                  };
                  ret.push(fileInfo);
                }
              }

              if (save !== null) {
                yield save(ctx, ret);
              }

              ctx.status = 200;
              ctx.body = ret;
            } catch (error) {
              console.error(error.stack);
              ctx.body = {
                message: error.message
              };
            }
          });

          return function (_x4) {
            return _ref4.apply(this, arguments);
          };
        }());
      });

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
};