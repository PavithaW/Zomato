import * as SQLite from 'expo-sqlite';

var db;
export const CreateDB = (dbname) => {
    db = SQLite.openDatabase(dbname);
    return db;
}

export const CreateTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            "create table if not exists RestaurentInfo (id integer primary key not null, name text, address text, featured_image text);",
            []
        );
    })
}
export const InsertValues = (id, name, address, featured_image) => {
    db.transaction(tx => {
        tx.executeSql(
            "insert into RestaurentInfo (id, name, address, featured_image) values (?, ?, ?,?)",
            [id, name, address, featured_image]
        );
    });
}
export const DeleteRecords = () => {
    db.transaction(tx => {
        tx.executeSql(
            "delete from RestaurentInfo"
        );
    });

}
export const SelectFromDB = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            "select * from RestaurentInfo",
            [],
            (_, { rows: { _array } }) => {
                var resultItemIdArr = new Array();
            for (let i = 0; i < _array.length; i++) {
                resultItemIdArr.push(_array[i]);
            }
            callback(resultItemIdArr);
            },
            () => console.log("error fetching")
        )
    })
}

