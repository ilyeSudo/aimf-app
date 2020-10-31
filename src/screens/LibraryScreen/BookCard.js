import React from 'react';
import {CardItem, Text, Left, Body, Thumbnail} from 'native-base';
import {TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {API_BASE_URL} from 'react-native-dotenv';
import {isoDateToFr} from '../../Utils/Functions';

import {
    black,
    failColor,
    gray,
    mainColor,
    successColor,
    secondaryColor,
} from '../../Utils/colors';
import {LIBRARY_STR} from '../../Utils/Constants';
import {HeartIcon} from '../../Components/icons/HeartIcon';
import IconForms from '../../Components/icons/IconForms';

const BookCard = ({data, showBook}) => {
    let {
        title,
        author,
        genre,
        images,
        pages,
        isFavorited,
        isAvailable,
        availabilityDate,
    } = data;
    //todo to test
    // availabilityDate = '2020-12-10';
    // isAvailable = false;
    // isFavorited = true;


    const getUrlThumbnail = () => {
        const image = images.filter((image) => image.type == 'thumbnail');
        return `${API_BASE_URL}/${image[0].media.path}`;
    };

    const renderStatusIndicator = (isAvailable: boolean) => {
        return (
            <View
                style={{
                    borderRadius: 50,
                    width: 6,
                    height: 6,
                    marginHorizontal: 5,
                    backgroundColor: isAvailable ? successColor : failColor,
                }}
            />
        );
    };

    return (
        <TouchableOpacity onPress={() => showBook(data)}>
            <CardItem style={styles.cardContainer}>
                <Left style={{flex: 1}}>
                    <Thumbnail
                        style={{...styles.thumbnail}}
                        source={{uri: getUrlThumbnail()}}
                    />

                    <Body style={{flex: 4}}>
                        <Text style={styles.category}>
                            {LIBRARY_STR.category + ': ' + genre.name}
                        </Text>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>{author} </Text>
                        <View style={styles.bottomContainer}>
                            <Text style={styles.statusInfo}>{pages + 'p'}</Text>
                            {renderStatusIndicator(isAvailable)}
                            {isAvailable && <Text style={styles.statusInfo}>{'Disponible'}</Text>}
                            {availabilityDate && <Text style={styles.statusInfo}>dispo
                                le {isoDateToFr(availabilityDate.toString(), false)} </Text>}
                            {isFavorited ? (
                                <HeartIcon
                                    iconForm={IconForms.gradient()}
                                    color1={mainColor}
                                    color2={secondaryColor}
                                />
                            ) : (
                                <HeartIcon iconForm={IconForms.outline()} color1={black}/>
                            )}
                        </View>
                    </Body>
                </Left>
            </CardItem>
        </TouchableOpacity>
    );
};
BookCard.propTypes = {
    data: PropTypes.object,
    showBook: PropTypes.func,
};

const styles = {
    cardContainer: {
        borderTopColor: gray,
        borderTopWidth: 0.5,
        borderTopStyle: 'solid',
        margin: 0,
        display: 'flex',
        flexDirection: 'row',
    },
    thumbnail: {
        borderRadius: 3,
        height: 100,
        width: 70,
    },
    title: {
        color: black,
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'Magra',
    },
    subtitle: {
        color: gray,
        fontWeight: '700',
        fontSize: 13,
        fontFamily: 'Magra',
    },
    category: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 11,
        color: mainColor,
    },
    bottomContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    statusInfo: {
        fontSize: 11,
        color: '#9F9F9F',
        marginHorizontal: 5,
    },
};

export default BookCard;
