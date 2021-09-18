'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _database2 = require('../database');

var _database3 = _interopRequireDefault(_database2);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_database) {
    _inherits(_class, _database);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'newURL',
        value: async function newURL(newData) {
            var http = newData.search("http://");
            var https = newData.search("https://");
            if (http === -1 && https === -1) {
                newData = "http://" + newData;
            }
            var findData = await this.DB.db("RedirectURL").collection("URL").findOne({ url: newData });
            if (findData === null) {
                var Data = { url: newData, short: this.getrandomURL(20), stat: 0 };
                await this.DB.db("RedirectURL").collection("URL").insertOne(Data);
                return Data.short;
            } else {
                return findData.short;
            }
        }
    }, {
        key: 'getURLstat',
        value: async function getURLstat() {
            var Data = await this.DB.db("RedirectURL").collection("URL").find({}).toArray();
            return Data;
        }
    }, {
        key: 'getURL',
        value: async function getURL(short) {
            var Data = await this.DB.db("RedirectURL").collection("URL").findOne({ short: short });
            var newvalues = { $set: { stat: Data.stat + 1 } };
            await this.DB.db("RedirectURL").collection("URL").updateOne(Data, newvalues);
            console.log('ok');
            return Data;
        }
    }, {
        key: 'getrandomURL',
        value: function getrandomURL(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
    }]);

    return _class;
}(_database3.default);

exports.default = _class;