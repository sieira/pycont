import expect from 'expect'
import '@testing-library/jest-dom/extend-expect'

import extendExpect from './test-utils/extend-expect.test'

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Setup enzyme's react adapter
configure({ adapter: new Adapter() })

expect.extend(extendExpect)
