/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": { view: "pages/homepage" },

  //CompanyController Routesf


  "POST /Company/Create": { controller: "Company", action: "create" },
  "GET /Company/Read/:id": { controller: "Company", action: "read" },
  "GET /Company/read": { controller: "Company", action: "readAll" },
  "PATCH /Company/Update/:id": { controller: "Company", action: "update" },
  "DELETE /Company/Delete": { controller: "Company", action: "delete" },

  //LanguagesController Routes
  "POST /Language/Create": { controller: "Languages", action: "create" },
  "GET /Language/Read/:id": { controller: "Languages", action: "read" },
  "PATCH /Language/Update": { controller: "Languages", action: "update" },
  "DELETE /Language/Delete": { controller: "Languages", action: "delete" },

  //ProjectsController Routes

  "POST /Project/Create": { controller: "Project", action: "create" },
  "GET /Project/Read": { controller: "Project", action: "readAll" },
  "GET /project/:id/users": { controller: "Project", action: "users" },
  "PATCH /Project/Update/:id": { controller: "Project", action: "update" },
  "DELETE /Project/Delete": { controller: "Project", action: "delete" },

  //RecoveryCodeController Routes
  "POST /RecoveryCode/Create": { controller: "RecoveryCode", action: "create" },
  "GET /RecoveryCode/Read/:id": { controller: "RecoveryCode", action: "read" },
  "PATCH /RecoveryCode/Update": {
    controller: "RecoveryCode",
    action: "update",
  },
  "DELETE /RecoveryCode/Delete": {
    controller: "RecoveryCode",
    action: "delete",
  },
  "POST /RecoveryCode/VerifyCode": {
    controller: "RecoveryCode",
    action: "verifyCode",
  },
  "POST /RecoveryCode/SendCode": {
    controller: "RecoveryCode",
    action: "sendCode",
  },

  //SprintsController Routes
  "POST /Sprint/Create": { controller: "Sprint", action: "create" },
  "GET /Sprint/read": { controller: "Sprint", action: "read" },
  "PATCH /Sprint/Update": { controller: "Sprint", action: "update" },
  "DELETE /Sprint/Delete": { controller: "Sprint", action: "delete" },

  //TasksController Routes
  "POST /Task/Create": { controller: "Task", action: "create" },
  "GET /Task/Read/:id": { controller: "Task", action: "read" },
  "GET /task/read": { controller: "Task", action: "readAll" },
  "PATCH /Task/Update/:id": { controller: "Task", action: "update" },
  "DELETE /Task/Delete": { controller: "Task", action: "delete" },

  "POST /epic/:id/tasks": "TasksController.addSubTask",
  "GET /epic/:id/tasks": "TasksController.getEpicTasks",

  //UserController Routes
  //'POST /user/create': 'UserController.create',
  //'GET /user/read/:id': 'UserController.read',

  "POST /User/Create": { controller: "User", action: "create" },
  "GET /User/Read/:id": { controller: "User", action: "read" },
  "GET /user/me": "UserController.me",
  "GET /user/projects": { controller: "User", action: "projects" },
  "PATCH /User/Update/:id": { controller: "User", action: "update" },
  "PATCH /user/changePassword/:id": "UserController.changePassword",
  "DELETE /User/Delete": { controller: "User", action: "delete" },
  "POST /User/LogIn": { controller: "User", action: "login" },
  "POST /User/GoogleLogIn": { controller: "User", action: "googleLogin" },
  //checkout
  "POST /user/checkout/subscription": "UserController.subscription",
  "POST /user/checkout/changeCreditCard": "UserController.changeCreditCard",
  "POST /user/checkout/cancel": "UserController.cancelSubscription",
  "POST /user/checkout/test": "UserController.test",

  //WorkinfoController Routes
  "POST /Workinformation/Create": { controller: "Workinfo", action: "create" },
  "GET /Workinformation/Read/:id": { controller: "Workinfo", action: "read" },
  "PATCH /Workinformation/Update": { controller: "Workinfo", action: "update" },
  "DELETE /Workinformation/Delete": {
    controller: "Workinfo",
    action: "delete",
  },

  //Agency Routes
  "POST /Agency/Create": { controller: "Agency", action: "create" },
  "GET /Agency/Read/:id": { controller: "Agency", action: "read" },
  "PATCH /Agency/Update": { controller: "Agency", action: "update" },
  "DELETE /Agency/Delete": { controller: "Agency", action: "delete" },

  //Backup Routes
  "POST /Backup/Create": { controller: "Backup", action: "create" },
  "GET /Backup/Read/:id": { controller: "Backup", action: "read" },
  "PATCH /Backup/Update": { controller: "Backup", action: "update" },
  "DELETE /Backup/Delete": { controller: "Backup", action: "delete" },

  //Bills Routes
  "POST /Bill/Create": { controller: "Bills", action: "create" },
  "GET /Bill/Read/:id": { controller: "Bills", action: "read" },
  "PATCH /Bill/Update": { controller: "Bills", action: "update" },
  "DELETE /Bill/Delete": { controller: "Bills", action: "delete" },

  //Component Routes

  "POST /Component/Create": { controller: "Component", action: "create" },
  "GET /Component/Read/:id": { controller: "Component", action: "read" },
  "GET /Component/project/:id": { controller: "Component", action: "readAll" },
  "PATCH /Component/Update": { controller: "Component", action: "update" },
  "DELETE /Component/Delete": { controller: "Component", action: "delete" },

  //ConnectionType Routes
  "POST /ConnectionType/Create": {
    controller: "ConnectionType",
    action: "create",
  },
  "GET /ConnectionType/Read/:id": {
    controller: "ConnectionType",
    action: "read",
  },
  "PATCH /ConnectionType/Update": {
    controller: "ConnectionType",
    action: "update",
  },
  "DELETE /ConnectionType/Delete": {
    controller: "ConnectionType",
    action: "delete",
  },

  //Enviroments Routes
  "POST /Enviroment/Create": { controller: "Enviroments", action: "create" },
  "GET /Enviroment/Read/:id": { controller: "Enviroments", action: "read" },
  "PATCH /Enviroment/Update": { controller: "Enviroments", action: "update" },
  "DELETE /Enviroment/Delete": { controller: "Enviroments", action: "delete" },

  //Frequency Routes
  "POST /Frequency/Create": { controller: "Frequency", action: "create" },
  "GET /Frequency/Read/:id": { controller: "Frequency", action: "read" },
  "PATCH /Frequency/Update": { controller: "Frequency", action: "update" },
  "DELETE /Frequency/Delete": { controller: "Frequency", action: "delete" },

  //HistoryLog Routes
  "POST /HistoryLog/Create": { controller: "HistoryLog", action: "create" },
  "GET /HistoryLog/Read/:id": { controller: "HistoryLog", action: "read" },
  "PATCH /HistoryLog/Update": { controller: "HistoryLog", action: "update" },
  "DELETE /HistoryLog/Delete": { controller: "HistoryLog", action: "delete" },

  //Host Routes
  "POST /Host/Create": { controller: "Host", action: "create" },
  "GET /Host/Read/:id": { controller: "Host", action: "read" },
  "PATCH /Host/Update": { controller: "Host", action: "update" },
  "DELETE /Host/Delete": { controller: "Host", action: "delete" },

  //Labels Routes
  "POST /Label/Create": { controller: "Labels", action: "create" },
  "GET /Label/Read/:id": { controller: "Labels", action: "read" },
  "PATCH /Label/Update": { controller: "Labels", action: "update" },
  "DELETE /Label/Delete": { controller: "Labels", action: "delete" },

  //Notifications Routes
  "POST /Notification/Create": {
    controller: "Notifications",
    action: "create",
  },
  "GET /Notification/Read/:id": { controller: "Notifications", action: "read" },
  "PATCH /Notification/Update": {
    controller: "Notifications",
    action: "update",
  },
  "DELETE /Notification/Delete": {
    controller: "Notifications",
    action: "delete",
  },

  //PermissionEnviroment Routes
  "POST /PermissionEnviroment/Create": {
    controller: "PermissionEnviroment",
    action: "create",
  },
  "GET /PermissionEnviroment/Read/:id": {
    controller: "PermissionEnviroment",
    action: "read",
  },
  "PATCH /PermissionEnviroment/Update": {
    controller: "PermissionEnviroment",
    action: "update",
  },
  "DELETE /PermissionEnviroment/Delete": {
    controller: "PermissionEnviroment",
    action: "delete",
  },

  //Rol Routes
  "POST /Rol/Create": { controller: "Rol", action: "create" },
  "GET /Rol/Read/:id": { controller: "Rol", action: "read" },
  "PATCH /Rol/Update": { controller: "Rol", action: "update" },
  "DELETE /Rol/Delete": { controller: "Rol", action: "delete" },

  //ScheduleBackup Routes
  "POST /ScheduleBackup/Create": {
    controller: "ScheduleBackup",
    action: "create",
  },
  "GET /ScheduleBackup/Read/:id": {
    controller: "ScheduleBackup",
    action: "read",
  },
  "PATCH /ScheduleBackup/Update": {
    controller: "ScheduleBackup",
    action: "update",
  },
  "DELETE /ScheduleBackup/Delete": {
    controller: "ScheduleBackup",
    action: "delete",
  },

  //PullRequest Routes
  "POST /PullRequest/Create": { controller: "PullRequest", action: "create" },
  "GET /PullRequest/Read/:id": { controller: "PullRequest", action: "read" },
  "PATCH /PullRequest/Update": { controller: "PullRequest", action: "update" },
  "DELETE /PullRequest/Delete": { controller: "PullRequest", action: "delete" },

  //State Routes
  "POST /State/Create": { controller: "State", action: "create" },
  "GET /state/project/:id/": {controller: "State", action: "readAll", },
  "PATCH /State/Update/:id": { controller: "State", action: "update" },
  "DELETE /State/Delete": { controller: "State", action: "delete" },

  //TypeEnviroments Routes
  "POST /TypeEnviroment/Create": {
    controller: "TypeEnviroments",
    action: "create",
  },
  "GET /TypeEnviroment/Read/:id": {
    controller: "TypeEnviroments",
    action: "read",
  },
  "PATCH /TypeEnviroment/Update": {
    controller: "TypeEnviroments",
    action: "update",
  },
  "DELETE /TypeEnviroment/Delete": {
    controller: "TypeEnviroments",
    action: "delete",
  },

  //WorkLog Routes
  "POST /WorkLog/Create": { controller: "WorkLog", action: "create" },
  "GET /WorkLog/Read/:id": { controller: "WorkLog", action: "read" },
  "PATCH /WorkLog/Update": { controller: "WorkLog", action: "update" },
  "DELETE /WorkLog/Delete": { controller: "WorkLog", action: "delete" },

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
