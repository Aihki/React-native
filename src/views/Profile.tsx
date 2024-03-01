import {Button, Card, ListItem, Text, Icon} from '@rneui/themed';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {useUserContext} from '../hooks/ContextHooks';

const Profile = () => {
  const {user, handleLogout} = useUserContext();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <>
      {user && (
        <>
          <Card>
            <Card.Title>Profile</Card.Title>
            <ListItem>
              <Icon name="person" />
              <Text>Username: {user.username}</Text>
            </ListItem>
            <ListItem>
              <Icon name="email" />
              <Text>Email: {user.email}</Text>
            </ListItem>
            <ListItem>
              <Icon name="today" />
              <Text>
                Created: {new Date(user.created_at).toLocaleString('fi-FI')}
              </Text>
            </ListItem>
            <Button onPress={() => navigation.navigate('My Files')}>
              My Files &nbsp;
              <Icon name="folder" color="white" />
            </Button>
            <Card.Divider />
            <Button onPress={handleLogout}>
              Logout &nbsp;
              <Icon name="logout" color="white" />
            </Button>
          </Card>
        </>
      )}
    </>
  );
};

export default Profile;
