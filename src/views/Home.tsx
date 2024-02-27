import {FlatList, Text} from 'react-native';
import {useBook} from '../hooks/apiHooks';
import MediaListItem from '../components/MediaListItem';

const Home = () => {
  const {mediaArray} = useBook();
  return (
    <>
      <Text>home</Text>
      <FlatList
        data={mediaArray}
        renderItem={({item}) => <MediaListItem media={item} />}
      />
    </>
  );
};

export default Home;
