import React from 'react';
import { CardItem, Text, Left, Right, Body, Icon, Thumbnail, Row } from 'native-base';
import PropTypes from "prop-types";

const BookReservationCard = ({ data, }) => {
    const { title, thumbnail, returnDate } = data;
    return (

        <CardItem>
            <Left>

                <Thumbnail source={{ uri: thumbnail }} />

                <Body >
                    <Text>{title}</Text>
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