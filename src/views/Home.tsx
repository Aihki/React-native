import {FlatList} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {useBook} from '../hooks/apiHooks';
import MediaListItem from '../components/MediaListItem';

const Home = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const {mediaArray} = useBook();

  return (
    <>
      <FlatList
        data={mediaArray}
        renderItem={({item}) => (
          <MediaListItem navigation={navigation} media={item} />
        )}
      />
    </>
  );
};

export default Home;
