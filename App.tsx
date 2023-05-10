import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgUri } from 'react-native-svg';
import { TodayJoke, JokeHistory } from './src/screens';
import {
  HISTORY_ICON,
  HISTORY_ICON_ACTIVE,
  TODAY_ICON,
  TODAY_ICON_ACTIVE,
} from './src/constants';
import { store, persistor } from './src/redux/store';

export const App = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerTitleStyle: {
                marginTop: 72,
                fontFamily: 'Inter-Bold',
                fontSize: 36,
                lineHeight: 48,
              },
              headerStyle: {
                height: 152,
                borderBottomWidth: 1,
                borderBottomColor: '#E6E6E6',
                borderStyle: 'solid',
              },
              tabBarActiveTintColor: '#9763FF',
              tabBarInactiveTintColor: '#C1C3C6',
              tabBarLabelStyle: {
                fontSize: 12,
                lineHeight: 16,
                fontFamily: 'Inter-SemiBold',
                letterSpacing: 0.02,
              },
              tabBarIcon: ({ focused }) => {
                let icon;

                if (route.name === 'Today') {
                  icon = (
                    <SvgUri uri={focused ? TODAY_ICON_ACTIVE : TODAY_ICON} />
                  );
                } else if (route.name === 'History') {
                  icon = (
                    <SvgUri
                      uri={focused ? HISTORY_ICON_ACTIVE : HISTORY_ICON}
                    />
                  );
                }

                return icon;
              },
              tabBarStyle: {
                height: 68,
                paddingHorizontal: 114,
                paddingBottom: 10,
              },
            })}>
            <Tab.Screen name="Today" component={TodayJoke} />
            <Tab.Screen name="History" component={JokeHistory} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
