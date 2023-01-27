import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Tracking, ItemTracking } from '../redux/slices/tracking';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Home from '../pages/Home';
import { StatusBar } from 'react-native';
import ViewTracking from '../pages/ViewTracking';

export type RootStackParamList = {
  Home: undefined;
  ViewTracking: ItemTracking;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <Provider store={ store }>
      <NavigationContainer>
              <PaperProvider>
                  <Stack.Navigator screenOptions={{
                    headerShown: false
                  }}>
                      <Stack.Screen name="Home" component={Home} />
                      <Stack.Screen name="ViewTracking" component={ViewTracking} options={{
                        presentation: 'modal'
                      }}/>
                  </Stack.Navigator>
              </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;