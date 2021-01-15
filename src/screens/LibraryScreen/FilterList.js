import React from 'react';

import {View, Text} from 'react-native';
import Menu, {MenuItem} from 'react-native-material-menu';
import {BOOK_GENRES} from '../../Utils/Constants';
import {Icon} from 'native-base';
import PropTypes from 'prop-types';
import {black, gray} from '../../Utils/colors';

class FilterList extends React.PureComponent {
  constructor(props) {
    super(props);
    _menu = null;
  }

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  hideMenu = (value) => {
    this.props.updateValue(value);
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  rendetListMenu = () => {
    const list = [];
    this.props.list.forEach((element) =>
      list.push(
        <MenuItem key={element.id} onPress={() => this.hideMenu(element.id)}>
          {element.label}
        </MenuItem>,
      ),
    );

    return list;
  };

  getColor = () => {
    return this.props.isEmpty ? gray : black;
  };

  render() {
    return (
      <View
        style={{
          ...styles.globalContainer,
          borderBottomColor: this.getColor(),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{...styles.label, color: this.getColor()}}
            onPress={this.showMenu}>
            {this.props.selectedValue}
          </Text>
          <Text onPress={this.showMenu}>
            <Icon
              type="AntDesign"
              name="caretdown"
              style={{fontSize: 12, color: this.getColor()}}
            />
          </Text>
        </View>
        <Menu ref={this.setMenuRef}>{this.rendetListMenu()}</Menu>
      </View>
    );
  }
}

const styles = {
  label: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 14,
    marginHorizontal: 10,
  },
  globalContainer: {
    marginRight: 20,
    marginTop: 10,
    borderBottomWidth: 1,
    paddingBottom: 7,
  },
};

FilterList.propTypes = {
  isEmpty: PropTypes.bool,
  updateValue: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default FilterList;
