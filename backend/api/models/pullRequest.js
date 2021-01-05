module.exports = {
    datastore: 'default',
    attributes: {
        id: {
            type: 'number',
            columnName: 'idPullRequest',
            columnType: 'int',
            required: false,
            autoIncrement: true,
            unique: true
        },
        numberPR: {
            type: 'number',
            columnName: 'numberPR',
            columnType: 'int',
            required: false,
            //autoIncrement: true,
            //unique: true
        },
        idUser:{ //References a user
            model: 'user',
            required: true
        },
        title: {
            type: 'string',
            columnName: 'title',
            columnType: 'varchar(50)',
            required: false
        },
        body: {
            type: 'string',
            columnName: 'body',
            columnType: 'varchar(200)',
            required: false
        },
        urlRepoReceivePR: {
            type: 'string',
            columnName: 'urlRepoReceivePR',
            columnType: 'varchar(200)',
            required: false
        },
        urlRepoCreatePR: {
            type: 'string',
            columnName: 'urlRepoCreatePR',
            columnType: 'varchar(200)',
            required: false
        },
        commitHash: {
            type: 'string',
            columnName: 'commitHash',
            columnType: 'varchar(30)',
            required: false
        },
        patch: {
            type: 'string',
            columnName: 'patch',
            columnType: 'varchar(150)',
            required: false
        },
        branchNamePR:{
            type: 'string',
            columnName: 'branchNamePR',
            columnType: 'varchar(100)',
            required: false
        },
        isLocked: {
            type: 'boolean',
            columnName: 'isLocked',
            columnType: 'boolean',
            required: false
        },
        mergeable: {
            type: 'boolean',
            columnName: 'mergeable',
            columnType: 'boolean',
            required: false
        },
        hasMerged: {
            type: 'boolean',
            columnName: 'hasMerged',
            columnType: 'boolean',
            required: false
        },
        merged:{
            type: 'ref',
            columnName: 'merged',
            columnType: 'TIMESTAMP',
            required: false
        },
        mergedCommitId:{
            type: 'string',
            columnName: 'mergedCommitId',
            columnType: 'varchar(150)',
            required: false
        },
        mergedBy: {
            collection: 'user',
            via: 'prMerged'
        },
        taskRelated: {
            model: 'tasks'
        }
    },
    beforeCreate : function (values, proceed) {
        // add seq number, use
        Sequence.next("order", function(err, num) {
            if (err) return proceed(err);
            values.numberPR = num;
            proceed();
        });
    }
}