document.addEventListener("alpine:init", function () {
  Alpine.data("modalAlpine", function () {
    return {
      isOpen: !1,
      modalId: null,
      cookieLifetime: 365,
      init: function () {
        var t,
          i = this;
        (this.modalId = this.$root.getAttribute("id")),
          this.$watch("isOpen", function (t) {
            i.bodyNoScroll = t;
            var e = t ? "modal-shown" : "modal-closed";
            i.$dispatch(e, {
              id: i.modalId,
            });
          }),
          "true" ===
            (null === (t = this.$root.dataset) || void 0 === t
              ? void 0
              : t.shown) && (this.isOpen = !0),
          "geo-overlay" === this.modalId
            ? this.initGeoOverlay()
            : this.modalId.startsWith("popup") &&
              this.$nextTick(function () {
                return i.initPopUp();
              }),
          document
            .querySelectorAll('[href="#'.concat(this.modalId, '"]'))
            .forEach(function (t) {
              t.addEventListener("click", function (t) {
                t.preventDefault(), (i.isOpen = !0);
              });
            }),
          this.$root.querySelectorAll(".cp-modal-close").forEach(function (t) {
            t.addEventListener("click", function (t) {
              t.preventDefault(), (i.isOpen = !1);
            });
          });
      },
      setStayCookie: function () {
        window.Cookies.set("stay_on_page", !0);
      },
      initGeoOverlay: function () {
        "true" === document.body.dataset.hideGeoOverlay && this.setStayCookie();
        var t = window.Cookies.get("stay_on_page");
        (void 0 !== t && "true" === t) || (this.isOpen = !0);
      },
      initPopUp: function () {
        var t = JSON.parse(this.$root.dataset.activeDevices),
          i = (null == t ? void 0 : t.desktop) || !1,
          e = (null == t ? void 0 : t.mobile) || !1;
        if (
          (i && e) ||
          (i && !this.isHandheldViewport) ||
          (e && this.isHandheldViewport)
        ) {
          var o = parseInt(this.$root.dataset.cookieLifetime || 0),
            n = window.Cookies.get("stay_on_page");
          if (
            (o > 0 && (this.cookieLifetime = o),
            void 0 !== window.Cookies.get(this.modalId) ||
              (document.querySelector("#geo-overlay") && void 0 === n))
          )
            return;
          this.isOpen = !0;
        }
      },
      setPopUpCookie: function () {
        window.Cookies.set(this.modalId, !0, {
          expires: this.cookieLifetime,
        });
      },
      closePopUp: function (t) {
        this.setPopUpCookie(), (window.location.href = t.getAttribute("href"));
      },
    };
  });
});
