/* setup enzyme */
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

/* setup jsdom */
var jsdom = require('jsdom')
const { JSDOM } = jsdom
const window = new JSDOM('').window
global.window = window
global.document = window.document

import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import TableView from '../TableView'

test('TableView renders correctly and matches snapshot', () => {
  const DATA = [
    { id: 0, make: 'Honda', model: 'NSX', year: '1997' },
    { id: 1, make: 'Toyota', model: 'Supra', year: '1996' },
    { id: 2, make: 'Nissan', model: '300ZX', year: '1998' }
  ]

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

  const component = renderer.create(
    <TableView data={DATA} columns={COLUMNS} />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('TableView renders the correct elements and props', () => {
  const DATA = [
    { id: 0, make: 'Honda', model: 'NSX', year: '1997' },
    { id: 1, make: 'Toyota', model: 'Supra', year: '1996' },
    { id: 2, make: 'Nissan', model: '300ZX', year: '1998' }
  ]

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

  const wrapper = shallow(
    <TableView data={DATA} columns={COLUMNS} />
  )

  expect(wrapper.instance().props.columns).toEqual(COLUMNS)

  expect(wrapper.find('table').length).toEqual(1)
  expect(wrapper.find('thead').length).toEqual(1)
  expect(wrapper.find('tbody').length).toEqual(1)

  const heading = wrapper.find('thead th span').first()
  expect(heading.text()).toEqual('id')

  const column = wrapper.find('tbody td p').first()
  expect(column.text()).toContain('Year: 1997')

  // console.log(wrapper.debug())
})
