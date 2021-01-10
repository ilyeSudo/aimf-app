import React, {useState} from 'react';
import {View, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Item, Label} from 'native-base';
import moment from 'moment';
import PropTypes from 'prop-types';

const DatePicker = ({
  label,
  defaultDate,
  onCustomChange,
  style,
  minimumDate,
  maximumDate,
  labelStyle,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(defaultDate || null);

  if (date !== defaultDate) {
    setDate(defaultDate);
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    hideDatePicker();
    const currentDate = selectedDate || date;
    if (onCustomChange) {
      onCustomChange(currentDate);
    }
  };

  return (
    <View>
      <Label
        style={{
          fontWeight: 'bold',
          fontSize: 14,
          marginLeft: 30,
          width: 300,
          ...labelStyle,
        }}>
        {label}
      </Label>

      <Item
        onPress={showDatePicker}
        style={{
          marginBottom: 15,
          marginLeft: 30,
          marginRight: 30,
          paddingHorizontal: 10,
          paddingLeft: 15,
          borderRadius: 10,
          height: 45,
          borderBottomWidth: 0,
          backgroundColor: '#FFF',
          ...style,
        }}>
        <Text>{date && moment(date).format('DD/MM/YYYY')}</Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          display="spinner"
          date={date || new Date()}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      </Item>
    </View>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string,
  defaultDate: PropTypes.object,
  onCustomChange: PropTypes.func,
  style: PropTypes.object,
  minimumDate: PropTypes.object,
  maximumDate: PropTypes.object,
  labelStyle: PropTypes.object,
};
export default DatePicker;
