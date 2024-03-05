import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';
import Login from '../views/Login';
import {useUserContext} from '../hooks/ContextHooks';
import MyFiles from '../views/MyFiles';
import Upload from '../views/Upload';
import Modify from '../views/Modify';

const Tab = createBottomTabNavigator();
const stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Upload" component={Upload} />
    </Tab.Navigator>
  );
};
const StackNavigator = () => {
  const {user} = useUserContext();
  return (
    <stack.Navigator>
      {user ? (
        <>
          <stack.Screen
            name="Tabs"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <stack.Screen name="Single" component={Single} />
          <stack.Screen name="My Files" component={MyFiles} />
          <stack.Screen name="Modify" component={Modify} />
        </>
      ) : (
        <stack.Screen name="Login" component={Login} />
      )}
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
