import expect from 'expect'
import jestFetchMock from 'jest-fetch-mock'
import '@testing-library/jest-dom/extend-expect'

import extendExpect from './test-utils/extend-expect.test'

import { configure, shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Setup enzyme's react adapter
configure({ adapter: new Adapter() })
global.shallow = shallow
global.render = render
global.mount = mount

expect.extend(extendExpect)

global.fetch = jestFetchMock
jestFetchMock.enableMocks()
