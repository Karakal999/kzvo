import 'i18next';

// Import translation resources
import type commonUk from '../locales/uk/common.json';
import type navigationUk from '../locales/uk/navigation.json';
import type pagesUk from '../locales/uk/pages.json';
import type aboutUk from '../locales/uk/about.json';
import type newsUk from '../locales/uk/news.json';
import type mediaUk from '../locales/uk/media.json';

// Declare custom type options for i18next
declare module 'i18next' {
  interface CustomTypeOptions {
    // Set default namespace
    defaultNS: 'common';
    
    // Define resources type
    resources: {
      common: typeof commonUk;
      navigation: typeof navigationUk;
      pages: typeof pagesUk;
      about: typeof aboutUk;
      news: typeof newsUk;
      media: typeof mediaUk;
    };
    
    // Return type when translation is missing
    returnNull: false;
  }
}
