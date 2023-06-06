export default () => ({
  hasCtaButton: false,
  isHandheldViewport: false,
  isMobileDevice: false,
  bodyNoScroll: false,
  scrollsUp: true,
  showPill: false,
  campus: false,
  online: true,
  currentBusinessUnit: "",
  units: null,
  scrollPosition: 0,
  viewport: null,
  pageColor: "",
  init() {
    this.updateViewport();
    this.units = JSON.parse(this.$root.dataset.units);
    this.updateBusinessUnit();
    // this.showPill = window.Cookies.get("show_pill") ?? false;

    // if (this.showPill) {
    //   this.adjustPageColorToPill();
    // }

    // const urlParams = new URLSearchParams(window.location.search);

    // if (urlParams.get("campus")) {
    //   this.adjustLinksToPill(true);
    //   this.campus = true;
    //   this.online = false;
    // }
  },
  updateBusinessUnit() {
    this.currentBusinessUnit = this.units[this.online ? "online" : "campus"];

    document.querySelectorAll("cp-formbuilder").forEach((form) => {
      form.shadowRoot
        ?.getElementById("businessUnit")
        ?.setAttribute("cp-value", this.currentBusinessUnit);
    });
  },
  updateViewport() {
    const width = window.innerWidth;
    this.viewport =
      width >= 1536
        ? "2xl"
        : width >= 1280
        ? "xl"
        : width >= 1024
        ? "lg"
        : width >= 768
        ? "md"
        : "sm";
    this.isMobileDevice = this.viewport === "sm" || this.viewport === "md";
    this.isHandheldViewport = this.isMobileDevice || this.viewport === "lg";
  },
  handleScroll() {
    this.scrollsUp =
      document.body.getBoundingClientRect().top > this.scrollPosition;
    this.scrollPosition = document.body.getBoundingClientRect().top;
  },
  toggleVariant() {
    this.campus = !this.campus;
    this.online = !this.online;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete("campus");
    if (this.campus) {
      urlParams.set("campus", "true");
    }

    this.triggerCatalogFilterUpdate();
    this.adjustPageColorToPill();
    this.adjustLinksToPill(this.campus);

    history.replaceState(
      null,
      null,
      urlParams.toString() ? "?" + urlParams.toString() : "."
    );
    this.updateBusinessUnit();
    this.pushDataLayerEvent();
  },
  adjustLinksToPill(campus) {
    if (campus) {
      document.querySelectorAll("a").forEach((link) => {
        // Ignore for same-page links with fragments
        if (
          !link.href ||
          (link.pathname === window.location.pathname && link.hash)
        ) {
          return;
        }

        let url = new URL(link.href);
        url.searchParams.set("campus", "true");
        link.href = url.href;
      });
    } else {
      document.querySelectorAll("a").forEach((link) => {
        if (link.href) {
          let url = new URL(link.href);
          url.searchParams.delete("campus");
          link.href = url.href;
        }
      });
    }
  },
  triggerCatalogFilterUpdate() {
    const activeFilter = document.querySelector(".is-active");
    if (activeFilter) {
      // Wouldn't work without a timeout, maybe Alpine does it asynchronously otherwise or something?
      setTimeout(() => {
        // Trigger filter results calculation
        activeFilter.click();
      }, 1);
    }
  },
  adjustPageColorToPill() {
    const campusColor = "green";
    const onlineColor = "orange";
    let oldColor = this.campus ? onlineColor : campusColor;
    let newColor = this.campus ? campusColor : onlineColor;

    if (this.pageColor === "") {
      this.pageColor = this.$root.dataset.color;
      oldColor = this.pageColor;
    }

    document.querySelectorAll(`[class*=bg-${oldColor}]`).forEach((element) => {
      element.classList.value = element.classList.value.replaceAll(
        `bg-${oldColor}`,
        `bg-${newColor}`
      );
    });

    document
      .querySelectorAll(`[class*=border-${oldColor}]`)
      .forEach((element) => {
        element.classList.value = element.classList.value.replaceAll(
          `border-${oldColor}`,
          `border-${newColor}`
        );
      });
  },
  pushDataLayerEvent() {
    dataLayer.push({
      event: "pageview",
      page: {
        world: this.campus ? "campus_true" : "campus_false",
      },
    });
  },
});
