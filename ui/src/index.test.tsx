import { compose } from 'redux';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('Application root', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    require('./index.tsx');
  });

  it('should render without crashing on redux devtools', () => {
    Object.defineProperty(
      global, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', {value: compose}
    );
    expect(process.env.NODE_ENV).toBe('test');
    expect(typeof window).toBe('object');
    require('./index.tsx');
  });
});
