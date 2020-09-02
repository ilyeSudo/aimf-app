import React, {Component} from 'react';
import {Card, CardItem, Thumbnail, Text, Left, Body} from 'native-base';
import * as PropTypes from 'prop-types';
import {View} from 'react-native';

class FeedCard extends Component {
  render() {
    const logo = require('../../../assets/images/logo_transparent.png');
    return (
      <Card style={{flex: 0, marginLeft: 10, marginRight: 10}}>
        <CardItem style={{backgroundColor: this.props.backgroundColor}}>
          <Left>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <Thumbnail source={logo} />
              <Text
                style={{fontSize: 10, marginRight: 'auto', marginLeft: 'auto'}}>
                {this.props.associationName}
              </Text>
            </View>

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
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  associationName: PropTypes.string.isRequired,
};

export default FeedCard;
