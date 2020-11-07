import React, {Component} from 'react';
import {Root} from 'native-base';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/configureStore';
import AppNavigation from './src/AppNavigation';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root>
            <AppNavigation />
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
