import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';

export type MessageLanguages = keyof typeof messages;
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
const language: MessageLanguages = localStorage.getItem('language') ? JSON.parse(localStorage.getItem('language')).value : 'en-US';

// Type-define 'en-US' as the master schema for the resource
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
export type MessageSchema = typeof messages[language];

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-interface */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema { }

  // define the datetime format schema
  export interface DefineDateTimeFormat { }

  // define the number format schema
  export interface DefineNumberFormat { }
}
/* eslint-enable @typescript-eslint/no-empty-interface */

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: language,
    legacy: false,
    messages,
  });

  // Set i18n instance on app
  app.use(i18n);
});
