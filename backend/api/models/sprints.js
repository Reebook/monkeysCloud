module.exports = {
  datastore: "default",
  attributes: {
    id: {
      type: "number",
      columnName: "idsprint",
      columnType: "int",
      required: false,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: "string",
      required: true,
      columnType: "varchar(20)",
      columnName: "name",
    },
    // duda el campo va ser varchar , int o char
    /* 
        type:'ref',
        columnType:'char'

        */
    duration: {
      type: "number",
      columnName: "duration",
      columnType: "int",
      required: false,
    },
    startDate: {
      type: "number",
      columnName: "startDate",
      required: true,
    },
    endDate: {
      type: "number",
      columnName: "endDate",
      required: true,
    },
    sprintGoal: {
      type: "string",
      columnName: "sprintGoal",
      columnType: "varchar(100)",
      required: true,
    },
    isActive: {
      type: "boolean",
      columnName: "isActive",
      defaultsTo: true,
    },
    // duda con relacion entre sprint y historial , si la entidad es historyLog
    project: {
      model: "projects",
      required: true,
    },
    tasks: {
      collection: "tasks",
      via: "sprint",
    },
  },
};
