import {Image, Text, TouchableOpacity} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {MediaItemWithOwner} from '../types/DBTypes';

type Props = {
  media: MediaItemWithOwner;
  navigation: NavigationProp<ParamListBase>;
};

const MediaListItem = ({media, navigation}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Single', media);
      }}
    >
      <Image style={{height: 300}} source={{uri: 'http:' + media.thumbnail}} />
      <Text>{media.title}</Text>
      <Text>{new Date(media.created_at).toLocaleString('fi-FI')}</Text>
    </TouchableOpacity>
  );
};

export default MediaListItem;
