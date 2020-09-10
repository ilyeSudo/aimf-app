import {Label} from 'native-base';
import DropDownPicker from './DropDownPicker';
import {Image, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {dispatchErrorMessage} from '../store/reducers/errorMessageRedux';
import {receiveAssociationData} from '../store/reducers/associationRedux';
import {API_BASE_URL} from 'react-native-dotenv';

class SelectAssociation extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.receiveAssociationData();
  }
  render() {
    return (
      <>
        {!this.props.loading && (
          <>
            <Label style={styles.label}>Association*</Label>
            <DropDownPicker
              items={this.props.associationList}
              labelField="name"
              valueField="id"
              activeLabelStyle={styles.activeLabelStyle}
              defaultValue={this.props.selectedAssociationId}
              containerStyle={styles.dropDownPickerContainerStyle}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => this.props.onChangeItem(item)}
              zIndex={10}
              icon={(item) => (
                <Image
                  style={styles.logo}
                  source={{
                    uri: `${API_BASE_URL}/${item.logo}`,
                  }}
                />
              )}
            />
          </>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const {errorMessage} = state.errorMessageStore;
  const {loading, associationList} = state.associationStore;
  const {user} = state.accountStore;
  return {
    errorMessage,
    loading,
    associationList,
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchErrorMessage: (errorMessage) =>
      dispatch(dispatchErrorMessage(errorMessage)),
    receiveAssociationData: () => dispatch(receiveAssociationData()),
  };
};
SelectAssociation.propTypes = {
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
  activeLabelStyle: PropTypes.string,
  onChangeItem: PropTypes.func.isRequired,
  receiveAssociationData: PropTypes.func,
  associationList: PropTypes.array,
  user: PropTypes.object,
  selectedAssociationId: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectAssociation);

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 30,
    width: 300,
  },
  dropDownPickerContainerStyle: {
    height: 45,
    marginBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
  },
  activeLabelStyle: {
    backgroundColor: '#e1e1e1',
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 35,
  },
  dropDownPicker: {backgroundColor: '#fafafa'},
  itemStyle: {justifyContent: 'flex-start'},
});
