import expect from 'expect'
import test from 'tape'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { setupJsdom } from './jsdom'
import TableView from '../src/TableView'

test('TableView component', (t) => {
  setupJsdom()

  const DATA = [
    { id: 0, make: 'Honda', model: 'NSX', year: '1997'},
    { id: 1, make: 'Toyota', model: 'Supra', year: '1996'},
    { id: 2, make: 'Nissan', model: '300ZX', year: '1998'}
  ]

  const wrapper = mount( <TableView data={DATA} /> )

  t.pass(
    expect(wrapper.props().data).toEqual(DATA)
  )

  t.end()
});
