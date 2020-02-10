import React, { useState } from 'react';
import { Text, View, TouchableHighlight, Image, ImageBackground } from 'react-native';
import styles from './Styles'
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

export default ListItem = props => {

    // use a hook instead of state
    const [isFavourite, setIsFavourite] = useState(props.item.favourite_status);

    const DEFAULT_IMAGE_URL = '../../assets/images/default.jpg'
    let restaurentItem;
    let location;

    restaurentItem = props.item;
    location = restaurentItem.address;

    let Image_URL;
    if (restaurentItem.featured_image != "") {
        Image_URL = { uri: restaurentItem.featured_image, cache: 'force-cache' };
    } else {
        Image_URL = require(DEFAULT_IMAGE_URL)
    }

    const handleIsFavouriteButtonClick = () => {
        const currentAction = !isFavourite
        setIsFavourite(currentAction);

        props.onPressItem(props.index, props.item, currentAction)
    }

    return (
        <TouchableHighlight
            underlayColor='#dddddd'>
            <View>
                <View style={styles.rowContainer}>
                    <View style={styles.imageContainer}>
                        <ImageBackground source={Image_URL} style={{ flex: 1, resizeMode: 'stretch' }} >
                            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']} style={styles.linearGradient}>
                                <TouchableHighlight
                                    underlayColor='rgba(0,0,0,0)'
                                    style={styles.buttonLayout}
                                    onPress={() => { handleIsFavouriteButtonClick() }}>
                                    {isFavourite ? <Icon name='heart' size={30} color='#ffffff' /> : <Icon name='heart-o' size={30} color='#ffffff' />}
                                </TouchableHighlight>
                                <Text style={styles.nameText}
                                    numberOfLines={1}>{restaurentItem.name}</Text>
                                <Text style={styles.addressText}
                                    numberOfLines={1}>{location}</Text>
                            </LinearGradient>
                        </ImageBackground>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

}