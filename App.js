import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Alert } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingProvider } from './Provider/SettingContext';
import i18n from 'i18n-js';
import MainScreen from './Screens/MainScreen';
import AppDetailScreen from './Screens/AppDetailScreen';
import SettingScreen from './Screens/SettingScreen';
import ErrorBoundary from './Components/ErrorBoundary';
import translations from './Locales';
import { ROUTING_URLS } from './Utils/constant';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // this will handler all request error and display as an Alert, of coz, it will be better to handle error 1 by 1.
      onError: (e) => {
        console.log(e);
        Alert.alert(e.message);
      },
    },
  },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

i18n.translations = translations;

// Defining a routing enum to prevent typo when app become complicated...

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={ROUTING_URLS.MAIN}
      component={MainScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={ROUTING_URLS.APP_DETAIL}
      component={AppDetailScreen}
      options={({ route }) => ({ title: route.params.title })}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <ErrorBoundary>
      <SettingProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <NavigationContainer theme={Theme}>
              <StatusBar
                animated={true}
                backgroundColor="#fff"
                hidden={false}
              />
              <Tab.Navigator>
                <Tab.Screen
                  options={{
                    headerShown: false,
                    tabBarIconStyle: { display: 'none' },
                  }}
                  name={ROUTING_URLS.HOME}
                  component={HomeStack}
                />
                <Tab.Screen
                  name={ROUTING_URLS.SETTING}
                  component={SettingScreen}
                  options={{ tabBarIconStyle: { display: 'none' } }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </QueryClientProvider>
      </SettingProvider>
    </ErrorBoundary>
  );
}
