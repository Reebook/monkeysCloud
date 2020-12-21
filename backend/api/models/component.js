module.exports ={
    datastore: 'default',
    attributes: {
        id: {
            type: 'number',
            columnName: 'idComponent',
            columnType: 'int',
            required: false,
            autoIncrement: true,
            unique: true
        },
        name:{
            type:'string',
            columnName:'name',
            columnType:'varchar(25)',
            required:true,
        },
        description:{
            type:'string',
            columnName:'description',
            columnType:'varchar(50)',
            required:false
        },
        taskComponent:{
            model: 'tasks',
            unique:true
        }
    },
}