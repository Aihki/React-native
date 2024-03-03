import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {Card, Icon, ListItem, Button, Avatar, Text} from '@rneui/themed';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MediaItemWithOwner} from '../types/DBTypes';
import {useUserContext} from '../hooks/ContextHooks';
import {useBook} from '../hooks/apiHooks';
import Rating from './Rating';
import Likes from './Likes';
import { useUpdateContext } from '../hooks/UpdateHooks';

type Props = {
  media: MediaItemWithOwner;
  navigation: NavigationProp<ParamListBase>;
};

const MediaListItem = ({media, navigation}: Props) => {
  const {user} = useUserContext();
  const {deleteBook} = useBook();
  const {update, setUpdate} = useUpdateContext();

  const doBookDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const result = await deleteBook(media.media_id, token);
        setUpdate(!update);
        navigation.navigate('My Files');
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <Card>
      <Card.Image
        onPress={() => {
          navigation.navigate('Single', media);
        }}
        style={{aspectRatio: 1, height: 300}}
        source={{uri: 'http:' + media.thumbnail}}
      />
      <Card.Divider />
      <ListItem>
        {user && user.user_id === media.user_id ? (
          <>
            <Button
              onPress={() => {
                navigation.navigate('Modify', media);
              }}
              buttonStyle={{backgroundColor: 'green'}}
            >
              <Icon type="ionicon" name="create" color="white" />
            </Button>
            <Button
              onPress={() => {
                doBookDelete();
              }}
              buttonStyle={{backgroundColor: 'red'}}
            >
              <Icon type="ionicon" name="trash" color="white" />
            </Button>
          </>
        ) : (
          <ListItem.Content>
            <ListItem.Title>This is not you media</ListItem.Title>
          </ListItem.Content>
        )}
        <Avatar
          size={50}
          icon={{
            name: media.media_type.includes('image') ? 'image' : 'film',
            type: 'ionicon',
            color: '#333',
          }}
        />
        <ListItem.Content>
          <Text h4>{media.title}</Text>
          <Text>
            By: {media.username}, at:{' '}
            {new Date(media.created_at).toLocaleString('fi-FI')}
          </Text>
        </ListItem.Content>
        <Likes media={media} />
      </ListItem>
      <Rating media={media} size={20} />
    </Card>
  );
};
export default MediaListItem;
