import TableView from '../lib/TableView' // 'react-table-view'
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
