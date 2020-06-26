import React, {useState} from 'react';
import {Platform, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Item, Label} from 'native-base';
import moment from 'moment';

const DatePicker = ({
  label,
  defaultDate,
  onCustomChange,
  style,
  minimumDate,
  maximumDate,
  labelStyle,
}) => {
  const [date, setDate] = useState(defaultDate || null);

  if (date !== defaultDate) {
    setDate(defaultDate);
  }
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onCustomChange && onCustomChange(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  return (
    <>
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
        onPress={showDatepicker}
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
        {show && (
          <DateTimePicker
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            value={date || new Date()}
            mode={mode}
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
        )}
      </Item>
    </>
  );
};
export default DatePicker;
