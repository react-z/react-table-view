import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

/**
 * Table view module
 * A simple sortable table component.
 **/
export default class TableView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      fields: [],
      sortField: ''
    }
  }

  componentDidMount() {
    this.parseFields()
  }

  parseFields() {
    for (const d in this.props.data) {
      if (this.props.data.hasOwnProperty(d)) {
        const data = this.props.data[d]
        const fieldsArray = []
        for (const i in data) {
          fieldsArray.push(i)
        }
        this.setState({ fields: fieldsArray })
      }
    }
  }

  sort(e) {
    /* get the selected field */
    let field = e.target.getAttribute('data-field-name')
    if (field === null) {
      field = e.target.parentNode.getAttribute('data-field-name')
    }
    /* get the current sort direction */
    let sortDirection = 'DESC'
    const $elem = ReactDOM.findDOMNode(this.refs[field])
    if ($elem.className === 'down') {
      sortDirection = 'ASC'
    }
    /* clear all field sort classes */
    for (let i = 0; i < this.state.fields.length; i++) {
      const $fieldElem = ReactDOM.findDOMNode(this.refs[this.state.fields[i]])
      $fieldElem.className = ''
    }
    this.sortByField(field, sortDirection)
  }

  sortByField(field, direction) {
    /* set sortField for compare function */
    this.setState({ sortField: field })
    const { data } = this.state
    data.sort(this.compare.bind(this))

    const $elem = ReactDOM.findDOMNode(this.refs[field])

    if (direction === 'ASC') {
      $elem.className = 'up'
      data.reverse()
    } else {
      $elem.className = 'down'
    }
    this.setState({ data })
  }

  compare(a, b) {
    if (a[this.state.sortField] < b[this.state.sortField]) return -1
    if (a[this.state.sortField] > b[this.state.sortField]) return 1
    return 0
  }

  render() {
    let { columns } = this.props
    let { fields } = this.state

    return (
      <TableViewWrapper>
        <table>
          <thead>
            <tr>
              {this.state.fields.map((f, i) => (
                <th key={i} onClick={this.sort.bind(this)} data-field-name={f}>
                  <span>{f}</span>
                  <i ref={f} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(function(d, i) {
              return (
                <tr key={i}>
                  {fields.map(function(f, j) {
                    if (columns && columns[f]) {
                      return <td key={j}>{columns[f](d)}</td>
                    } else {
                      return <td key={j}>{d[f]}</td>
                    }
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </TableViewWrapper>
    )
  }
}

const TableViewWrapper = styled.div`
  margin: 0;
  padding: 20px;
  font-size: 150%;
  font-style: italic;
  line-height: 1.5;

  table {
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #cbcbcb;
    empty-cells: show;
    color: #666;
    text-shadow: 1px 1px 0px #fff;
    background: #eaebec;
    margin: 15px;
  }
  table th {
    padding: 10px;
    border-top: 1px solid #fafafa;
    border-bottom: 1px solid #e0e0e0;
  }
  table tr {
    text-align: center;
    padding-left: 10px;
  }
  table td {
    padding: 5px;
    border-top: 1px solid #ffffff;
    border-bottom: 1px solid #e0e0e0;
    border-left: 1px solid #e0e0e0;
    background: #fafafa;
  }

  i {
    border: solid #666;
    border-width: 0 2px 2px 0;
    display: inline-block;
    margin-left: 5px;
    padding: 3px;
    opacity: 0;
  }

  .up {
    opacity: 1;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }

  .down {
    opacity: 1;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

`
