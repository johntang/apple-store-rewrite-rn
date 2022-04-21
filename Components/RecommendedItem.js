import { Image } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { Title, SubTitle } from './cutomComponents';

const MainContainer = styled.TouchableOpacity`
  width: 100%;
  margin-right: 20px;
`;

export default function RecommendedItem({ data, onPress }) {
  return (
    <MainContainer style={{ width: 100, marginRight: 20 }} onPress={onPress}>
      <Image
        style={[
          {
            borderRadius: 10,
            height: 100,
            width: 100,
          },
        ]}
        source={{
          uri: data.imageUri,
        }}
      />
      <Title ellipsizeMode="tail" numberOfLines={2}>
        {data.title}
      </Title>
      <SubTitle ellipsizeMode="tail" numberOfLines={1}>
        {data.subTitle}
      </SubTitle>
    </MainContainer>
  );
}

RecommendedItem.propTypes = {
  data: PropTypes.object,
  onPress: PropTypes.func,
};
