import { getQueryParameter } from "./helper";

export default () => {
  const { domElements } = window;
  const modules = [
    // {
    //   loadDefault: async () => (await import('../component/button')).default(),
    //   test: () => domElements.buttons.length
    // },
    {
      loadDefault: async () => (await import("../component/links")).default(),
      test: () =>
        domElements.targetLinks.length ||
        domElements.passParameterLinks.length ||
        domElements.applyLinks.length,
    },
    // {
    //   loadDefault: async () => (await import('../component/chat')).default(),
    //   test: () => domElements.chatTriggers.length
    // },
    {
      loadDefault: async () => (await import("../component/slider")).default(),
      test: () => domElements.sliders.length,
    },
    // {
    //   loadDefault: async () => (await import('../component/search-page')).default(),
    //   test: () => domElements.searchPage
    // },
    // {
    //   loadDefault: async () => (await import('../component/catalog-page')).default(),
    //   test: () => domElements.catalogPage
    // },
    // {
    //   loadDefault: async () => (await import('../component/backlink')).default(),
    //   test: () => domElements.cpBacklinks.length
    // },
    // {
    //   loadDefault: async () => (await import('../tracking/video-tracking')).default(),
    //   test: () => domElements.videos.length
    // },
    // {
    //   loadDefault: async () => (await import('../component/file-upload')).default(),
    //   test: () => domElements.cpFileUploads.length && getQueryParameter('key')
    // },
    {
      loadDefault: async () =>
        (await import("../component/form-builder")).default(),
      test: () => domElements.formBuilderContainer,
    },
    // {
    //   loadDefault: async () => (await import('../tracking/form-builder')).default(),
    //   test: () => domElements.formBuilderContainer && /\/application\//.test(window.location.pathname)
    // },
    {
      loadDefault: async () =>
        (await import("../component/testimonial")).default(),
      test: () => domElements.testimonials.length,
    },
  ];

  modules.forEach((module) => module.test() && module.loadDefault());
};
