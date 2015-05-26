var React = require('react');
var TableView = require('../jsx/table-view.jsx');

// must ensure all of your fields have values or react table view will not render
var DATA = [ 
  { id: 0, make: 'Honda', model: 'NSX', year: '1997'},
  { id: 1, make: 'Toyota', model: 'Supra', year: '1996'},
  { id: 2, make: 'Nissan', model: '300ZX', year: '1998'}
]

// define the look of each column, OPTIONAL

var COLUMNS = {
	make: function(data) {
		return (
			<span>What an awesome year: {data.year}</span>
		);
	},
	model: function(data) {
		return <a href="#">{data.model}</a>;
	},
	year: function(data) {
		return <h3>hey man {data.id} </h3>;
	}
}


React.render(
	React.createElement(
		TableView, 
		{data: DATA, columns: COLUMNS }
	),
	document.getElementById("container")
);
