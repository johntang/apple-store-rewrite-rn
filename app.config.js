// Just to demostration setting envrionment
let rootApiUrl = 'https://itunes.apple.com/hk/';
switch (process.env.SERVER_CONN) {
  case 'us':
    rootApiUrl = 'https://itunes.apple.com/us/';
    break;
  case 'hk':
    rootApiUrl = 'https://itunes.apple.com/hk/';
    break;
  default:
    rootApiUrl = 'https://itunes.apple.com/hk/';
    break;
}

export default {
  name: 'app-store-rewrite',
  slug: 'app-store-rewrite',
  version: '1.0.0',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    rootApiUrl,
  },
};
