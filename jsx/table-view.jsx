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
       time: '',
       prefix: this.props.options.prefix
     }
  },
  /**
   * Pause the timer.
  **/
  pause: function() {
  },
  /** 
   * Reset the timer.
  **/
  reset: function() {
  },
  componentDidMount: function() {
  },
  componentWillUnmount: function() {
  },  
  render: function(){
    return (

      <div className="react-table-view">

        <table class="pure-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                </tr>
            </thead>

            <tbody>
                <tr class="pure-table-odd">
                    <td>1</td>
                    <td>Honda</td>
                    <td>NSX</td>
                    <td>1997</td>
                </tr>

                <tr>
                    <td>2</td>
                    <td>Toyota</td>
                    <td>Supra</td>
                    <td>1996</td>
                </tr>

                <tr class="pure-table-odd">
                    <td>3</td>
                    <td>Nissan</td>
                    <td>300ZX</td>
                    <td>1998</td>
                </tr>
            </tbody>
        </table>

        <h3 className="seconds"> {this.state.time}</h3>          
      
      </div>

    );
  }
});

module.exports = TableView;