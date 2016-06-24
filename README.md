# react-table-view

react-table-view is a simple table-view component using react.

## Installation

`npm install react-table-view --save`

## Usage

```javascript
import TableView from 'react-table-view'
import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'

class TestComponent extends Component {

  render () {
    /* must ensure all of your fields have values */
    const DATA = [
      { id: 0, make: 'Honda', model: 'NSX', year: '1997'},
      { id: 1, make: 'Toyota', model: 'Supra', year: '1996'},
      { id: 2, make: 'Nissan', model: '300ZX', year: '1998'}
    ]
    /* define the look of each column, OPTIONAL */
    let COLUMNS = {
    	make: function(data) {
    	  return <span>What an awesome year: {data.year}</span>
    	},
    	model: function(data) {
    	  return <a href="#">{data.model}</a>;
    	},
    	year: function(data) {
    	  return <h3>hey man {data.id} </h3>;
    	}
    }

    return (
      <div>
        <TableView data={DATA} columns={COLUMNS} />
      </div>
    )
  }
}

ReactDOM.render( <TestComponent />, document.getElementById('root') )
```

## Styles

react-table-view can be used with your own custom styles. A minimal [table.css](https://github.com/StevenIseki/react-table-view/blob/master/example/public/table.css) style sheet is included as a guide.

## Development

    npm install
    npm run build
    npm test
    npm start

## License

[MIT](http://isekivacenz.mit-license.org/)
