import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { Button, StyleSheet } from 'react-native';
import i18n from 'i18n-js';
import { useState } from 'react';
import { SubTitle, Title } from '../Components/cutomComponents';
import { useSetting } from '../Provider/SettingContext';
import { VERSION } from '../Utils/config';

export default function SettingScreen({}) {
  const {
    language,
    setLanguage,
    throttle,
    setThrottle,
    failingRate,
    setFailingRate,
  } = useSetting();

  const [isErrorComponentVisible, setIsErrorComponentVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safaAreaContainer}>
      <Title style={{ fontSize: 18, marginBottom: 12 }}>
        {i18n.t('language')}
      </Title>

      <Picker
        itemStyle={{ height: 50 }}
        style={{ marginBottom: 12 }}
        selectedValue={language}
        onValueChange={(itemValue) => setLanguage(itemValue)}
      >
        <Picker.Item label="ENG" value="en-US" />
        <Picker.Item label="中文" value="zh-Hant" />
      </Picker>
      <Title style={{ fontSize: 18, marginBottom: 12 }}>
        Throttling (Just to simulate slow network...)
      </Title>
      <Picker
        itemStyle={{ height: 50 }}
        style={{ marginBottom: 12 }}
        selectedValue={throttle}
        onValueChange={(itemValue) => setThrottle(itemValue)}
      >
        <Picker.Item label="0ms" value={0} />
        <Picker.Item label="1000ms" value={1000} />
        <Picker.Item label="2000ms" value={2000} />
      </Picker>
      <Title style={{ fontSize: 18, marginBottom: 12 }}>
        Failing Rate (After setting the failing rate, try it in App Detail Page)
      </Title>
      <Picker
        style={{ marginBottom: 12 }}
        itemStyle={{ height: 50 }}
        selectedValue={failingRate}
        onValueChange={(itemValue) => setFailingRate(itemValue)}
      >
        <Picker.Item label="0%" value={0} />
        <Picker.Item label="20%" value={0.2} />
        <Picker.Item label="50%" value={0.5} />
        <Picker.Item label="100%" value={1} />
      </Picker>
      <Button
        color="#ff0000"
        title="CLICK ME TO CRASH APP!"
        onPress={() => setIsErrorComponentVisible(true)}
      ></Button>
      <SubTitle style={{ marginTop: 40 }}>{`Version: v${VERSION}`}</SubTitle>
      {isErrorComponentVisible && <ComponentWithError />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safaAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 15,
  },
});

const ComponentWithError = () => {
  React.useEffect(() => {
    throw new Error('This is a test error thrown by ComponentWithError.');
  }, []);

  return null;
};
