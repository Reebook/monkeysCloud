module.exports = {
  datastore: "default",
  attributes: {
    id: {
      type: "number",
      columnName: "idtask",
      columnType: "int",
      required: false,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: "string",
      required: true,
      columnName: "name",
      columnType: "varchar(20)",
    },
    description: {
      type: "string",
      required: false,
      columnName: "description",
      columnType: "varchar(45)",
    },
    position: {
      type: "number",
      defaultsTo: 999,
    },
    summary: {
      type: "string",
      required: false,
      columnName: "summary",
      columnType: "varchar(100)",
    },
    timetracking: {
      type: "string",
      required: false,
      columnName: "timetracking",
      columnType: "varchar(45)",
    },
    //
    watching: {
      type: "string",
      required: false,
      columnName: "watching",
      columnType: "varchar(45)",
    },
    sprint: {
      model: "Sprint",
      required: false,
    },
    linkedto: {
      collection: "Task",
      via: "relatedto",
    },
    relatedto: {
      model: "Task",
      required: false,
    },
    project: {
      model: "Project",
      required: true,
    },
    reporter: {
      model: "user",
      required: true,
    },
    assignees: {
      collection: "user",
      via: "assigned",
    },

    //------------------------------New fields -------------------------------
    comments: {
      type: "string",
      required: false,
      columnName: "comments",
      columnType: "varchar(150)",
    },
    commentsTiming: {
      type: "string",
      required: false,
      columnName: "commentsTiming",
      columnType: "varchar(45)",
    },
    //------------------------------ !Important must consider the behavior of these attribute
    commentOwner: {
      model: "user",
      required: false,
    },
    commentedBy: {
      collection: "user",
      required: false,
    },
    workLog: {
      //References a work log in a one to one relationship, a task can only have a worklog relationship
      model: "workLog",
      unique: true,
    },
    users: {
      // Error
      collection: "user",
      via: "taskNotification", //it doesn't exist on user model
      through: "notifications",
    },
    //------------------------------

    priority: {
      type: "number",
      required: true,
      columnName: "priority",
      columnType: "int",
    },
    estimated: {
      type: "number",
      required: false,
      columnName: "estimated",
      columnType: "int",
    },
    labels: {
      // references label in a one to one relationship
      collection: "labels",
      via: "tasks",
    },
    component: {
      //references  component one to one  relationship
      collection: "component",
      via: "taskComponent",
    },
    state: {
      model: "State",
    },
    attachment: {
      type: "ref",
      columnName: "attachment",
      columnType: "LONGBLOB", //Long Binary Large Object
      required: false,
    },
    historiesUser: {
      //must consider the behavior of this attribute (Through associations) --the history of a task can have more than one user
      collection: "user", //References user
      via: "historyTask", //References task
      through: "historyLog", //junction table (history log)
    },
    //-----------------------------------------------------------------------------------
    epic: {
      type: "boolean",
      defaultsTo: false,
      columnName: "epic",
      columnType: "boolean",
    },
    parents: {
      collection: "Task",
      via: "children",
    },
    // Add the other side of a plural reflexive association
    children: {
      collection: "Task",
      via: "parents",
    },
    pullRequestsRelated: {
      collection: "pullRequest",
      via: "taskRelated",
    },
    //--------------------------End of new fields-----------------------------
  },
};
