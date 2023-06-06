// Import Glide
import Glide from '@glidejs/glide'

export default () => {
  const gliders = window.domElements.sliders || []

  gliders.forEach((item) => {
    const slidesPerView = item.dataset.slidesPerView ?? 1

    try {
      new Glide('#' + item.id + ' .glide', {
        type: 'carousel',
        perView: slidesPerView
      }).mount()
    } catch (e) {
      console.error(e)
    }
  })
}
