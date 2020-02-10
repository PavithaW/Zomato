import * as SQLite from 'expo-sqlite';

var db;

//create databe
export const CreateDB = (dbname) => {
    db = SQLite.openDatabase(dbname);
    return db;
}

// create table RestaurentInfo
export const CreateTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            "create table if not exists RestaurentInfo (id integer primary key not null, name text, address text, featured_image text,favourite_status boolean);",
            []
        );
    })
}

// insert values in to RestaurentInfo table
export const InsertValues = (id, name, address, featured_image, favourite_status) => {
    db.transaction(tx => {
        tx.executeSql(
            "insert into RestaurentInfo (id, name, address, featured_image, favourite_status) values (?, ?, ?, ?, ?)",
            [id, name, address, featured_image, favourite_status]
        );
    });
}

//update favourite_status column in RestaurentInfo table
export const UpdateFavouriteStatus = (id, favourite_status) => {
    db.transaction(tx => {
        tx.executeSql(
            "update RestaurentInfo set favourite_status = " + favourite_status + " where id =" + id
        );
    });

}

// delete all records in table RestaurentInfo
export const DeleteRecords = () => {
    db.transaction(tx => {
        tx.executeSql(
            "delete from RestaurentInfo"
        );
    });

}

// select all records from table RestaurentInfo
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

// select all records whose favourite status is true from table RestaurentInfo
export const SelectFavouriteRestaurents = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            "select * from RestaurentInfo where favourite_status =" + 1,
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