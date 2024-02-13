// i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en  from './componets/locale/en/global.json'; // 英文翻译文件路径
import zh  from './componets/locale/zh/global.json'; // 中文翻译文件路径

export const languageResources = {
  en: {translation: en},
  zh: {translation: zh},
}

i18n
  .use(initReactI18next)
  .init({
    resources: languageResources,
    lng: 'en', // 默认语言
    fallbackLng: 'en', // 如果找不到翻译，回退到默认语言
    keySeparator: false, // 用于在翻译文件中指定嵌套键的分隔符
    interpolation: {
      escapeValue: false, // 不要转义字符串，允许在翻译中使用 HTML 或 React 组件
    },
  });

export default i18n;
