export default () => {
  const initVideoTestimonial = (videoTestimonial) => {
    const videoQuote = videoTestimonial.querySelector('.video-quote')
    const videoDescription = videoTestimonial.querySelector('.video-description')
    const video = videoTestimonial.querySelector('video')
    const videoControlsOverlay = videoTestimonial.querySelector('.video-control-overlay')
    const quoteSwitches = videoTestimonial.querySelectorAll('.video-description-switch')
    const overlayPlayButton = videoTestimonial.querySelector('.testimonial-video-play-button')
    const overlayFullScreenButton = videoTestimonial.querySelector('.testimonial-video-full-screen-button')
    const videoDescriptionClasses = ['is-visible', '-mt-64']

    const toggleQuote = () => {
      videoQuote.classList.remove('hidden')
      const videoDescriptionVisible = videoDescription.classList.contains('is-visible')

      if (!videoDescriptionVisible) {
        videoDescription.classList.add(...videoDescriptionClasses)
        videoQuote.classList.remove('hidden')

        quoteSwitches.forEach((quoteSwitch) => {
          quoteSwitch.classList.add('rotate-180')
        })
      }

      if (videoDescriptionVisible) {
        videoDescription.classList.remove(...videoDescriptionClasses)
        videoQuote.classList.add('hidden')

        quoteSwitches.forEach((quoteSwitch) => {
          quoteSwitch.classList.remove('rotate-180')
        })
      }
    }

    const playFromOverlay = () => {
      videoControlsOverlay.classList.add('hidden')
      video.play()
      video.poster = ''
      video.classList.remove('object-cover')
      video.setAttribute('controls', true)
      if (videoDescription.classList.contains('is-visible')) {
        toggleQuote()
      }
    }

    const fullScreenFromOverlay = () => {
      videoControlsOverlay.classList.add('hidden')
      video.requestFullscreen()
      video.classList.remove('object-cover')
      video.setAttribute('controls', true)
    }

    quoteSwitches.forEach((quoteSwitch) => {
      quoteSwitch.addEventListener('click', toggleQuote)
    })
    overlayPlayButton.addEventListener('click', playFromOverlay)
    overlayFullScreenButton.addEventListener('click', fullScreenFromOverlay)
  }

  window.domElements.testimonials.forEach((testimonialSlider) => {
    testimonialSlider.querySelectorAll('.video-testimonial').forEach((videoTestimonial) => {
      initVideoTestimonial(videoTestimonial)
    })
  })
}
