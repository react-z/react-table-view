/** @jsx React.DOM */

var React = require('react');
var SecondsTohhmmss = require('../js/SecondsTohhmmss.js');

/**
 * Table view module
 * A simple sortable table component.
**/

var TableView = React.createClass({displayName: "TableView",
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
  componentDidMount: function() {
    this.parseFields();
  },
  componentWillUnmount: function() {
  },  
  render: function(){
    return (

      React.createElement("div", {className: "react-table-view"}, 

        React.createElement("table", {className: "pure-table"}, 
            React.createElement("thead", null, 
                React.createElement("tr", null, 
                
                  this.state.fields.map(function(f) {
                    return React.createElement("th", null, 
                        React.createElement("span", null, f), 
                        React.createElement("div", {className: "sort-up"})
                      )
                    ;
                  })
                

                )
            ), 

            React.createElement("tbody", null, 

            
              this.props.data.map(function(d) {
               return React.createElement("tr", {key: d.id, className: "pure-table-odd"}, 
                    React.createElement("td", null, d.id), 
                    React.createElement("td", null, d.make), 
                    React.createElement("td", null, d.model), 
                    React.createElement("td", null, d.year)
                )
               ;
             })
             

            )
        )
      
      )

    );
  }
});

module.exports = TableView;