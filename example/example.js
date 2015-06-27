import React from 'react'
import TableView from '../lib/table-view'

// must ensure all of your fields have values
let DATA = [ 
  { id: 0, make: 'Honda', model: 'NSX', year: '1997'},
  { id: 1, make: 'Toyota', model: 'Supra', year: '1996'},
  { id: 2, make: 'Nissan', model: '300ZX', year: '1998'}
]

// define the look of each column, OPTIONAL
let COLUMNS = {
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
	<TableView data={DATA} columns={COLUMNS} />,
	document.getElementById("container")
);
