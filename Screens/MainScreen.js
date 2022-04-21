import { useReducer, useMemo } from 'react';
import { Skeleton } from '@rneui/themed';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Text,
} from 'react-native';
import i18n from 'i18n-js';
import { SearchBar } from '@rneui/themed';
import { Title } from '../Components/cutomComponents';
import ListItem from '../Components/Listitem/loadable';
import RecommendedItem from '../Components/RecommendedItem';
import { ROUTING_URLS } from '../Utils/constant';

import {
  useInfiniteTopHundrenQuery,
  useGetTopGross,
  useDebounce,
} from '../Utils/customHook';

const initialState = '';

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return action.payload.text;
    default:
      throw new Error();
  }
}

const GrossingLoadingSkeleton = () => (
  <View style={{ marginRight: 20 }}>
    <Skeleton
      variant="rectangular"
      width={100}
      height={100}
      style={{ marginBottom: 5, borderRadius: 10 }}
    />
    <Skeleton
      variant="rectangular"
      width={100}
      height={18}
      style={{ marginBottom: 8 }}
    />
    <Skeleton variant="rectangular" width={100} height={14} />
  </View>
);

const NoDataComponent = (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      flex: 1,
    }}
  >
    <Text>No sutible item, please search another keyword</Text>
  </View>
);

export default function MainScreen({ navigation }) {
  const topTenGrossData = useGetTopGross();
  const {
    fetchNextPage,
    data: infinteData,
    refetch,
    isFetching,
  } = useInfiniteTopHundrenQuery();

  // It is recommended to use useState, just use useReducer for demostration...
  const [searchText, dispatch] = useReducer(reducer, initialState);

  const topTenClassList = topTenGrossData.data ? topTenGrossData.data : [];
  const infiniteClassList = infinteData
    ? infinteData.pages.map((page) => page.entry).flat()
    : [];

  // The requirement: Search is performed immediately when the keyword is typed; It is not recommended. Should use debounced value instead to optimize performance...
  const debouncedSearchText = useDebounce(searchText, 200);

  const memorizedFilteredTopTenList = useMemo(
    () =>
      topTenClassList.filter((item) => {
        const { combinedText } = item;
        // add trim to prevent the user accidentally added space before / after the string, toUpperCase to make it case insensitive.
        const textForFilter = debouncedSearchText.trim().toUpperCase();
        return combinedText.search(textForFilter) > -1;
      }),
    [topTenClassList, debouncedSearchText],
  );

  // use useMemo since the filter function is quite heavy....
  const memorizedFilteredTopHundredList = useMemo(
    () =>
      infiniteClassList.filter((item) => {
        const { combinedText } = item;
        const textForFilter = debouncedSearchText.trim().toUpperCase();
        return combinedText.search(textForFilter) > -1;
      }),
    [infiniteClassList, debouncedSearchText],
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      onPress={() =>
        navigation.navigate(ROUTING_URLS.APP_DETAIL, {
          appId: item.key,
          title: item.title,
        })
      }
      data={item}
      index={index}
      showBorder={index !== infiniteClassList.length - 1}
    />
  );

  const ListHeaderComponent = (
    <>
      <View style={{ width: '100%' }}>
        <Title
          style={{ marginTop: 10, marginBottom: 10, marginHorizontal: 15 }}
        >
          推介
        </Title>

        {!topTenGrossData.isFetching &&
        memorizedFilteredTopTenList.length == 0 ? (
          NoDataComponent
        ) : (
          <ScrollView
            horizontal
            style={{ paddingBottom: 20, marginHorizontal: 15 }}
          >
            {(topTenGrossData.isFetching || topTenGrossData.isLoading) && (
              <>
                <GrossingLoadingSkeleton />
                <GrossingLoadingSkeleton />
                <GrossingLoadingSkeleton />
              </>
            )}

            {memorizedFilteredTopTenList.map((data) => (
              <RecommendedItem
                key={data.key}
                data={data}
                onPress={() =>
                  navigation.navigate(ROUTING_URLS.APP_DETAIL, {
                    appId: data.key,
                    title: data.title,
                  })
                }
              />
            ))}
          </ScrollView>
        )}
      </View>
      <View
        style={{
          borderBottomColor: '#c0c0c0',
          borderBottomWidth: 1,
          width: '100%',
        }}
      />
    </>
  );

  const FooterSkeleton = (
    <View style={styles.listSkeletonContainer}>
      <Skeleton
        variant="rectangular"
        width={35}
        height={20}
        style={{ marginRight: 10 }}
      />
      <Skeleton
        variant="rectangular"
        width={75}
        height={75}
        style={{ marginBottom: 5, borderRadius: 10 }}
      />
      <View style={{ marginLeft: 10 }}>
        <Skeleton
          variant="rectangular"
          width={200}
          height={18}
          style={{ marginBottom: 8 }}
        />
        <Skeleton
          variant="rectangular"
          width={200}
          height={18}
          style={{ marginBottom: 8 }}
        />
        <Skeleton
          variant="rectangular"
          width={200}
          height={18}
          style={{ marginBottom: 8 }}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safaAreaContainer}>
      <Title style={{ marginLeft: 15, marginRight: 15, fontSize: 30 }}>
        {i18n.t('welcome')}
      </Title>
      <SearchBar
        placeholder="Search Here..."
        value={searchText}
        onChangeText={(text) => {
          dispatch({ type: 'update', payload: { text } });
        }}
        lightTheme
        containerStyle={{ backgroundColor: '#f0f0f0' }}
        inputContainerStyle={{ backgroundColor: '#d0d0d0' }}
      />
      <FlatList
        onRefresh={refetch}
        refreshing={isFetching}
        getItemLayout={(data, index) => ({
          length: 95,
          offset: 95 * index,
          index,
        })}
        ListEmptyComponent={!isFetching ? NoDataComponent : undefined}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={isFetching ? FooterSkeleton : undefined}
        nestedScrollEnabled
        data={memorizedFilteredTopHundredList}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        onEndReached={fetchNextPage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safaAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  listSkeletonContainer: {
    width: '100%',
    flexDirection: 'row',
    marginHorizontal: 15,
    height: 95,
    paddingVertical: 10,
    alignItems: 'center',
  },
});

MainScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
