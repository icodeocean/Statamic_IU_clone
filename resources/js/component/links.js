import { getLinkWithPassParameters } from '../core/helper.js'

export default () => {
  if (window.domElements.targetLinks.length) {
    handleTargetLinks()
  }

  if (window.domElements.passParameterLinks.length) {
    handlePassParameterLinks()
  }

  if (window.domElements.applyLinks.length) {
    handleApplyLink()
  }
}

const handleTargetLinks = () => {
  const exceptions = ['#livechat', '#uc-corner-modal-show']

  window.domElements.targetLinks.forEach((targetLink) => {
    const href = targetLink.getAttribute('href')
    const matches = href.match(/^#([^!?])+/)

    if (matches) {
      const targetId = matches[0]

      if (!exceptions.includes(targetId) && !targetId.startsWith('#modal')) {
        const scrollTarget = document.querySelector(targetId)

        if (!scrollTarget) {
          targetLink.remove()
        }
      }
    }
  })
}

const handlePassParameterLinks = () => {
  window.domElements.passParameterLinks.forEach((element) => {
    if (element.tagName === 'A') {
      element.setAttribute('href', getLinkWithPassParameters(element.getAttribute('href')))
    } else if (element.tagName === 'FORM') {
      element.setAttribute('action', getLinkWithPassParameters(element.getAttribute('action')))
    }
  })
}

const handleApplyLink = () => {
  window.domElements.applyLinks.forEach((applyLink) => {
    applyLink.setAttribute('href', getLinkWithPassParameters(document.body.dataset.application))
  })
}
