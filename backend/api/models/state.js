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
      required: true,
    },
    position: {
      type: "number",
      defaultsTo: 999,
    },
    project: {
      model: "Project",
      required: true,
    },
    tasks: {
      collection: "Task",
      via: "state",
    },
  },
};
