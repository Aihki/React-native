import {Button, Card, ListItem, Text, Icon} from '@rneui/themed';
import {useUserContext} from '../hooks/ContextHooks';

const Profile = () => {
  const {user, handleLogout} = useUserContext();
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
            <Button title="Logout" onPress={handleLogout} />
          </Card>
        </>
      )}
    </>
  );
};

export default Profile;
