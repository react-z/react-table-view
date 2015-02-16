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
       fields: []
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
  sort: function () {
    var sortField = this.refs.myTextInput.getDOMNode().getAttribute("data-field-name");
    var data = this.state.data;

    for(var i = 0; i < data.length; i++){
      console.log(data[i]);
      // looping for no reason
    }

    data.sort(this.compare);
    this.setState({ data: data });

  },
  compare: function(a,b) {
    if (a.make < b.make)
       return -1;
    if (a.make > b.make)
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