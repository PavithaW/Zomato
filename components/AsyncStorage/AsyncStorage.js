import {
    AsyncStorage,
} from 'react-native';

export async function setData(dataToSave) {
    try {
        await AsyncStorage.setItem('favouriteResArray', JSON.stringify(dataToSave));
    } catch (error) {
        console.log("inside Async Error");
        // Error saving data
    }
};

export async function getData() {
    try {
        const favResArray = await AsyncStorage.getItem('favouriteResArray');
        if (favResArray !== null) {
            return favResArray;
        }
    } catch (error) {
        console.log("error")

    }
};