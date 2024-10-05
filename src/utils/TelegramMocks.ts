import { mockTelegramEnv, isTMA } from '@telegram-apps/sdk-react';

// It is important, to mock the environment only for development purposes. When building the
// application, process.env.NODE_ENV === 'development' will become false, and the code inside will be tree-shaken,
// so you will not see it in your final bundle.
if (process.env.NODE_ENV === 'development' && !isTMA('simple') && typeof window !== "undefined") {
  mockTelegramEnv({
    "initData": {
        "authDate": new Date("2024-10-05T11:13:40.000Z"),
        "hash": "f991e00cc5290ae1a66c4297d2ac7f28405f34a161ccc433ede9dbfc4e0fb577",
        "queryId": "AAE0CgByAAAAADQKAHJuRjm_",
        "user": {
            "allowsWriteToPm": true,
            "firstName": "Gia",
            "id": 1912605236,
            "languageCode": "en",
            "lastName": "Endong",
            "username": "giaendong"
        }
    },
    "initDataRaw": "query_id=AAE0CgByAAAAADQKAHJuRjm_&user=%7B%22id%22%3A1912605236%2C%22first_name%22%3A%22Gia%22%2C%22last_name%22%3A%22Endong%22%2C%22username%22%3A%22giaendong%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1728126820&hash=f991e00cc5290ae1a66c4297d2ac7f28405f34a161ccc433ede9dbfc4e0fb577",
    "platform": "web",
    "themeParams": {
        "bgColor": "#212121",
        "buttonColor": "#8774e1",
        "buttonTextColor": "#ffffff",
        "hintColor": "#aaaaaa",
        "linkColor": "#8774e1",
        "secondaryBgColor": "#181818",
        "textColor": "#ffffff",
        "headerBgColor": "#212121",
        "accentTextColor": "#8774e1",
        "sectionBgColor": "#212121",
        "sectionHeaderTextColor": "#8774e1",
        "subtitleTextColor": "#aaaaaa",
        "destructiveTextColor": "#ff595a"
    },
    "version": "7.10"
});
  console.info(
    'As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram.',
  );
}