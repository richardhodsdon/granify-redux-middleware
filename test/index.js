import chai from 'chai';
import spies from 'chai-spies';
import granifyMiddleware from '../src/index';
import { createStore, applyMiddleware } from 'redux';

chai.use(spies);

describe('granify middleware', () => {
  let store;
  beforeEach(() => {
    store = createStore(() => ({}), applyMiddleware(granifyMiddleware));
    window.Granify = {};

    chai.spy.on(window.console, 'warn');
  });

  afterEach(() => {
    chai.spy.restore();
  });

  it('should be ok', () => {
    chai
      .expect(() => {
        store.dispatch({ type: 'foo', payload: { test: 'testing' } });
      })
      .not.to.throw();
  });

  it('should not call trackRedux if Granify functions are not ready', () => {
    chai.spy.on(window.Granify, 'trackRedux', () => {});
    window.Granify._functionsAvailable = false;
    store.dispatch({ type: 'foo', payload: { test: 'testing' } });

    chai.expect(window.Granify.trackRedux).not.to.have.been.called();
  });

  it('should call trackRedux if Granify functions are ready', () => {
    window.Granify = {
      _functionsAvailable: true,
      trackRedux: () => {}
    };

    chai.spy.on(window.Granify, 'trackRedux', () => {});
    store.dispatch({ type: 'foo', payload: { test: 'testing' } });

    chai.expect(window.Granify.trackRedux).to.have.been.called();
  });

  it('should call show one warning if Granify trackRedux is not available', () => {
    window.Granify = {
      _functionsAvailable: true
    };

    store.dispatch({ type: 'foo', payload: { test: 'testing' } });
    store.dispatch({ type: 'foo', payload: { test: 'testing' } });

    chai.expect(window.console.warn).to.have.been.called.once;
  });
});
