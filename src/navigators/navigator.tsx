import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';

const Tab = createBottomTabNavigator();
const stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
const StackNavigator = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <stack.Screen name="Single" component={Single} />
    </stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
