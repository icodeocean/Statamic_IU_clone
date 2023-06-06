// scrollTo animation
// import { captureException } from '@sentry/browser'

const scrollTo = (selector, position) => {
  let offset = 0

  if (selector.length) {
    const selectorElement = document.querySelector(selector)
    offset += getOffsetTop(selectorElement)
    offset -= 120
  }
  if (position || position === 0) {
    offset = position
  }

  window.scrollTo({
    top: offset,
    left: 0,
    behavior: 'smooth'
  })
}

const getOffsetTop = (element) => {
  let offsetTop = 0

  /**
   * Do...While is needed to get the exact offsetTop from an Element, because you else get the wrong value,
   * when it is inside and section
   */
  do {
    offsetTop += element.offsetTop || 0
    element = element.offsetParent
  } while (element)

  return offsetTop
}

const inViewport = (element) => {
  if (!element) return false

  const bounding = element.getBoundingClientRect()

  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

const getQueryParameter = (name) => {
  return new URLSearchParams(window.location.search).get(name)
}

const getLinkWithPassParameters = (link) => {
  try {
    let linkUrl

    if (link?.match(/^(?:http|https):\/\//)) {
      linkUrl = new URL(link)
    } else if (link?.match(/^\//)) {
      linkUrl = new URL(link, window.location.origin)
    } else {
      return link
    }

    const params = new URLSearchParams(window.location.search)
    const ignoreParams = ['gclid', 'dclid', 'wbraid', 'gbraid']

    params?.forEach((value, key) => {
      if (ignoreParams.includes(key)) {
        return
      }

      if (linkUrl?.searchParams?.has(key)) {
        linkUrl.searchParams.set(key, value)
      } else {
        linkUrl?.searchParams?.append(key, value)
      }
    })

    return linkUrl.toString()
  } catch (exception) {
    // captureException(exception)

    return link
  }
}

export { scrollTo, inViewport, getOffsetTop, getQueryParameter, getLinkWithPassParameters }
