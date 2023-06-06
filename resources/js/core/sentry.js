import * as Sentry from '@sentry/browser'

Sentry.init({
  sampleRate: 0.1,
  dsn: document.currentScript.dataset.dsn,
  release: process.env.MIX_SENTRY_RELEASE ?? '1.0',
  environment: document.body.dataset.environment,
  autoSessionTracking: false,
  denyUrls: [
    // Files
    // /\/formbuilder\.js/i,
    /\/intl-tel-input-utils\.js/i,
    // Domains
    /sgtm\.iu\.org/i,
    /google-analytics\.com/i,
    /googletagmanager\.com/i,
    /abtasty\.com/i,
    /mouseflow\.com/i,
    /nanorep\.co/i,
    /boldchat\.com/i,
    /usercentrics\.eu/i,
    /facebook\.com/i,
    /hellopeter\.com/i,
    /polyfill\.io/i,
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i
  ],

  ignoreErrors: [
    /(NetworkError|network error)/i,
    /Failed to Fetch/i,
    /ResizeObserver/i,
    /_AutofillCallbackHandler/i,
    /aborted by the user/i,
    /cancelled/i
  ],

  initialScope: (scope) => {
    scope.setTag('locale', document.documentElement?.lang)
    scope.setTag('country', document.body?.dataset?.country)

    return scope
  },

  beforeSend(event) {
    const frames = event.exception?.values[0].stacktrace?.frames

    if (frames) {
      const lastFilename = frames[frames.length - 1].filename ?? null

      // Ignore Errors that come from an anonymous script or are a native browser issue
      if (hasUnknownFilename(lastFilename)) {
        if (frames.every((frame) => hasUnknownFilename(frame?.filename))) {
          return null
        }
      }
    }

    return event
  }
})

const hasUnknownFilename = (filename) => {
  return !filename || filename === '<anonymous>' || filename === '<unknown module>' || filename === '[native code]'
}
