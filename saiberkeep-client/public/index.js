"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ndefRead = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ndefRead = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ndef) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return ndef.scan();

          case 3:
            nfcStatusP.innerText = 'Sync started';
            ndef.addEventListener("readingerror", function () {
              nfcStatusP.innerText = 'Error reading data from implant/card';
            });
            ndef.addEventListener("reading", function (_ref2) {
              var nfcMessageData = _ref2.nfcMessageData,
                  serialNumber = _ref2.serialNumber;
              nfcStatusP.innerText = nfcMessageData;
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            nfcStatusP.innerText = 'Error: ' + _context.t0;

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function ndefRead(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.ndefRead = ndefRead;