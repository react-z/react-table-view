# react-table-view

[![npm version](https://badge.fury.io/js/react-table-view.svg)](https://badge.fury.io/js/react-table-view)

![](https://raw.githubusercontent.com/StevenIseki/react-table-view/master/example/screenshot.gif)

react-table-view is a simple table-view component using react.

## Installation

`yarn add react-table-view`

## Usage

```javascript
import TableView from 'react-table-view'
import ReactDOM from 'react-dom'
import React, { Component } from 'react'

class TestComponent extends Component {
  render() {
    /* must ensure all of your fields have values */
    const DATA = [
      { id: 0, make: 'Honda', model: 'NSX', year: '1997' },
      { id: 1, make: 'Toyota', model: 'Supra', year: '1996' },
      { id: 2, make: 'Nissan', model: '300ZX', year: '1998' }
    ]
    /* define the look of each column, OPTIONAL */
    let COLUMNS = {
      make: function(data) {
        return <span>What an awesome year: {data.year}</span>
      },
      model: function(data) {
        return <a>{data.model}</a>
      },
      year: function(data) {
        return (
          <p style={{textAlign: 'left', margin: '0 4px'}}>
            {`Id: ${data.id}`}
            <br />
            {`Year: ${data.year}`}
          </p>
        )
      }
    }

    return (
      <div>
        <TableView data={DATA} columns={COLUMNS} />
      </div>
    )
  }
}

ReactDOM.render(<TestComponent />, document.getElementById('root'))
```

## Styles

react-table-view uses uses styled-components 💅 for the base styling.

## Development
    yarn
    yarn dev

## Test
    yarn test

## Build
    yarn
    yarn build

## Publish
    npm login
    npm version patch
    git add -A
    git push origin master
    npm publish

## License

[MIT](http://isekivacenz.mit-license.org/)
