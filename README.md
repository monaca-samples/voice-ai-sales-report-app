## Voice-based AI Sales Report App

Android and IOS app to generate flexible sales reports from voice recording. Uses GEMINI API to generate the report, which is the displayed to the user through a preview, allowing download in both .pdf and .txt formats. Developed with Capacitor.


# Setup
Create a file `env.js` inside of `src/js` with the following content. Use your gemini API key
```
const env = {
  API_KEY: 'YOUR_API_KEY',
};
  
export default env;
```
