# React + TypeScript + Vite

Этот шаблон предоставляет минимальную настройку для работы React в Vite с поддержкой HMR и некоторыми правилами ESLint.

В настоящее время доступны два официальных плагина:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md), использующий [Babel](https://babeljs.io/) для Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc), использующий [SWC](https://swc.rs/) для Fast Refresh

## Расширение конфигурации ESLint

Если вы разрабатываете приложение для продакшена, рекомендуем обновить конфигурацию для включения правил линтинга, основанных на типах:

- Настройте свойства `parserOptions` на верхнем уровне так:

```js
export default {
  // другие правила...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
