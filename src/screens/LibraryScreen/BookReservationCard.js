import React from 'react';
import { CardItem, Text, Left, Right, Body, Icon, Thumbnail, Row } from 'native-base';
import PropTypes from "prop-types";

const BookReservationCard = ({ data, }) => {
    const { book, thumbnail, returnDate } = data;
    const getUrlThumbnail = () => {
        const image = book.images.filter(image => image.type == 'thumbnail');
        return `http://192.168.0.29:8080/${image[0].media.path}`;
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

                        <Text note>{returnDate} </Text>
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