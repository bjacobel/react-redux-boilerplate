import config from '../../config';

export const IS_PROD = process.env.NODE_ENV === 'production';
export const SHOW_DEV_TOOLS = !IS_PROD;
export const TRACK_ANALYTICS = IS_PROD;
export const LOG_ERRORS = IS_PROD;
export const DATA = {
  text: 'an opinionated skeleton to quickly set up a new React app',
};
export const RAVEN_ENDPT = config.RavenDSN;
export const GA_ID = config.GAProperty;
export const RELEASE = process.env.TRAVIS_COMMIT;
