import React, { Component, PropTypes } from 'react'

/**
 * Table view module
 * A simple sortable table component.
**/
export default class TableView extends Component {

  constructor (props) {
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
    for(const d in this.props.data) {
      if(this.props.data.hasOwnProperty(d)){
        const data = this.props.data[d];
        const fieldsArray = [];
        for(const i in data){
          fieldsArray.push(i);
        }
        this.setState({ fields: fieldsArray });
      }
    }
  }

  sort(e) {
    /* get the selected field */
    let field = e.target.getAttribute("data-field-name");
    if(field === null){
      field = e.target.parentNode.getAttribute("data-field-name");
    }
    /* get the current sort direction */
    let sortDirection = "DESC";
    if(this.refs[field].getDOMNode().className === "sort-down"){
      sortDirection = "ASC";
    }
    /* clear all field sort classes */
    for(let i = 0; i < this.state.fields.length; i++){
      const fieldName = this.state.fields[i];
      this.refs[fieldName].getDOMNode().className = "";
    }
    this.sortByField(field, sortDirection);
  }

  sortByField(field, direction) {
    /* set sortField for compare function */
    this.setState({ sortField: field });
    this.state.sortField = field;
    let data = this.state.data;
    data.sort(this.compare);

    if(direction === "ASC"){
      this.refs[field].getDOMNode().className = "sort-up";
      data.reverse();
    } else {
      this.refs[field].getDOMNode().className = "sort-down";
    }
    this.setState({ data });
  }

  compare(a,b) {
    if (a[this.state.sortField] < b[this.state.sortField])
       return -1;
    if (a[this.state.sortField] > b[this.state.sortField])
      return 1;
    return 0;
  }

  render() {
    let { columns } = this.props
    let { fields } = this.state

    return (
      <div className="react-table-view">
        <table>
            <thead>
                <tr>
                {
                  this.state.fields.map( (f, i) => (
                    <th key={i} onClick={this.sort.bind(this)} data-field-name={f}>
                      <span>{f}</span>
                      <div ref={f}></div>
                    </th>
                  ))
                }
                </tr>
            </thead>
            <tbody>
               {
                this.props.data.map(function(d) {
                  return <tr key={d.id}>{
                      fields.map(function(f) {
                        if(columns && columns[f]) {
                          return <td>{columns[f](d)}</td>
                        } else {
                          return <td>{d[f]}</td>
                        }
                      })
                  }
                  </tr>
               })
             }
            </tbody>
        </table>
      </div>
    )
  };
}
