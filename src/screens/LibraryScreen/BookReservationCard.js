import React from 'react';
import { CardItem, Text, Left, Right, Body, Thumbnail, Row } from 'native-base';
import PropTypes from "prop-types";
import { getIsoDate } from "../../Utils/Functions";


const BookReservationCard = ({ data }) => {
    const { book, returnDate } = data;
    const getUrlThumbnail = () => {
        const image = book.images.filter(image => image.type == 'thumbnail');
        return `http://192.168.0.29:8080/${image[0].media.path}`;
    }
    const getDateStr = (date) => {
        return getIsoDate(date, false);
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