require('./spec_helper');
const t              = require('track-spec');
const MiddlewareBase = require('../lib/middleware_base');

t.describe('MiddlewareBase', () => {
  let middleware = null;

  t.beforeEach(() => {
    middleware = new MiddlewareBase();
  });

  t.describe('#listen', () => {
    const subject = (() => middleware.listen('127.0.0.1', 3000));

    t.it('Throw error', () => {
      let error = null;
      try {
        subject();
      } catch (e) {
        error = e;
      }
      t.expect(error.message).equals('#listen must be override.');
    });
  });

  t.describe('#register', () => {
    const subject = (() => middleware.register('/', {}));

    t.it('Throw error', () => {
      let error = null;
      try {
        subject();
      } catch (e) {
        error = e;
      }
      t.expect(error.message).equals('#register must be override.');
    });
  });

  t.describe('#static', () => {
    const subject = (() => middleware.static('/'));

    t.it('Throw error', () => {
      let error = null;
      try {
        subject();
      } catch (e) {
        error = e;
      }
      t.expect(error.message).equals('#static must be override.');
    });
  });
});
