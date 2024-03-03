import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {Card, Icon, ListItem, Button, Avatar, Text} from '@rneui/themed';
import {MediaItemWithOwner} from '../types/DBTypes';
import {useUserContext} from '../hooks/ContextHooks';
import Rating from './Rating';
import Likes from './Likes';

type Props = {
  media: MediaItemWithOwner;
  navigation: NavigationProp<ParamListBase>;
};

const MediaListItem = ({media, navigation}: Props) => {
  const {user} = useUserContext();

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
                console.log('media deleted mayby');
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
