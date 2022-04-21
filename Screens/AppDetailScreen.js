import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from '@rneui/themed';
import { Dimensions } from 'react-native';
import ErrorPlaceHolder from '../Components/ErrorPlaceHolder';
import { useSpecificApp } from '../Utils/customHook';
import { SubTitle, Title } from '../Components/cutomComponents';
import { Rating } from 'react-native-ratings';

const windowWidth = Dimensions.get('window').width;

const ImageLoadingSkeleton = () => (
  <View style={{ marginRight: 20 }}>
    <Skeleton
      variant="rectangular"
      width={windowWidth / 1.5 - 10 - 15}
      height={(windowWidth / 1.5 - 10 - 15) / (390 / 692)}
      style={[
        {
          borderRadius: 10,
          width: windowWidth / 1.5 - 10 - 15,
          marginRight: 10,
          borderRadius: 10,
          marginVertical: 12,
        },
      ]}
    />
  </View>
);

const TextSkeleton = () => (
  <View style={{ marginRight: 20 }}>
    <Skeleton
      variant="rectangular"
      width={Math.random() * windowWidth}
      height={16}
      style={{ marginBottom: 10 }}
    />
  </View>
);

export default function AppDetailScreen({ route }) {
  const { appId } = route.params;
  const appData = useSpecificApp(appId);
  let result = undefined;
  if (appData.data && appData.data.results.length === 1) {
    result = appData.data.results[0];
  }

  const [textCollasp, setTextCollasp] = useState(true);

  return (
    <SafeAreaView style={styles.safaAreaContainer}>
      <ScrollView>
        {appData.isFetching && !result && (
          <>
            <ScrollView horizontal>
              <ImageLoadingSkeleton />
              <ImageLoadingSkeleton />
            </ScrollView>
            <TextSkeleton />
            <TextSkeleton />
            <TextSkeleton />
            <TextSkeleton />
            <TextSkeleton />
            <TextSkeleton />
            <TextSkeleton />
            <TextSkeleton />
            <TextSkeleton />
            <TextSkeleton />
            <TextSkeleton />
          </>
        )}
        {appData.error && <ErrorPlaceHolder onPress={appData.refetch} />}
        {!appData.error && result && (
          <>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#d0d0d0',
                marginBottom: 12,
                paddingBottom: 12,
              }}
            >
              <Image
                style={[
                  {
                    borderRadius: 12,
                    height: 100,
                    width: 100,
                    marginRight: 10,
                    borderWidth: 1,
                    borderColor: '#d0d0d0',
                  },
                ]}
                source={{
                  uri: result.artworkUrl100,
                }}
              />

              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: windowWidth - 100 - 30 - 10,
                }}
              >
                <Title>{`${result.trackName}`}</Title>
                <SubTitle>{result.sellerName}</SubTitle>
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <Rating
                    type="star"
                    ratingCount={5}
                    imageSize={12}
                    defaultRating={result.averageUserRatingForCurrentVersion}
                    readonly
                  />
                  <SubTitle>{` (${result.userRatingCount}個評分)`}</SubTitle>
                </View>
                <SubTitle>{`${result.formattedPrice} - ${(
                  +result.fileSizeBytes /
                  1024 /
                  1024
                ).toFixed(2)}MB`}</SubTitle>
              </View>
            </View>
            <Title>iPhone 螢幕截圖</Title>
            <ScrollView horizontal>
              {result.screenshotUrls.map((url) => (
                <Image
                  key={url}
                  style={[
                    {
                      borderRadius: 10,
                      width: windowWidth / 1.5 - 10 - 15,
                      aspectRatio: 390 / 692,
                      marginRight: 10,
                      borderRadius: 10,
                      marginVertical: 12,
                    },
                  ]}
                  source={{
                    uri: url,
                  }}
                />
              ))}
            </ScrollView>

            <Title>Description</Title>
            <Text ellipsizeMode="tail" numberOfLines={textCollasp ? 10 : 0}>
              {result.description}
            </Text>
            {textCollasp && (
              <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'flex-end' }}
                onPress={() => setTextCollasp(false)}
              >
                <Text style={{ color: 'blue' }}>See More</Text>
              </TouchableOpacity>
            )}
          </>
        )}
        <View style={{ height: 40 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safaAreaContainer: {
    flex: 1,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
});

AppDetailScreen.propTypes = {
  route: PropTypes.object,
};
