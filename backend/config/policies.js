/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  "*": ["auth"],
  // '*': true,
  CompanyController: {
    read: true,
  },
  TasksController: {
    create: true,
    read: true,
    readByState: true,
    readStates: true,
    update: true,
  },
  StateController: {
    create: true,
    read: true,
    readAll: true,
    update: true,
  },
  UserController: {
    //'*': 'isLoggedIn',
    login: true,
    create: true,
    read: true,
  },
  ComponentController: {
    create: true,
    readAll: true,
    update: true,
    changePassword: true,
    googleLogin: true,
    createdProjects: true,
  },
};
