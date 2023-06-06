import Cookies from 'js-cookie'

window.Cookies = Cookies
const urlParams = new URLSearchParams(window.location.search)

if (window.Cookies.get('_obwc') === undefined) {
  const obwRegex = /^(?:\/[a-z]{2})?(?:-[a-z]{2})?\/application\//

  if (obwRegex.test(window.location.pathname)) {
    window.Cookies.set('_obwc', '1')
  }
}

// Set Cookies for Referrer (Bring a Friend)
;['fnref', 'lnref', 'mref'].forEach((key) => {
  if (urlParams.has(key)) {
    window.Cookies.set(key, urlParams.get(key))
  }
})
