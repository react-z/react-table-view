"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  margin: 0;\n  padding: 20px;\n  font-size: 150%;\n  font-style: italic;\n  line-height: 1.5;\n\n  table {\n    border-collapse: collapse;\n    border-spacing: 0;\n    border: 1px solid #cbcbcb;\n    empty-cells: show;\n    color: #666;\n    text-shadow: 1px 1px 0px #fff;\n    background: #eaebec;\n    margin: 15px;\n  }\n  table th {\n    padding: 10px;\n    border-top: 1px solid #fafafa;\n    border-bottom: 1px solid #e0e0e0;\n  }\n  table tr {\n    text-align: center;\n    padding-left: 10px;\n  }\n  table td {\n    padding: 5px;\n    border-top: 1px solid #ffffff;\n    border-bottom: 1px solid #e0e0e0;\n    border-left: 1px solid #e0e0e0;\n    background: #fafafa;\n  }\n\n  i {\n    border: solid #666;\n    border-width: 0 2px 2px 0;\n    display: inline-block;\n    margin-left: 5px;\n    padding: 3px;\n    opacity: 0;\n  }\n\n  .up {\n    opacity: 1;\n    transform: rotate(-135deg);\n    -webkit-transform: rotate(-135deg);\n  }\n\n  .down {\n    opacity: 1;\n    transform: rotate(45deg);\n    -webkit-transform: rotate(45deg);\n  }\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Table view module
 * A simple sortable table component.
 **/
var TableView =
/*#__PURE__*/
function (_Component) {
  _inherits(TableView, _Component);

  function TableView(props) {
    var _this;

    _classCallCheck(this, TableView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TableView).call(this, props));
    _this.state = {
      data: _this.props.data,
      fields: [],
      sortField: ''
    };
    return _this;
  }

  _createClass(TableView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.parseFields();
    }
  }, {
    key: "parseFields",
    value: function parseFields() {
      for (var d in this.props.data) {
        if (this.props.data.hasOwnProperty(d)) {
          var data = this.props.data[d];
          var fieldsArray = [];

          for (var i in data) {
            fieldsArray.push(i);
          }

          this.setState({
            fields: fieldsArray
          });
        }
      }
    }
  }, {
    key: "sort",
    value: function sort(e) {
      /* get the selected field */
      var field = e.target.getAttribute('data-field-name');

      if (field === null) {
        field = e.target.parentNode.getAttribute('data-field-name');
      }
      /* get the current sort direction */


      var sortDirection = 'DESC';

      var $elem = _reactDom.default.findDOMNode(this.refs[field]);

      if ($elem.className === 'down') {
        sortDirection = 'ASC';
      }
      /* clear all field sort classes */


      for (var i = 0; i < this.state.fields.length; i++) {
        var $fieldElem = _reactDom.default.findDOMNode(this.refs[this.state.fields[i]]);

        $fieldElem.className = '';
      }

      this.sortByField(field, sortDirection);
    }
  }, {
    key: "sortByField",
    value: function sortByField(field, direction) {
      /* set sortField for compare function */
      this.setState({
        sortField: field
      });
      var data = this.state.data;
      data.sort(this.compare.bind(this));

      var $elem = _reactDom.default.findDOMNode(this.refs[field]);

      if (direction === 'ASC') {
        $elem.className = 'up';
        data.reverse();
      } else {
        $elem.className = 'down';
      }

      this.setState({
        data: data
      });
    }
  }, {
    key: "compare",
    value: function compare(a, b) {
      if (a[this.state.sortField] < b[this.state.sortField]) return -1;
      if (a[this.state.sortField] > b[this.state.sortField]) return 1;
      return 0;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var columns = this.props.columns;
      var fields = this.state.fields;
      return _react.default.createElement(TableViewWrapper, null, _react.default.createElement("table", null, _react.default.createElement("thead", null, _react.default.createElement("tr", null, this.state.fields.map(function (f, i) {
        return _react.default.createElement("th", {
          key: i,
          onClick: _this2.sort.bind(_this2),
          "data-field-name": f
        }, _react.default.createElement("span", null, f), _react.default.createElement("i", {
          ref: f
        }));
      }))), _react.default.createElement("tbody", null, this.props.data.map(function (d, i) {
        return _react.default.createElement("tr", {
          key: i
        }, fields.map(function (f, j) {
          if (columns && columns[f]) {
            return _react.default.createElement("td", {
              key: j
            }, columns[f](d));
          } else {
            return _react.default.createElement("td", {
              key: j
            }, d[f]);
          }
        }));
      }))));
    }
  }]);

  return TableView;
}(_react.Component);

exports.default = TableView;

var TableViewWrapper = _styledComponents.default.div(_templateObject());