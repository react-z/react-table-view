/** @jsx React.DOM */

var React = require('react');
var SecondsTohhmmss = require('../js/SecondsTohhmmss.js');

/**
 * Table view module
 * A simple sortable table component.
**/

var TableView = React.createClass({
  getInitialState: function(){
     return {
       data: this.props.data,
       fields: [],
       sortField: ''
     }
  },
  /**
   * Parse the fields from the table data
  **/
  parseFields: function() {
    // can use Object.keys(data)[0]; for this
    for(var d in this.props.data) {
      if(this.props.data.hasOwnProperty(d)){
        var data = this.props.data[d];
        var fieldsArray = []
        for(var i in data){
          console.log(i + data[i]);
          fieldsArray.push(i);
        }
        this.setState({ fields: fieldsArray });
      }
    }
  },
  sort: function (e) {
    // get the selected field
    var field = e.target.getAttribute("data-field-name");
    if(field === null){
      field = e.target.parentNode.getAttribute("data-field-name");
    }

    // get the current sort direction
    var sortDirection = "DESC";
    if(this.refs[field].getDOMNode().className === "sort-down"){
      sortDirection = "ASC";
    }

    // clear all field sort classes
    for(var i = 0; i < this.state.fields.length; i++){
      var fieldName = this.state.fields[i];
      this.refs[fieldName].getDOMNode().className = "";
    }

    // sort by field and direction
    this.sortByField(field, sortDirection);

  },
  sortByField: function (field, direction) {
    // set sortField for compare function
    this.setState({ sortField: field });
    this.state.sortField = field;

    var data = this.state.data;    
    data.sort(this.compare);

    if(direction === "ASC"){
      this.refs[field].getDOMNode().className = "sort-up";
      data.reverse();
    } else {
      this.refs[field].getDOMNode().className = "sort-down";
    }
    this.setState({ data: data });
  },

  compare: function(a,b) {
    if (a[this.state.sortField] < b[this.state.sortField])
       return -1;
    if (a[this.state.sortField] > b[this.state.sortField])
      return 1;
    return 0;
  },
  componentDidMount: function() {
    this.parseFields();
  },
  componentWillUnmount: function() {
  },  
  render: function(){
    return (

      <div className="react-table-view">

        <table>
            <thead>
                <tr>
                {
                  this.state.fields.map(function(f) {
                    return <th onClick={this.sort} data-field-name={f}>
                        <span>{f}</span>
                        <div ref={f}></div>
                      </th>
                    ;
                  }.bind(this))
                }

                </tr>
            </thead>

            <tbody>

            {
              this.props.data.map(function(d) {
               return <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.make}</td>
                    <td>{d.model}</td>
                    <td>{d.year}</td>
                </tr>
               ;
             })
             }

            </tbody>
        </table>
      
      </div>

    );
  }
});

module.exports = TableView;