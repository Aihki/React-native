import {Image, Text, TouchableOpacity, View} from 'react-native';
import {MediaItemWithOwner} from '../types/DBTypes';

const MediaListItem = ({media}: {media: MediaItemWithOwner}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('touched', media.title);
      }}
    >
      <Image style={{height: 300}} source={{uri: 'http:' + media.thumbnail}} />
      <Text>{media.title}</Text>
      <Text>{new Date(media.created_at).toLocaleString('fi-FI')}</Text>
    </TouchableOpacity>
  );
};

export default MediaListItem;
