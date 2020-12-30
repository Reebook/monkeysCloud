const initialData ={
    tasks:{
        'task-1':{id:'task-1', content:'Code' },
        'task-2':{id:'task-2', content:'Databases' },
        'task-3':{id:'task-3', content:'Files' },
    },
    columns:{
        'column-1': {
            id:'column-1',
            title:'Delovepment URL',
            taskIds:['task-1','task-2','task-3'],
        },
        'column-2': {
            id:'column-2',
            title:'Stage URL',
            taskIds:[],
        },
        'column-3': {
            id:'column-3',
            title:'Production URL',
            taskIds:[],
        },
    },
    columnOrder: ['column-1','column-2','column-3'],
    };
    
    export default initialData;