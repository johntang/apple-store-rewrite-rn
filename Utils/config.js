import Constants from 'expo-constants';

const MAJOR = 1;
const MINOR = 0;
const PATCH = 0;

export const VERSION = `${MAJOR}.${MINOR}.${PATCH}`;
export const FETCHING_TIMEOUT = 3000;
export const BASE_URL = Constants.manifest.extra.rootApiUrl;
