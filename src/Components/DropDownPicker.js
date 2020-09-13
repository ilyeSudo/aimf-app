import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

// Icon
import Feather from 'react-native-vector-icons/Feather';
Feather.loadFont();

class DropDownPicker extends React.Component {
  constructor(props) {
    super(props);

    let choice;
    let items = [];
    if (!props.multiple) {
      if (props.defaultValue) {
        choice = props.items.find(
          (item) => item[props.valueField] === props.defaultValue,
        );
      } else if (
        props.items.filter(
          (item) => item.hasOwnProperty('selected') && item.selected === true,
        ).length > 0
      ) {
        choice = props.items.filter(
          (item) => item.hasOwnProperty('selected') && item.selected === true,
        )[0];
      } else {
        choice = this.null();
      }
    } else {
      if (
        props.defaultValue &&
        Array.isArray(props.defaultValue) &&
        props.defaultValue.length > 0
      ) {
        props.defaultValue.forEach((value, index) => {
          items.push(
            props.items.find((item) => item[props.valueField] === value),
          );
        });
      } else if (
        props.items.filter(
          (item) => item.hasOwnProperty('selected') && item.selected === true,
        ).length > 0
      ) {
        items = props.items.filter(
          (item, index) =>
            item.hasOwnProperty('selected') && item.selected === true,
        );
      }
    }

    this.state = {
      choice: props.multiple ? items : {...choice},
      searchableText: null,
      isVisible: props.isVisible,
      props: {
        multiple: props.multiple,
        defaultValue: props.defaultValue,
        isVisible: props.isVisible,
      },
    };
  }

  static getDerivedStateFromProps(props, state) {
    // Change default value (! multiple)
    if (
      !state.props.multiple &&
      props.defaultValue !== state.props.defaultValue
    ) {
      const emptyChoice = {};
      emptyChoice[props.labelField] = null;
      emptyChoice[props.valueField] = null;
      emptyChoice.icon = () => {};

      const choice =
        props.defaultValue === null
          ? emptyChoice
          : props.items.find(
              (item) => item[props.valueField] === props.defaultValue,
            );
      return {
        choice,
        props: {
          ...state.props,
          defaultValue: props.defaultValue,
        },
      };
    }

    // Change default value (multiple)
    if (
      state.props.multiple &&
      JSON.stringify(props.defaultValue) !==
        JSON.stringify(state.props.defaultValue)
    ) {
      let items = [];
      if (
        props.defaultValue &&
        Array.isArray(props.defaultValue) &&
        props.defaultValue.length > 0
      ) {
        props.defaultValue.forEach((value, index) => {
          items.push(
            props.items.find((item) => item[props.valueField] === value),
          );
        });
      }

      return {
        choice: items,
        props: {
          ...state.props,
          defaultValue: props.defaultValue,
        },
      };
    }

    // Change visibility
    if (props.isVisible !== state.props.isVisible) {
      return {
        isVisible: props.isVisible,
        props: {
          ...state.props,
          isVisible: props.isVisible,
        },
      };
    }

    // Change disability
    if (props.disabled !== state.props.disabled) {
      return {
        props: {
          ...state.props,
          disabled: props.disabled,
        },
      };
    }

    return null;
  }

  null() {
    return {
      label: null,
      value: null,
      icon: () => {},
    };
  }

  toggle() {
    this.setState(
      {
        isVisible: !this.state.isVisible,
      },
      () => {
        const isVisible = this.state.isVisible;

        if (isVisible) {
          this.props.onOpen();
        } else {
          this.props.onClose();
        }
      },
    );
  }

  select(item, index) {
    const {multiple} = this.state.props;
    if (!multiple) {
      this.setState({
        choice: {
          ...item,
        },
        isVisible: false,
        props: {
          ...this.state.props,
          isVisible: false,
        },
      });

      // onChangeItem callback
      this.props.onChangeItem(item, index);
    } else {
      let choice = [...this.state.choice];
      const exists = choice.findIndex(
        (i) =>
          i[this.props.labelField] === item[this.props.labelField] &&
          i[this.props.valueField] === item[this.props.valueField],
      );

      if (exists > -1 && choice.length > this.props.min) {
        choice = choice.filter(
          (i) =>
            i[this.props.labelField] !== item[this.props.labelField] &&
            i[this.props.valueField] !== item[this.props.valueField],
        );
      } else if (exists === -1 && choice.length < this.props.max) {
        choice.push(item);
      }

      this.setState({
        choice,
      });

      // onChangeItem callback
      this.props.onChangeItem(choice.map((i) => i[this.props.valueField]));
    }

    // onClose callback (! multiple)
    if (!multiple) {
      this.props.onClose();
    }
  }

