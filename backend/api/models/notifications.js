module.exports = {
    datastore: 'default',
    attributes: {        
        userNotification: {
            model: 'user' //Through associations relationship
        },
        taskNotification: { //Through associations relationship
            model: 'Task'
        }
    }
}