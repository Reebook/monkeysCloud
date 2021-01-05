module.exports = {
  datastore: "default",
  attributes: {
    id: {
      type: "number",
      columnName: "idproject",
      columnType: "int",
      required: false,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: "string",
      columnName: "name",
      columnType: "varchar(20)",
      required: false,
    },
    key: {
      type: "string",
      columnName: "key",
      columnType: "varchar(100)",
      required: true,
    },
    wiki: {
      type: "string",
      columnName: "wiki",
      columnType: "varchar(100)",
      required: false,
    },
    labels: {
      type: "json",
      columnName: "labels",
      defaultsTo: null,
      required: false,
      columnType: "JSON",
    },
    sprints: {
      collection: "sprints",
      via: "project",
    },

    //New fields
    company: {
      model: "company",
      //unique: true,
      required: true,
    },
    enviromentsP: {
      collection: "enviroments",
    },
    //user relationships
    lead: {
      model: "user",
      required: true,
    },
    members: {
      collection: "user",
      via: "projects",
    },
  },
  beforeCreate: function (valuesToSet, proceed) {
    valuesToSet.key = valuesToSet.key.toUpperCase();
    return proceed();
  },
};
