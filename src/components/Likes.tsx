import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Icon, Badge} from '@rneui/base';
import {useEffect, useReducer} from 'react';
import {useLike} from '../hooks/apiHooks';
import {Like, MediaItemWithOwner} from '../types/DBTypes';

type LikeState = {
  count: number;
  userLike: Like | null;
};

type LikeAction = {
  type: 'setLikeCount' | 'like';
  count?: number;
  like?: Like | null;
};

const likeInitialState: LikeState = {
  count: 0,
  userLike: null,
};

const likeReducer = (state: LikeState, action: LikeAction): LikeState => {
  switch (action.type) {
    case 'setLikeCount':
      return {...state, count: action.count ?? 0};
    case 'like':
      if (action.like !== undefined) {
        return {...state, userLike: action.like};
      }
      return state; // no change if action.like is undefined
  }
  return state; // Return the unchanged state if the action type is not recognized
};

const Likes = ({media}: {media: MediaItemWithOwner}) => {
  const [likeState, likeDispatch] = useReducer(likeReducer, likeInitialState);
  const {getUserLike, getCountByMediaId, postLike, deleteLike} = useLike();

  const getLikes = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!media || !token) {
      return;
    }
    try {
      const userLike = await getUserLike(media.media_id, token);
      likeDispatch({type: 'like', like: userLike});
    } catch (e) {
      likeDispatch({type: 'like', like: null});
      console.log('get user like error', (e as Error).message);
    }
  };

  const getLikeCount = async () => {
    try {
      const countResponse = await getCountByMediaId(media.media_id);
      likeDispatch({type: 'setLikeCount', count: countResponse.count});
    } catch (e) {
      likeDispatch({type: 'setLikeCount', count: 0});
      console.log('get user like error', (e as Error).message);
    }
  };

  useEffect(() => {
    getLikes();
    getLikeCount();
  }, [media]);

  const handleLike = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!media || !token) {
        return;
      }
      if (likeState.userLike) {
        await deleteLike(likeState.userLike.like_id, token);
        likeDispatch({type: 'setLikeCount', count: likeState.count - 1});
        likeDispatch({type: 'like', like: null});
      } else {
        await postLike(media.media_id, token);
        getLikes();
        getLikeCount();
      }
    } catch (e) {
      console.log('like error', (e as Error).message);
    }
  };

  console.log(likeState);

  return (
    <Button
      onPress={handleLike}
      type="clear"
      containerStyle={{
        position: 'absolute',
        top: 1,
        right: 3,
        zIndex: 1,
      }}
    >
      <Icon
        type="material-community"
        color="#333"
        name={likeState.userLike ? 'thumb-up' : 'thumb-up-outline'}
      />
      <Badge
        value={likeState.count}
        containerStyle={{position: 'absolute', top: 0, right: 0}}
      />
    </Button>
  );
};

export default Likes;
