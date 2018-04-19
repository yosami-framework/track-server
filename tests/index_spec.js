require('./spec_helper');
const t                   = require('track-spec');
const path                = require('path');
const TrackConfig         = require('track-config');
const TrackRouter         = require('track-router');
const Asset               = require('track-server-renderer/lib/asset');
const TrackServerRenderer = require('track-server-renderer');
const TrackServer         = require('../lib/index');
const MiddlewareBase      = require('../lib/middleware_base');
const MockController      = require('./fixtures/controllers/mock_controller');

t.describe('TrackServer', () => {
  let asset = null;

  t.beforeEach(() => {
    const assetsDir = path.resolve(__dirname, 'fixtures', 'assets');
    asset = new Asset(assetsDir, 'mock.js', 'mock.css');
  });

  t.describe('.start', () => {
    const subject = (() => {
      return TrackServer.start(
        mockMiddleware,
        TrackRouter.mithrilRoutes,
        asset
      );
    });
    let mockMiddleware = null;

    t.beforeEach(() => {
      mockMiddleware = new MiddlewareBase();
      mockMiddleware.listen = t.spy(() => Promise.resolve());
      mockMiddleware.register = t.spy();
      mockMiddleware.static = t.spy();
    });

    t.it('Call middleware.listen', () => {
      return subject().then((html) => {
        t.expect(mockMiddleware.listen.callCount).equals(1);
        t.expect(mockMiddleware.listen.args[0]).equals('127.0.0.1');
        t.expect(mockMiddleware.listen.args[1]).equals(3001);
      });
    });

    t.it('Call middleware.static', () => {
      return subject().then((html) => {
        t.expect(mockMiddleware.static.callCount).equals(1);

        const args = mockMiddleware.static.args;
        t.expect(args[0]).equals(asset.directory);
        t.expect(args[1]).equals(TrackConfig.relativeUrlRoot);
      });
    });

    t.it('Call middleware.register', () => {
      return subject().then((html) => {
        t.expect(mockMiddleware.register.callCount).equals(1);
        t.expect(mockMiddleware.register.args[0]).equals('/my-app/');
        t.expect(
          mockMiddleware.register.args[1] instanceof TrackServerRenderer
        ).equals(true);
        t.expect(
          mockMiddleware.register.args[1]._controller
        ).equals(MockController);
      });
    });

    t.context('When set TrackConfig.relativeUrlRoot', () => {
      t.beforeEach(() => {
        TrackConfig.relativeUrlRoot = '/my-app';
      });

      t.afterEach(() => {
        TrackConfig.relativeUrlRoot = undefined;
      });

      t.it('Call middleware.register with relativeUrlRoot', () => {
        return subject().then((html) => {
          t.expect(mockMiddleware.register.args[0]).equals('/my-app/');
        });
      });
    });
  });
});
