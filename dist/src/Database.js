'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongodb = require('mongodb');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);

        this.connectDB();
    }

    _createClass(_class, [{
        key: 'connectDB',
        value: async function connectDB() {
            console.log(_config2.default.DB_config.connectString);
            this.DB = await _mongodb.MongoClient.connect(_config2.default.DB_config.connectString, { useNewUrlParser: true });
        }
    }, {
        key: 'closeDB',
        value: async function closeDB() {
            this.DB.close();
        }
    }]);

    return _class;
}();

exports.default = _class;