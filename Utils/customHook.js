import { useQuery, useInfiniteQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { requestUrl, request } from './request';
import { AppStoreListItemClass } from '../DataModeling/AppStoreItemClass';
import { useSetting } from '../Provider/SettingContext';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useGetTopHundren = () => {
  const url = requestUrl.topHundrenFree;
  const reqFunc = async () => {
    const res = await request(url, {});
    return res.feed.entry.map(
      (data) =>
        new AppStoreListItemClass(
          data['im:name'].label,
          data.category.attributes.label,
          data['im:image'][1].label,
          3,
          100,
          data.id.attributes['im:id'],
          data['im:artist'].label,
          data.summary.label,
        ),
    );
  };
  return useQuery([url], reqFunc, {
    select: (resData) => {
      return resData;
    },
  });
};

export const useInfiniteTopHundrenQuery = () => {
  const url = requestUrl.topHundrenFree;
  const reqFunc = async ({ pageParam = 1 }) => {
    // To simular fetching delay
    await sleep(500);
    const res = await request(url, {});
    return {
      currentPage: pageParam,
      pageParam,
      entry: res.feed.entry
        .slice((pageParam - 1) * 10, 10 * pageParam)
        .map(
          (data) =>
            new AppStoreListItemClass(
              data['im:name'].label,
              data.category.attributes.label,
              data['im:image'][1].label,
              3,
              100,
              data.id.attributes['im:id'],
              data['im:artist'].label,
              data.summary.label,
            ),
        ),
    };
  };
  return useInfiniteQuery([url, 'infi'], reqFunc, {
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage >= 10) {
        return undefined;
      }
      return lastPage.currentPage + 1;
    },
  });
};

export const useGetTopGross = () => {
  const url = requestUrl.topTenGross;
  const reqFunc = async () => {
    const res = await request(url, {});
    return res.feed.entry.map(
      (data) =>
        new AppStoreListItemClass(
          data['im:name'].label,
          data.category.attributes.label,
          data['im:image'][1].label,
          3,
          100,
          data.id.attributes['im:id'],
          data['im:artist'].label,
          data.summary.label,
        ),
    );
  };
  return useQuery([url], reqFunc, {
    staleTime: 0,
    cacheTime: 0,
    select: (resData) => {
      return resData;
    },
  });
};

export const useSpecificApp = (appId) => {
  const setting = useSetting();
  const errorPercentage = Math.random();
  const url = requestUrl.getSpecificApp;
  const reqFunc = async () => {
    await sleep(setting.throttle);
    const res = await request(url, { id: appId });
    if (errorPercentage < setting.failingRate) {
      throw new Error(
        'This is a fake ERROR, you will has a chance of gettting this:)',
      );
    }
    return res;
  };
  return useQuery([url, appId], reqFunc, {
    select: (resData) => {
      return resData;
    },
  });
};

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
