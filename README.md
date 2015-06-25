# react-table-view

react-table-view is a simple table-view component using react.js.

![](example/screenshot.png)

## Installation

`npm install react-table-view --save`

## Usage

```javascript

var React = require('react');
var TableView = require('react-table-view');

var DATA = [ 
  { id: 0, make: 'Honda', model: 'NSX', year: '1997'},
  { id: 1, make: 'Toyota', model: 'Supra', year: '1996'},
  { id: 2, make: 'Nissan', model: '300ZX', year: '1998'}
]

// Override the default display for each column, OPTIONAL

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
    <TableView data={DATA} columns={COLUMNS} />,
    document.getElementById("container")
);

```

## Styles

react-table-view can be used with your own custom styles. A minimal table-view.css style sheet is included as a guide.

## Development

Initial set up, run:
    
    npm install


## License

[MIT](http://isekivacenz.mit-license.org/)