  getLayout(layout) {
    this.setState({
      top: layout.height - 1,
    });
  }

  getItems() {
    if (this.state.searchableText) {
      const text = this.state.searchableText.toLowerCase();

      return this.props.items.filter((item) => {
        return (
          item[this.props.labelField] &&
          item[this.props.labelField].toLowerCase().indexOf(text) > -1
        );
      });
    }

    return this.props.items;
  }

  getNumberOfItems() {
    return this.props.multipleText.replace('%d', this.state.choice.length);
  }

  render() {
    const {multiple, disabled} = this.state.props;
    const {placeholder} = this.props;
    const isPlaceholderActive =
      this.state.choice[this.props.labelField] === null;
    const label = isPlaceholderActive
      ? placeholder
      : this.state.choice[this.props.labelField];

    const placeholderStyle = isPlaceholderActive && this.props.placeholderStyle;
    const opacity = disabled ? 0.5 : 1;
    const items = this.getItems();
    return (
      <>
        <View
          style={[
            this.props.containerStyle,
            {
              ...(Platform.OS !== 'android' && {
                zIndex: this.props.zIndex,
              }),
            },
          ]}>
          <TouchableOpacity
            onLayout={(event) => this.getLayout(event.nativeEvent.layout)}
            disabled={disabled}
            onPress={() => this.toggle()}
            activeOpacity={1}
            style={[
              styles.dropDown,
              this.props.style,
              {paddingHorizontal: 10},
              this.state.isVisible && styles.noBottomRadius,
              {
                flexDirection: 'row',
                flex: 1,
              },
            ]}>
            <View style={[styles.dropDownDisplay]}>
              {this.state.choice.logo &&
                this.props.icon &&
                !multiple &&
                this.props.icon(this.state.choice)}
              <Text
                style={[
                  this.props.labelStyle,
                  placeholderStyle,
                  {opacity, flex: 1, marginRight: 5},
                  this.state.choice[this.props.labelField] !== null &&
                    this.props.selectedLabelStyle,
                  this.state.choice.logo && this.props.icon && {marginLeft: 5},
                ]}>
                {multiple
                  ? this.state.choice.length > 0
                    ? this.getNumberOfItems()
                    : placeholder
                  : label}
              </Text>
            </View>
            {this.props.showArrow && (
              <View style={[styles.arrow]}>
                <View style={[this.props.arrowStyle, {opacity}]}>
                  {!this.state.isVisible
                    ? this.props.customArrowDown(
                        this.props.arrowSize,
                        this.props.arrowColor,
                      )
                    : this.props.customArrowUp(
                        this.props.arrowSize,
                        this.props.arrowColor,
                      )}
                </View>
              </View>
            )}
          </TouchableOpacity>
          <View
            style={[
              styles.dropDown,
              styles.dropDownBox,
              this.props.dropDownStyle,
              !this.state.isVisible && styles.hidden,
              {
                top: this.state.top,
                maxHeight: this.props.dropDownMaxHeight,
                zIndex: this.props.zIndex,
              },
            ]}>
            {this.props.searchable && (
              <View style={{width: '100%', flexDirection: 'row'}}>
                <TextInput
                  style={[styles.input, this.props.searchableStyle]}
                  defaultValue={this.state.searchableText}
                  placeholder={this.props.searchablePlaceholder}
                  placeholderTextColor={
                    this.props.searchablePlaceholderTextColor
                  }
                  onChangeText={(text) => {
                    this.setState({
                      searchableText: text,
                    });
                  }}
                />
              </View>
            )}

            <ScrollView style={{width: '100%'}} nestedScrollEnabled={true}>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.select(item, index)}
                    style={[
                      {paddingHorizontal: 10},
                      styles.dropDownItem,
                      this.props.itemStyle,
                      this.state.choice[this.props.valueField] ===
                        item[this.props.valueField] &&
                        this.props.activeLabelStyle,
                      this.state.choice[this.props.valueField] ===
                        item[this.props.valueField] &&
                        this.props.activeItemStyle,
                      {
                        opacity: item?.disabled || false === true ? 0.3 : 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        ...(multiple
                          ? {
                              justifyContent: 'space-between',
                            }
                          : {}),
                      },
                    ]}
                    disabled={item?.disabled || false === true}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      {item.logo && this.props.icon && this.props.icon(item)}
                      <Text style={[this.props.labelStyle]}>
                        {item[this.props.labelField]}
                      </Text>
                    </View>
                    {this.state.props.multiple &&
                      this.state.choice.findIndex(
                        (i) =>
                          i[this.props.labelField] ===
                            item[this.props.labelField] &&
                          i[this.props.valueField] ===
                            item[this.props.valueField],
                      ) > -1 &&
                      this.props.customTickIcon()}
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.notFound}>
                  {this.props.searchableError()}
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </>
    );
  }
}

