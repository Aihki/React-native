import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import {useRating} from '../hooks/apiHooks';
import {MediaItemWithOwner} from '../types/DBTypes';

const Rating = ({media, size}: {media: MediaItemWithOwner; size: number}) => {
  const [avarage, setAvarage] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const {postRating, getRatingByMediaId, getUserRating} = useRating();

  const changeRating = async (ratingValue: number) => {
    setRating(ratingValue);
  };

  const addRating = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await postRating(media.media_id, rating, token);
        console.log('Rating added', response);
        fetchRatings();
        fetchUserRating();
      }
    } catch (error) {
      console.error('Error adding rating', error);
    }
  };

  const fetchRatings = async () => {
    try {
      const result = await getRatingByMediaId(media.media_id);
      setAvarage(result.average);
    } catch (error) {
      console.error('Error fetching ratings', error);
    }
  };

  const fetchUserRating = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const result = await getUserRating(token);
        const userRating = result.find(
          (rating) => rating.media_id === media.media_id,
        );
        if (userRating) {
          setRating(userRating.rating_value);
        }
      }
    } catch (error) {
      console.error('Error fetching user rating', error);
      setRating(0);
    }
  };
  useEffect(() => {
    fetchRatings();
    fetchUserRating();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      {avarage === 0 ? (
        <Text>No ratings yet</Text>
      ) : (
        <>
          {rating > 0 && <Text>Your rating: {rating}</Text>}
          <Text>Average rating: {avarage}</Text>
        </>
      )}
      <StarRating
        onChange={changeRating}
        rating={avarage}
        onRatingEnd={addRating}
        starSize={size}
      />
    </View>
  );
};

export default Rating;
