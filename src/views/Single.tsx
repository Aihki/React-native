import {Text, View, Image} from 'react-native';
import {Video, ResizeMode} from 'expo-av';
import {MediaItemWithOwner} from '../types/DBTypes';

const Single = ({route}: {route: any}) => {
  const media: MediaItemWithOwner = route.params;
  const [filetype, fileform] = media.media_type.split('&#x2F;');

  return (
    <View>
      {filetype === 'image' ? (
        <Image style={{height: 300}} source={{uri: 'http:' + media.filename}} />
      ) : (
        <Video
          style={{height: 300}}
          source={{uri: 'http:' + media.filename}}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
        />
      )}
      <Text>{media.title}</Text>
      <Text>{new Date(media.created_at).toLocaleString('fi-FI')}</Text>
      <Text> Description: {media.description}</Text>
      <Text> Name: {media.filename}</Text>
      <Text> Owner: {media.username}</Text>
      <Text>
        {' '}
        Media type: {filetype} / {fileform}
      </Text>
      <Text> File Size: {media.filesize}</Text>
    </View>
  );
};
export default Single;
