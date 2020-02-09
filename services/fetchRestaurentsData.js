import NetInfo from '@react-native-community/netinfo';

import { sendData } from "../helper/networkManager";
import CheckInternet from "../utility/InternetManager";
import {InsertValues,DeleteRecords} from "../dbManager/DBManager"

export default function fetchRestaurents() {

    NetInfo.fetch()
        .then(state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);

            if (state.isConnected){
                fetchData();
            }
        })

}

const fetchData = async () => {
    
    const data = {
        entity_id: 10240,
        entity_type: "city",
        count: 10,
        sort: "rating"
    };

    sendData(data)
    .then((result) => {
        _handleResponse(result)
    })
}
const _handleResponse = async result => {
    console.log("handle Response")
    await DeleteRecords();
    await _saveRestaurentToDb(result.restaurants)

}

const _saveRestaurentToDb = DataArray => {
    //DeleteRecords();

    for (var i = 0; i < DataArray.length; i++) {

        let restaurant = DataArray[i].restaurant;

        let restaurentId = restaurant.id;
        let restaurentName = restaurant.name;
        let restaurentAddress = restaurant.location.address;
        let restaurentImage = restaurant.featured_image;
        let favouriteStatus = false

        InsertValues(restaurentId, restaurentName, restaurentAddress, restaurentImage, favouriteStatus);
    }
}