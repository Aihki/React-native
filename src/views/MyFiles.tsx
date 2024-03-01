import {FlatList} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import {useBook} from '../hooks/apiHooks';
import MediaListItem from '../components/MediaListItem';
import {useUserContext} from '../hooks/ContextHooks';

const MyFiles = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const {mediaArray} = useBook();
  const {user} = useUserContext();

  if (!user) {
    return <Text>No media items uploaded yet</Text>;
  }

  const myMedia = mediaArray.filter((item) => item.user_id === user.user_id);

  return (
    <>
      <FlatList
        data={myMedia}
        renderItem={({item}) => (
          <MediaListItem navigation={navigation} media={item} />
        )}
      />
    </>
  );
};

export default MyFiles;
