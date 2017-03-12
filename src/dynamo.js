import ItemService from './service';

export function findItemsByName(name) {
    return ItemService().findByName(name);


    // new Promise(function(resolve, reject) {
    //     var params = {
    //         TableName: postsTable,
    //         AttributesToGet: [
    //             'id',
    //             'title',
    //             'author',
    //             'bodyContent'
    //         ]
    //     };
    //
    //     docClient.scan(params, function(err, data) {
    //         if (err) return reject(err);
    //         return resolve(data["Items"]);
    //     });
    //
    // });
}