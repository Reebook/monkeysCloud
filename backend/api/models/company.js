module.exports = {
  datastore: "default",
  attributes: {
    id: {
      type: "number",
      columnName: "idcompany",
      columnType: "int",
      required: false,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: "string",
      columnName: "name",
      columnType: "varchar(20)",
      required: true,
      unique: true,
    },
    teams: {
      type: "json",
      columnName: "teams",
      defaultsTo: null,
      columnType: "JSON",
    },
    departments: {
      type: "json",
      columnName: "departments",
      defaultsTo: null,
      columnType: "JSON",
    },
    tokens: {
      type: "string",
      columnName: "tokens",
      columnType: "varchar(100)",
      required: false,
    },
    website: {
      type: "string",
      columnName: "website",
      columnType: "varchar(100)",
      required: true,
    },
    phone: {
      type: "string",
      columnName: "phoneNumber",
      columnType: "varchar(20)",
      required: false,
    },
    email: {
      type: "string",
      columnName: "agencyEmail",
      columnType: "varchar(50)",
      required: true,
    },
    icon: {
      //agency logo
      type: "ref",
      columnName: "agencyIcon",
      columnType: "MEDIUMBLOB",
      required: false,
    },
    //Relationships
    users: {
      //an agency can have multiple users but a user will only have one agency to belong
      collection: "user",
      via: "company",
    },
    owner: {
      model: "user",
    },
    projects: {
      //one to many relationship one agency can have multiple projects
      collection: "projects",
      via: "company",
    },
    billInformation: {
      //one way relationship
      model: "bills",
    },
  },
};
