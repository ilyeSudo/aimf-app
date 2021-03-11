import {StyleSheet} from 'react-native';
import {backgroundColor} from '../../Utils/colors';

const styles = StyleSheet.create({
  articleView: {
    flexDirection: 'row',
    width: '130%',
    flex: 1,
  },
  rowBack: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    width: '25%',
  },
  backRightBtn: {
    margin: 'auto',
  },
  swipeListView: {
    flex: 1,
    paddingTop: 0,
    backgroundColor,
  },
  hiddenItemeContainer: {
    // borderWidth: 1,
    flex: 1,
    flexDirection: 'row-reverse',
  },
  hiddenItemeTextContainer: {
    // borderWidth: 1,
    padding: 20,
  },
  hiddenItemeText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    height: 30,
    width: 30,
    // borderWidth: 1,
  },
});

export default styles;
