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
    var field = e.target.getAttribute("data-field-name");
    this.setState({ sortField: field });

    var data = this.state.data;    
    data.sort(this.compare);
    this.setState({ data: data });

  },
  compare: function(a,b) {

    // is this check needed?  
    for (var i = 0; i < this.state.fields.length; i++) {
      if(this.state.fields[i] === this.state.sortField){
        this.state.sortField = this.state.fields[i];
      }
    };


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

        <table className="pure-table">
            <thead>
                <tr>
                {
                  this.state.fields.map(function(f) {
                    return <th>
                        <span>{f}</span>
                        <div ref="myTextInput" data-field-name={f} onClick={this.sort} className="sort-up"></div>
                      </th>
                    ;
                  }.bind(this))
                }

                </tr>
            </thead>

            <tbody>

            {
              this.props.data.map(function(d) {
               return <tr key={d.id} className="pure-table-odd">
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