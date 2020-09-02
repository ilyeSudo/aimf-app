import {ScrollView, Text, View} from 'react-native';
import React, {Component} from 'react';
import {Button, Icon} from 'native-base';
import {CREATE_ACTION} from '../../Utils/Constants';
import {Text as ElementText} from 'react-native-elements';
import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {register} from '../../store/reducers/accountRedux';
import {getTermsOfUse} from '../../store/reducers/authenticationRedux';

class TermsOfUse extends Component {
  componentDidMount() {
    this.props.getTermsOfUse();
  }

  render() {
    return (
      <ScrollView
        centerContent
        style={{
          padding: 20,
          backgroundColor: '#fce3ba',
        }}>
        <View>
          <Button
            transparent
            onPress={() => this.props.updateAction(CREATE_ACTION)}
            style={{borderRadius: 30, width: 50}}>
            <Icon
              style={{color: '#000'}}
              name="md-arrow-back"
              type="Ionicons"
            />
          </Button>
        </View>
        <ElementText h4 h4Style={{fontSize: 20, marginBottom: 20}}>
          Les Conditions générales
        </ElementText>
        <Text>{this.props.termsOfUse && this.props.termsOfUse.content}</Text>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const {termsOfUse} = state.authenticationStore;
  return {
    termsOfUse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => dispatch(register(data)),
    getTermsOfUse: () => dispatch(getTermsOfUse()),
  };
};

TermsOfUse.propTypes = {
  getTermsOfUse: PropTypes.func,
  termsOfUse: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(TermsOfUse);
