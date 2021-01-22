module.exports = {
  datastore: "default",
  attributes: {
    id: {
      type: "number",
      columnType: "int",
      columnName: "idState",
      required: false,
      unique: true,
      autoIncrement: true,
    },
    name: {
      type: "string",
      columnType: "varchar(20)",
      columnName: "stateName",
    },
    project: {
      model: "projects",
    },
    tasks: {
      collection: "tasks",
      via: "state",
      unique: true,
    },
    taskState: {
      collection: "tasks",
      via: "state",
    },

    //combio de llave foranea para tasks

    //state:{
    //  model: 'tasks',
    // unique: true
    // }
  },
};
