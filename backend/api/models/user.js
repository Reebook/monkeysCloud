module.exports = {
  datastore: "default",
  attributes: {
    id: {
      type: "number",
      columnName: "iduser",
      columnType: "int",
      required: false,
      autoIncrement: true,
      unique: true,
    },
    username: {
      type: "string",
      required: false,
      columnName: "username",
      columnType: "varchar(20)",
    },
    fullname: {
      type: "string",
      required: false,
      columnName: "fullname",
      columnType: "varchar(45)",
    },
    bio: {
      type: "string",
      required: false,
      columnName: "bio",
      columnType: "varchar(200)",
    },
    location: {
      type: "string",
      required: false,
      columnName: "location",
      columnType: "varchar(20)",
    },
    isvisible: {
      type: "boolean",
      columnName: "isvisible",
    },
    languages: {
      type: "json",
      columnName: "languages",
      defaultsTo: null,
      columnType: "JSON",
    },
    email: {
      type: "string",
      columnName: "email",
      unique: true,
      required: true,
      columnType: "varchar(45)",
      isEmail: true,
    },
    password: {
      type: "string",
      columnName: "password",
      columnType: "varchar(200)",
      encrypt: true,
    },
    workinfo: {
      collection: "workinfo",
      via: "user",
    },
    assigned: {
      collection: "Task",
      via: "assignees",
    },
    //-----------------New fields--------------------
    avatar: {
      type: "ref",
      columnName: "userImg",
      columnType: "MEDIUMBLOB",
      required: false,
    },
    headerImg: {
      type: "ref",
      columnName: "headerImg",
      columnType: "MEDIUMBLOB",
      required: false,
    },
    timeZone: {
      type: "string",
      columnName: "timeZone",
      columnType: "varchar(20)",
      required: false,
    },
    userRol: {
      collection: "rol",
      via: "rols",
    },
    jobTitle: {
      type: "string",
      columnName: "jobTitle",
      columnType: "varchar(20)",
      required: false,
    },
    company: {
      model: "company",
      required: false,
    },
    department: {
      type: "string",
      columnName: "department",
      columnType: "varchar(20)",
      required: false,
    },
    historiesTasks: {
      //must consider the behavior of this attribute (Through associations) --the history of a task can have more than one user
      collection: "Task", //References tasks
      via: "historyUsers", //References user
      through: "historyLog", //Junction table
    },
    relatedToPermissionEnv: {
      //one to one relationship with permission enviroment
      model: "permissionEnviroment",
      unique: true,
    },
    backupRelated: {
      // one to one relationship with backup model
      model: "backup",
      unique: true,
    },
    companies: {
      //one to one relationship
      collection: "company",
      via: "owner",
    },
    tasks: {
      collection: "Task",
      via: "userNotification",
      through: "notifications",
    },
    //userpayment
    stripeCustomerId: {
      type: "string",
      allowNull: true,
      columnName: "stripeCustomerId",
      columnType: "varchar(20)",
    },
    stripeSubId: {
      type: "string",
      allowNull: true,
      columnName: "stripeSubId",
      columnType: "varchar(20)",
    },
    subscriptionDateEnd: {
      type: "number",
      allowNull: true,
      columnName: "subscriptionDateEnd",
      columnType: "int",
    },
    typeMember: {
      type: "string",
      defaultsTo: "free",
      columnName: "typeMember",
      columnType: "varchar(20)",
    },
    /////////////////
    createdProject: {
      collection: "Project",
      via: "lead",
    },
    projects: {
      collection: "Project",
      via: "members",
    },

    createdPR: {
      collection: "pullRequest",
      via: "idUser",
    },
    prMerged: {
      model: "pullRequest",
    },
    //-----------------End of New fields--------------------
  },

  customToJSON: function () {
    // Return a shallow copy of this record with the password and ssn removed.
    return _.omit(this, ["password"]);
  },
};
