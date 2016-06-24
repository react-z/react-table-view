'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Table view module
 * A simple sortable table component.
**/

var TableView = function (_Component) {
  _inherits(TableView, _Component);

  function TableView(props) {
    _classCallCheck(this, TableView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TableView).call(this, props));

    _this.state = {
      data: _this.props.data,
      fields: [],
      sortField: ''
    };
    return _this;
  }

  _createClass(TableView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.parseFields();
    }
  }, {
    key: 'parseFields',
    value: function parseFields() {
      for (var d in this.props.data) {
        if (this.props.data.hasOwnProperty(d)) {
          var data = this.props.data[d];
          var fieldsArray = [];
          for (var i in data) {
            fieldsArray.push(i);
          }
          this.setState({ fields: fieldsArray });
        }
      }
    }
  }, {
    key: 'sort',
    value: function sort(e) {
      /* get the selected field */
      var field = e.target.getAttribute("data-field-name");
      if (field === null) {
        field = e.target.parentNode.getAttribute("data-field-name");
      }
      /* get the current sort direction */
      var sortDirection = "DESC";
      if (this.refs[field].getDOMNode().className === "sort-down") {
        sortDirection = "ASC";
      }
      /* clear all field sort classes */
      for (var i = 0; i < this.state.fields.length; i++) {
        var fieldName = this.state.fields[i];
        this.refs[fieldName].getDOMNode().className = "";
      }
      this.sortByField(field, sortDirection);
    }
  }, {
    key: 'sortByField',
    value: function sortByField(field, direction) {
      /* set sortField for compare function */
      this.setState({ sortField: field });
      this.state.sortField = field;
      var data = this.state.data;
      data.sort(this.compare);

      if (direction === "ASC") {
        this.refs[field].getDOMNode().className = "sort-up";
        data.reverse();
      } else {
        this.refs[field].getDOMNode().className = "sort-down";
      }
      this.setState({ data: data });
    }
  }, {
    key: 'compare',
    value: function compare(a, b) {
      if (a[this.state.sortField] < b[this.state.sortField]) return -1;
      if (a[this.state.sortField] > b[this.state.sortField]) return 1;
      return 0;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var columns = this.props.columns;
      var fields = this.state.fields;


      return _react2.default.createElement(
        'div',
        { className: 'react-table-view' },
        _react2.default.createElement(
          'table',
          null,
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              this.state.fields.map(function (f, i) {
                return _react2.default.createElement(
                  'th',
                  { ley: i, onClick: _this2.sort.bind(_this2), 'data-field-name': f },
                  _react2.default.createElement(
                    'span',
                    null,
                    f
                  ),
                  _react2.default.createElement('div', { ref: f })
                );
              })
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            this.props.data.map(function (d) {
              return _react2.default.createElement(
                'tr',
                { key: d.id },
                fields.map(function (f) {
                  if (columns && columns[f]) {
                    return _react2.default.createElement(
                      'td',
                      null,
                      columns[f](d)
                    );
                  } else {
                    return _react2.default.createElement(
                      'td',
                      null,
                      d[f]
                    );
                  }
                })
              );
            })
          )
        )
      );
    }
  }]);

  return TableView;
}(_react.Component);

exports.default = TableView;