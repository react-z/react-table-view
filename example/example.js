var React = require('react');
var TableView = require('../jsx/table-view.jsx');

var OPTIONS = { prefix: 'seconds elapsed!', delay: 100}

React.render(
	React.createElement(
		TableView, 
		{options: OPTIONS}
	),
	document.getElementById("container")
);
