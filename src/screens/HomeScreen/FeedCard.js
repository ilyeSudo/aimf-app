import React, {Component} from 'react';
import {Card, CardItem, Thumbnail, Text, Left, Body} from 'native-base';
import * as PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {Image} from "react-native";

class FeedCard extends Component {
  render() {
    const logo = require('../../../assets/images/logo_transparent.png');
    return (
      <Card style={{flex: 0, marginLeft: 10, marginRight: 10}}>
        <CardItem style={{backgroundColor: this.props.backgroundColor}}>
          <Left>
            <Thumbnail source={logo} />

            <FastImage
              style={{width: 200, height: 200}}
              source={{
                uri: 'http://192.168.0.23:8080/images/Khatma1.png',
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />

            <Image
                source={{ uri: 'http://192.168.0.23:8080/images/Khatma2.png' }}  style={{width: 50, height: 50}}/>

            <Body>
              <Text>{this.props.title}</Text>
              <Text note>{this.props.date}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem style={{backgroundColor: this.props.backgroundColor}}>
          <Body>
            <Text>{this.props.description}</Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

FeedCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default FeedCard;
