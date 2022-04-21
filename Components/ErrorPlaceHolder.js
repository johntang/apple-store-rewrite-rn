import { Button, Text, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const MainContainer = styled.View`
  width: 100%;
  margin-right: 20px;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: ${Dimensions.get('window').height}px;
`;

export default function ErrorPlaceHolder({ onPress }) {
  return (
    <MainContainer style={{ marginRight: 20 }}>
      <Text>You got a error, please retry!</Text>
      <Button onPress={onPress} title="Retry"></Button>
    </MainContainer>
  );
}
ErrorPlaceHolder.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
  onPress: PropTypes.func,
};
