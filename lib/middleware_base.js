/**
 * MiddlewareBase
 * @abstract
 */
class MiddlewareBase {
  /**
   * Listen.
   * @abstract
   * @param {string}  bind Binding address.
   * @param {integer} port Port of server.
   * @return {promise} ready listener promise.
   */
  listen(bind, port) {
    throw new Error('#listen must be override.');
  }

  /**
   * Register route.
   * @abstract
   * @param {string}              path     Path.
   * @param {TrackServerRenderer} renderer Renderer.
   */
  register(path, renderer) {
    throw new Error('#register must be override.');
  }

  /**
   * Set static directory
   * @param {string} staticDir       Path.
   * @param {string} relativeUrlRoot Relative URL Root.
   */
  static(staticDir, relativeUrlRoot) {
    throw new Error('#static must be override.');
  }
}

module.exports = MiddlewareBase;
