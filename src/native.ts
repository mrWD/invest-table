/**
 * Everything that only means something inside the Capacitor shell.
 *
 * All of it is guarded by `isNativePlatform()` and every import is dynamic, so the web
 * build neither runs nor ships this code. The plugins are in `dependencies` because the
 * native projects need them at sync time, not because the browser ever loads them.
 */
import { Capacitor } from '@capacitor/core'

export const isNative = (): boolean => Capacitor.isNativePlatform()

/** The status bar has to be told the theme; it does not follow the page's colour scheme. */
export async function applyStatusBar(dark: boolean): Promise<void> {
  if (!isNative()) return
  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar')
    await StatusBar.setStyle({ style: dark ? Style.Dark : Style.Light })
    if (Capacitor.getPlatform() === 'android') {
      // Android draws the bar's own background; iOS overlays the WebView instead.
      await StatusBar.setBackgroundColor({ color: dark ? '#0d0d0d' : '#f9f9f7' })
    }
  } catch {
    // An older shell without the plugin is not a reason to fail the render.
  }
}

/** Hidden once React has actually painted, rather than on a timer that guesses. */
export async function hideSplash(): Promise<void> {
  if (!isNative()) return
  try {
    const { SplashScreen } = await import('@capacitor/splash-screen')
    await SplashScreen.hide()
  } catch {
    /* nothing to hide */
  }
}

/**
 * Android's back button. The app is one screen, so there is nothing to go back to —
 * without this the button does nothing at all, which reads as a frozen app; with it the
 * app closes, which is what a single-screen app should do.
 */
export async function wireBackButton(): Promise<void> {
  if (!isNative() || Capacitor.getPlatform() !== 'android') return
  try {
    const { App } = await import('@capacitor/app')
    await App.addListener('backButton', () => {
      void App.exitApp()
    })
  } catch {
    /* no plugin, no listener */
  }
}

/** A light tick when a year block opens. Silently absent on the web. */
export function tapped(): void {
  if (!isNative()) return
  void import('@capacitor/haptics')
    .then(({ Haptics, ImpactStyle }) => Haptics.impact({ style: ImpactStyle.Light }))
    .catch(() => {
      /* haptics are a nicety */
    })
}
