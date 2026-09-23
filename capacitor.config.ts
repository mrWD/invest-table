import type { CapacitorConfig } from '@capacitor/cli'

/**
 * The native shell around the same Vite build the web gets.
 *
 * `webDir` is the ordinary `dist`: nothing is built twice, and a native release is
 * whatever `npm run build:native` produced plus `npx cap sync`.
 *
 * `androidScheme: 'https'` keeps Android on `https://localhost` rather than the legacy
 * `http://`, which is what makes the WebView treat the app as a secure context.
 */
const config: CapacitorConfig = {
  appId: 'com.mrwd.investtable',
  appName: 'InvestTable',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  ios: {
    // The light page plane, matching the light splash. The WebView shows this for the
    // instant before the first paint; App.tsx then takes the status bar to whichever
    // theme is actually in force.
    backgroundColor: '#f9f9f7',
  },
  android: {
    backgroundColor: '#f9f9f7',
  },
  plugins: {
    SplashScreen: {
      // main.tsx hides the splash when the first render actually happens, rather than
      // on a timer that would either cut it short or outlast it.
      launchAutoHide: false,
      backgroundColor: '#f9f9f7',
      androidSplashResourceName: 'splash',
    },
  },
}

export default config
