/**
 * Security Settings
 * (sails.config.security)
 *
 * These settings affect aspects of your app's security, such
 * as how it deals with cross-origin requests (CORS) and which
 * routes require a CSRF token to be included with the request.
 *
 * For an overview of how Sails handles security, see:
 * https://sailsjs.com/documentation/concepts/security
 *
 * For additional options and more information, see:
 * https://sailsjs.com/config/security
 */

module.exports.security = {
  /***************************************************************************
   *                                                                          *
   * CORS is like a more modern version of JSONP-- it allows your application *
   * to circumvent browsers' same-origin policy, so that the responses from   *
   * your Sails app hosted on one domain (e.g. example.com) can be received   *
   * in the client-side JavaScript code from a page you trust hosted on _some *
   * other_ domain (e.g. trustedsite.net).                                    *
   *                                                                          *
   * For additional options and more information, see:                        *
   * https://sailsjs.com/docs/concepts/security/cors                          *
   *                                                                          *
   ***************************************************************************/

  cors: {
    allRoutes: true,
    // allowOrigins: ["webapp:3000", "http://localhost:3000", "http://webapp:3000", "http://127.0.0.1:3000"],
    allowOrigins: "*",
    allowCredentials: false,
    // allowRequestHeaders: [
    //   'X-Powered-By', 
    //   'Content-Type', 
    //   'Accept', 
    //   'Origin',
    //   'Accept-Encoding',
    //   'Accept-Language',
    //   'Connection',
    //   'Host',
    //   'Origin',
    //   'Referer',
    //   'Sec-Fetch-Dest',
    //   'Sec-Fetch-Mode',
    //   'Sec-Fetch-Site',
    //   'User-Agent',
    //   'Pragma',
    //   'Cache-Control',
    //   'X-Auth-Token',
    //   'Access-Control-Allow-Origin',
    // ]
  },

  /****************************************************************************
   *                                                                           *
   * By default, Sails' built-in CSRF protection is disabled to facilitate     *
   * rapid development.  But be warned!  If your Sails app will be accessed by *
   * web browsers, you should _always_ enable CSRF protection before deploying *
   * to production.                                                            *
   *                                                                           *
   * To enable CSRF protection, set this to `true`.                            *
   *                                                                           *
   * For more information, see:                                                *
   * https://sailsjs.com/docs/concepts/security/csrf                           *
   *                                                                           *
   ****************************************************************************/

  // csrf: false
};
