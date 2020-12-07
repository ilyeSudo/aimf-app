import {StyleSheet} from 'react-native';
import {mainColor3Button} from '../../Utils/colors';

const styles = StyleSheet.create({
  bodyWrapper: {
    backgroundColor: '#fff',
    height: 550,
    paddingTop: 100,
  },
  createAccount: {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 35,
    marginBottom: 150,
  },
  inputItem: {
    marginBottom: 15,
    marginLeft: 35,
    marginRight: 35,
    paddingHorizontal: 10,
    paddingLeft: 5,
    height: 45,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  input: {
    fontSize: 15,
  },
  loginButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    height: 50,
    width: 150,
    borderRadius: 10,
    backgroundColor: mainColor3Button,
  },
  nextButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default styles;