DropDownPicker.defaultProps = {
  placeholder: 'Select an item',
  dropDownMaxHeight: 150,
  style: {},
  dropDownStyle: {},
  containerStyle: {},
  itemStyle: {},
  labelStyle: {},
  selectedLabelStyle: {},
  placeholderStyle: {},
  activeItemStyle: {},
  activeLabelStyle: {},
  arrowStyle: {},
  arrowColor: '#000',
  showArrow: true,
  arrowSize: 15,
  customArrowUp: (size, color) => (
    <Feather name="chevron-up" size={size} color={color} />
  ),
  customArrowDown: (size, color) => (
    <Feather name="chevron-down" size={size} color={color} />
  ),
  customTickIcon: () => <Feather name="check" size={15} />,
  zIndex: 5000,
  disabled: false,
  searchable: false,
  searchablePlaceholder: 'Search for an item',
  searchableError: () => <Text>Not Found</Text>,
  searchableStyle: {},
  searchablePlaceholderTextColor: 'gray',
  isVisible: false,
  multiple: false,
  multipleText: '%d items have been selected',
  min: 0,
  max: 10000000,
  onOpen: () => {},
  onClose: () => {},
  onChangeItem: () => {},
};

DropDownPicker.propTypes = {
  items: PropTypes.array.isRequired,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  dropDownMaxHeight: PropTypes.number,
  style: PropTypes.object,
  dropDownStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  itemStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  selectedLabelStyle: PropTypes.object,
  placeholderStyle: PropTypes.object,
  activeItemStyle: PropTypes.object,
  activeLabelStyle: PropTypes.object,
  showArrow: PropTypes.bool,
  arrowStyle: PropTypes.object,
  arrowColor: PropTypes.string,
  arrowSize: PropTypes.number,
  customArrowUp: PropTypes.func,
  customArrowDown: PropTypes.func,
  customTickIcon: PropTypes.func,
  zIndex: PropTypes.number,
  disabled: PropTypes.bool,
  searchable: PropTypes.bool,
  searchablePlaceholder: PropTypes.string,
  searchableError: PropTypes.func,
  searchableStyle: PropTypes.object,
  searchablePlaceholderTextColor: PropTypes.string,
  isVisible: PropTypes.bool,
  multiple: PropTypes.bool,
  multipleText: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onChangeItem: PropTypes.func,
  labelField: PropTypes.string.isRequired,
  valueField: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  arrow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingVertical: 8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  dropDown: {
    backgroundColor: '#fff',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#dfdfdf',
  },
  dropDownDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    flexGrow: 1,
  },
  dropDownBox: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
  },
  dropDownItem: {
    paddingVertical: 8,
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#dfdfdf',
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 8,
    marginBottom: 10,
  },
  hidden: {
    position: 'relative',
    display: 'none',
    borderWidth: 0,
  },
  noBottomRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  notFound: {
    marginVertical: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
});

export default DropDownPicker;
