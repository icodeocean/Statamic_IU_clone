export const setDomElementsToWindow = () => {
  window.domElements = {
    locale: document.querySelector('html').getAttribute('lang') || 'en',
    modals: document.querySelectorAll('.cp-modal'),
    buttons: document.querySelectorAll('.js-button[data-waiting-for-resource="true"]'),
    targetLinks: document.querySelectorAll('a[href^="#"]'),
    applyLinks: document.querySelectorAll('a[href*="/application/"]'),
    passParameterLinks: document.querySelectorAll(
      'a[href][data-pass-params="true"], form[action][data-pass-params="true"]'
    ),
    chatTriggers: document.querySelectorAll('a[href="#livechat"]'),
    sliders: document.querySelectorAll('.cp-slider'),
    searchPage: document.querySelector('.search-page'),
    catalogPage: document.querySelector('.catalog-page'),
    tabs: document.querySelectorAll('.tabs'),
    cpLeadForm: document.querySelector('.cp-lead-form'),
    cpBacklinks: document.querySelectorAll('.cp-backlink'),
    videos: document.querySelectorAll('video'),
    cpFileUploads: document.querySelectorAll('.cp-file-upload'),
    cpPopUp: document.querySelector('[id^="popup-"]'),
    cpGeoOverlay: document.querySelector('#geo-overlay'),
    formBuilderContainer: document.querySelector('.iu-formbuilder-container'),
    testimonials: document.querySelectorAll('.iu-testimonial-slider')
  }
}
