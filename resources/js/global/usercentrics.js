const styleConsent = () => {
  const ucRoot = document.querySelector('#usercentrics-root')?.shadowRoot
  const ucAnchors = ucRoot?.querySelector('[data-testid="uc-anchors"]')

  if (!ucAnchors) {
    return setTimeout(styleConsent, 100)
  }

  const isDachViewer = document.body.dataset.market === 'dach'

  if (isDachViewer) {
    ucAnchors.parentNode.style = 'margin-top: -5px;margin-left: 8px;margin-bottom: 20px;'
  } else {
    ucAnchors.parentNode.style = 'margin-bottom: 8px;display:flex;justify-content:center;'
    ucAnchors.firstChild.insertAdjacentHTML('afterend', '&nbsp;|&nbsp;')
    ucAnchors.firstChild.style = 'padding-top: 0; margin-left: 12px;'
    ucAnchors.lastChild.style = 'padding-top: 0; margin-left: 12px;'
    ucRoot.querySelector('[data-testid="uc-accept-all-button"]').innerText = 'Accept'
  }

  ucRoot.querySelector('[data-testid="uc-footer"]').insertAdjacentHTML('beforeend', ucAnchors.parentNode.outerHTML)
  ucAnchors.parentNode.style.display = 'none'

  const styles = document.createElement('link')
  styles.rel = 'stylesheet'

  if (isDachViewer) {
    styles.href = '/css/uc-dach.css'
  } else {
    styles.href = '/css/uc.css'
  }

  ucRoot.appendChild(styles)
}

styleConsent()
document.querySelectorAll('a[href="#uc-corner-modal-show"]').forEach((element) => {
  element.addEventListener('click', (e) => {
    e.preventDefault()
    window.UC_UI.showSecondLayer()
  })
})
