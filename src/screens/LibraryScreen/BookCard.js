import React from 'react';
import { CardItem, Text, Left, Right, Body, Icon, Thumbnail, Row } from 'native-base';
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const BookCard = ({ data, showBook }) => {
    const { title, author, genre, thumbnail, pages, isFavorited, isAvailable, availabilityDate } = data;
    return (

        <CardItem>
            <Left>

                <TouchableOpacity onPress={() => showBook(data)} >
                    <Thumbnail source={{ uri: thumbnail }} />
                </TouchableOpacity>

                <Body >
                    <TouchableOpacity onPress={() => showBook(data)} >
                        <Text>{title}</Text>
                        <Text note>Auteur:{author} </Text>
                        <Text note>Genre:{genre} </Text>
                    </TouchableOpacity>
                </Body>
            </Left>
            <Right>
                <Body>
                    <Text note>{pages} pages</Text>
                    <Icon
                        type="FontAwesome"
                        name="star"
                        style={{ fontSize: 14, marginBottom: 10, color: isFavorited ? "green" : "gray" }}
                    />
                    <Row >
                        <Icon
                            type="FontAwesome"
                            name="calendar-check-o"
                            style={{ fontSize: 14, marginBottom: -3, color: isAvailable ? "green" : "gray" }}

                        />
                        {availabilityDate && <Text note>{availabilityDate} </Text>}
                    </Row>

                </Body>
            </Right>

        </CardItem>


    );
}
BookCard.propTypes = {
    data: PropTypes.object,
    showBook: PropTypes.func,
};

export default BookCard;