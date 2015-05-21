var React = require('react');
var TableView = require('../jsx/table-view.jsx');

// must ensure all of your fields have values or react table view will not render
var DATA = [ 
  { id: 0, make: 'Honda', model: 'NSX', year: '1997'},
  { id: 1, make: 'Toyota', model: 'Supra', year: '1996'},
  { id: 2, make: 'Nissan', model: '300ZX', year: '1998'}
]

var formatHanlder={
	make: function(data) {
		return <div className="formatHanlder"><a href="javascript:void(0);">{data.id}+{data.year}</a></div>;
	},
	model: function(data) {
		return data.model;
	}
}

React.render(
	React.createElement(
		TableView, 
		{data: DATA,formatHanlder:formatHanlder}
	),
	document.getElementById("container")
);
