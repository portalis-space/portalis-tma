import { mockTelegramEnv, isTMA } from '@telegram-apps/sdk-react';

// It is important, to mock the environment only for development purposes. When building the
// application, process.env.NODE_ENV === 'development' will become false, and the code inside will be tree-shaken,
// so you will not see it in your final bundle.
if (process.env.NODE_ENV === 'development' && !isTMA('simple') && typeof window !== "undefined") {
  mockTelegramEnv({
    themeParams: {
      accentTextColor: '#6ab2f2',
      bgColor: '#17212b',
      buttonColor: '#5288c1',
      buttonTextColor: '#ffffff',
      destructiveTextColor: '#ec3942',
      headerBgColor: '#17212b',
      hintColor: '#708499',
      linkColor: '#6ab3f3',
      secondaryBgColor: '#232e3c',
      sectionBgColor: '#17212b',
      sectionHeaderTextColor: '#6ab3f3',
      subtitleTextColor: '#708499',
      textColor: '#f5f5f5',
    },
    initData: {
      user: {
        id: 1912605236,
        firstName: 'Gia',
        lastName: 'Endong',
        username: 'giaendong',
        languageCode: 'en',
        allowsWriteToPm: true,
      },
      hash: '62fcff944c1115b72d81bee12eb8a33ae7120bc78c173300f56f3adb7ef1527d',
      authDate: new Date('2024-10-04T08:40:00.000Z'),
      queryId: "AAE0CgByAAAAADQKAHL8VoBW"
    },
    initDataRaw: "query_id=AAE0CgByAAAAADQKAHL8VoBW&user=%7B%22id%22%3A1912605236%2C%22first_name%22%3A%22Gia%22%2C%22last_name%22%3A%22Endong%22%2C%22username%22%3A%22giaendong%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1728031200&hash=62fcff944c1115b72d81bee12eb8a33ae7120bc78c173300f56f3adb7ef1527d",
    version: '7.10',
    platform: 'web',
  });
  console.info(
    'As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram.',
  );
}