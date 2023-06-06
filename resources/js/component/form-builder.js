import { inViewport } from '../core/helper'

let loaded = false

export default () => {
  checkInViewport()
  window.addEventListener('scroll', checkInViewport, { passive: true })
  if (!window.formEvents) {
    window.formEvents = new EventTarget()
  }

  window.formEvents.addEventListener('mm-one-page-cnb-FormSubmittedSuccessfully', afterFormSubmit)
}

const checkInViewport = () => {
  const formBuilderContainer = domElements.formBuilderContainer
  const scriptPath = window.formBuilderScriptPath ?? ''

  if (!scriptPath.length) {
    removeListener()
  }

  if (!loaded && inViewport(formBuilderContainer)) {
    removeListener()

    const head = document.head
    const script = document.createElement('script')

    script.type = 'text/javascript'
    script.src = scriptPath

    head.appendChild(script)
  }
}

const removeListener = () => {
  loaded = true
  window.removeEventListener('scroll', checkInViewport)
}

const afterFormSubmit = (e) => {
  const formData = e.detail.store.getters['formData/all']

  // Click and buy
  if (formData['businessUnit'] === 'eu' && formData['ClickAndBuy'] && formData['clickAndBuySummary']) {
    e.detail.store.dispatch('priceSummary/updateField', { name: 'sections', value: formData['clickAndBuySummary'] })
  }
}
