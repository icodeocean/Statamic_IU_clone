import { scrollTo } from '../core/helper.js'
/* global ga */

const showSuccessElement = () => {
  const leadFormElement = document.querySelector('#lead-form')
  const successElement = document.querySelector('.cp-lead-form-success')
  const leadErrorElement = document.querySelector('.cp-lead-form-error')

  if (!leadFormElement || !successElement) {
    console.warn('LeadForm or SuccessElement not Found.')
  }

  leadFormElement.classList.add('hidden')
  leadErrorElement.classList.add('hidden')
  successElement.classList.remove('hidden')
  scrollTo('.cp-lead-form-success')
}

const showErrorElement = () => {
  const leadErrorElement = document.querySelector('.cp-lead-form-error')

  leadErrorElement.classList.remove('hidden')
}

const setSuccessPageValues = (formData) => {
  document.querySelector('.firstname-placeholder').innerText = ' ' + formData.firstName.trim()
}

// Tracking
export const getGaFormData = () => {
  const trackingData = {
    gaClientId: null,
    gaUserId: null,
    gaTrackId: null
  }

  if (window.ga && ga.create) {
    ga((tracker) => {
      if (typeof tracker === 'undefined') {
        tracker = ga.getAll()[0]
      }

      trackingData.gaClientId = tracker.get('clientId') || null
      trackingData.gaUserId = tracker.get('userId') || null
      trackingData.gaTrackId = tracker.get('trackingId') || null
    })
  }

  return trackingData
}

/**
 *
 *
 * @param action
 * @param state
 */
const showSuccessPageSubscription = (action, state) => {
  if (action.type === 'settings/updateField' && action.payload?.name === 'submitSuccess') {
    if (action.payload?.value === true) {
      showSuccessElement()

      const formData = state?.formData?.formData

      setSuccessPageValues(formData)
    }

    if (action.payload?.value === false) {
      showErrorElement()
    }
  }
}

const addToFormData = (store) => {
  setTimeout(() => {
    if (window.innerWidth < 1024) {
      scrollTo('#lead-form')
    }
    const trackingData = getGaFormData()
    store.dispatch('formData/update', trackingData)

    const formdata = store.getters['formData/all']
    if (!formdata.businessUnit && document.body.dataset.businessUnit) {
      const defaults = { businessUnit: document.body.dataset.businessUnit }
      store.dispatch('formData/update', defaults)
    }
  }, 1000)
}

window.customJS = {
  onBeforeMount: [],
  onMounted: [addToFormData],
  subscribeAction: [showSuccessPageSubscription],
  subscribeMutation: [],
  onBeforeSubmit: []
}
