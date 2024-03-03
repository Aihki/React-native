import {Video, ResizeMode} from 'expo-av';
import {Card, Text, ListItem, Icon} from '@rneui/themed';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {MediaItemWithOwner} from '../types/DBTypes';
import Comment from '../components/comment';

const Single = ({route}: {route: any}) => {
  const media: MediaItemWithOwner = route.params;
  const [filetype, fileform] = media.media_type.split('&#x2F;');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Card>
            <Card.Title>{media.title}</Card.Title>
            {filetype === 'image' ? (
              <Card.Image
                style={{height: 300}}
                resizeMode="contain"
                source={{uri: 'http:' + media.filename}}
              />
            ) : (
              <Video
                style={{height: 300}}
                source={{uri: 'http:' + media.filename}}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
              />
            )}
            <ListItem>
              <Icon name="today" />
              <Text>{new Date(media.created_at).toLocaleString('fi-FI')}</Text>
            </ListItem>
            <ListItem>
              <Text> Description: {media.description}</Text>
            </ListItem>
            <ListItem>
              <Icon name="person" />
              <Text> Owner: {media.username}</Text>
            </ListItem>
            <ListItem>
              <Icon name="image" />
              <Text>
                {' '}
                Media type: {filetype} / {fileform}
              </Text>
            </ListItem>
            <ListItem>
              <Text> File Size: {media.filesize}</Text>
            </ListItem>
            <Comment media={media} />
          </Card>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Single;
