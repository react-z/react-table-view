'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Table view module
 * A simple sortable table component.
**/
var TableView = _react2.default.createClass({
  getInitialState: function getInitialState() {
    return {
      data: this.props.data,
      fields: [],
      sortField: ''
    };
  },
  parseFields: function parseFields() {
    // can use Object.keys(data)[0]; for this
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
  },
  sort: function sort(e) {
    // get the selected field
    var field = e.target.getAttribute("data-field-name");
    if (field === null) {
      field = e.target.parentNode.getAttribute("data-field-name");
    }

    // get the current sort direction
    var sortDirection = "DESC";
    if (this.refs[field].className === "sort-down") {
      sortDirection = "ASC";
    }

    // clear all field sort classes
    for (var i = 0; i < this.state.fields.length; i++) {
      var fieldName = this.state.fields[i];
      this.refs[fieldName].className = "";
    }

    // sort by field and direction
    this.sortByField(field, sortDirection);
  },
  sortByField: function sortByField(field, direction) {
    // set sortField for compare function
    this.setState({ sortField: field });
    this.state.sortField = field;

    var data = this.state.data;
    data.sort(this.compare);

    if (direction === "ASC") {
      this.refs[field].className = "sort-up";
      data.reverse();
    } else {
      this.refs[field].className = "sort-down";
    }
    this.setState({ data: data });
  },

  compare: function compare(a, b) {
    if (a[this.state.sortField] < b[this.state.sortField]) return -1;
    if (a[this.state.sortField] > b[this.state.sortField]) return 1;
    return 0;
  },
  componentDidMount: function componentDidMount() {
    this.parseFields();
  },
  render: function render() {
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
            this.state.fields.map((function (f) {
              return _react2.default.createElement(
                'th',
                { key: f, onClick: this.sort, 'data-field-name': f },
                _react2.default.createElement(
                  'span',
                  null,
                  f
                ),
                _react2.default.createElement('div', { ref: f })
              );
            }).bind(this))
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
                    { key: d.id + '_' + f },
                    columns[f](d)
                  );
                } else {
                  return _react2.default.createElement(
                    'td',
                    { key: d.id + '_' + f },
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
});

module.exports = TableView;