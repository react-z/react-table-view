"use strict";

var _enzyme = require("enzyme");

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _TableView = _interopRequireDefault(require("../TableView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* setup enzyme */
(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact.default()
});
/* setup jsdom */

var jsdom = require('jsdom');

var JSDOM = jsdom.JSDOM;
var window = new JSDOM('').window;
global.window = window;
global.document = window.document;
test('TableView renders correctly and matches snapshot', function () {
  var DATA = [{
    id: 0,
    make: 'Honda',
    model: 'NSX',
    year: '1997'
  }, {
    id: 1,
    make: 'Toyota',
    model: 'Supra',
    year: '1996'
  }, {
    id: 2,
    make: 'Nissan',
    model: '300ZX',
    year: '1998'
  }];
  var COLUMNS = {
    make: function make(data) {
      return _react.default.createElement("span", null, "What an awesome year: ", data.year);
    },
    model: function model(data) {
      return _react.default.createElement("a", null, data.model);
    },
    year: function year(data) {
      return _react.default.createElement("p", {
        style: {
          textAlign: 'left',
          margin: '0 4px'
        }
      }, "Id: ".concat(data.id), _react.default.createElement("br", null), "Year: ".concat(data.year));
    }
  };

  var component = _reactTestRenderer.default.create(_react.default.createElement(_TableView.default, {
    data: DATA,
    columns: COLUMNS
  }));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableView renders the correct elements and props', function () {
  var DATA = [{
    id: 0,
    make: 'Honda',
    model: 'NSX',
    year: '1997'
  }, {
    id: 1,
    make: 'Toyota',
    model: 'Supra',
    year: '1996'
  }, {
    id: 2,
    make: 'Nissan',
    model: '300ZX',
    year: '1998'
  }];
  var COLUMNS = {
    make: function make(data) {
      return _react.default.createElement("span", null, "What an awesome year: ", data.year);
    },
    model: function model(data) {
      return _react.default.createElement("a", null, data.model);
    },
    year: function year(data) {
      return _react.default.createElement("p", {
        style: {
          textAlign: 'left',
          margin: '0 4px'
        }
      }, "Id: ".concat(data.id), _react.default.createElement("br", null), "Year: ".concat(data.year));
    }
  };
  var wrapper = (0, _enzyme.shallow)(_react.default.createElement(_TableView.default, {
    data: DATA,
    columns: COLUMNS
  }));
  expect(wrapper.instance().props.columns).toEqual(COLUMNS);
  expect(wrapper.find('table').length).toEqual(1);
  expect(wrapper.find('thead').length).toEqual(1);
  expect(wrapper.find('tbody').length).toEqual(1);
  var heading = wrapper.find('thead th span').first();
  expect(heading.text()).toEqual('id');
  var column = wrapper.find('tbody td p').first();
  expect(column.text()).toContain('Year: 1997'); // console.log(wrapper.debug())
});