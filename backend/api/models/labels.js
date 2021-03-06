module.exports = {
  datastore: 'default',
  attributes:{
      //id y nombre
    // id:{
    //   type:'number',
    //   columnName:' idLabel',
    //   columnType:'int',
    //   autoIncrement: true,
    //   unique: true,
    //   required: false
    // },
    name:{
       type:'string',
       columnName:'name',
       columnType:'varchar(20)',
       required:false

    },
    package:{
        type:'json',
        columnName:'package',
        columnType:'JSON',
        required:true
    },
    icon:{
        type:'ref',
        columnName:'icon',
        required:true,
        columnType: 'BLOB'
    },    
    tasks:{
      collection:'Task',
      via: 'labels'
    },
  }
}
