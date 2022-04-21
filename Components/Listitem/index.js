import { StyleSheet, View, Image, Animated } from 'react-native';
import styled from 'styled-components/native';
import { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Rating } from 'react-native-ratings';

import { Title, SubTitle } from '../cutomComponents';
import { SUBTITLE_COLOR } from '../../Utils/Colors';
const RankNumber = styled.Text`
  font-size: 18px;
  width: 100%;
  color: ${SUBTITLE_COLOR};
  margin-right: 10px;
  width: 35px;
`;

const MainContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding-bottom: 10px;
  margin-left: 15px;
  margin-right: 15px;
  padding-top: 10px;
  height: 95px;
  align-items: center;
  ${(props) =>
    props.showBorder
      ? `border-bottom-width: 1px;
            border-color: #c0c0c0;`
      : ''}
`;

export function ListItem({ data, index, showBorder, onPress }) {
  const roundStyle = index % 2 === 0 ? 10 : 75 / 2;

  const letAni = useRef(new Animated.Value(300)).current;

  const RTLAni = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(letAni, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    RTLAni();
  }, []);

  return (
    <Animated.View
      style={{
        left: letAni,
      }}
    >
      <MainContainer showBorder={showBorder} onPress={onPress}>
        <RankNumber>{index + 1}</RankNumber>
        <Image
          style={[
            {
              borderRadius: roundStyle,
              height: 75,
              width: 75,
            },
          ]}
          source={{
            uri: data.imageUri,
          }}
        />
        <View style={styles.textContainer}>
          <Title ellipsizeMode="tail" numberOfLines={1}>
            {data.title}
          </Title>
          <SubTitle ellipsizeMode="tail" numberOfLines={1}>
            {data.subTitle}
          </SubTitle>
          <View style={{ flexDirection: 'row' }}>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={12}
              defaultRating={3}
              readonly
            />
            <SubTitle>{` (${data.rateNumber})`}</SubTitle>
          </View>
        </View>
      </MainContainer>
    </Animated.View>
  );
}

export default memo(ListItem);

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    fontWeight: '700',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
ListItem.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
  onPress: PropTypes.func,
  showBorder: PropTypes.bool,
};
