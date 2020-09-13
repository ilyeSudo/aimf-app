import React from 'react';
import { CardItem, Text, Left, Right, Body, Thumbnail, Row } from 'native-base';
import PropTypes from "prop-types";
import { isoDateToFr } from "../../Utils/Functions";
import { API_BASE_URL } from "react-native-dotenv";


const BookReservationCard = ({ data }) => {
    const { book, returnDate } = data;
    const getUrlThumbnail = () => {
        const image = book.images.filter(image => image.type == 'thumbnail');
        return `${API_BASE_URL}/${image[0].media.path}`;
    }
    const getDateStr = (date) => {
        return isoDateToFr(date, false);
    }
    return (

        <CardItem>
            <Left>

                <Thumbnail source={{ uri: getUrlThumbnail() }} />

                <Body >
                    <Text>{book.title}</Text>
                </Body>
            </Left>
            <Right>
                <Body>

                    <Row >

                        <Text note>{getDateStr(returnDate)} </Text>
                    </Row>

                </Body>
            </Right>

        </CardItem>


    );
}
BookReservationCard.propTypes = {
    data: PropTypes.object,
};

export default BookReservationCard;