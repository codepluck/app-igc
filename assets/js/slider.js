document.addEventListener("DOMContentLoaded", function () {
    let element = document.querySelector(".splide-carousel");
    if (typeof (element) != 'undefined' && element != null) {
        let splide = new Splide(".splide-carousel", {
            type: "loop",
            perPage: 1,
            padding: "15rem",
            pagination: false,
            breakpoints: {
                768: {
                    perPage: 1,
                    height: '16rem',
                },
                480: {
                    perPage: 1,
                    pagination: false,
                    height: '12rem',
                    padding: "2rem",
                },
            },
        }).mount();
    }
    let splideContent = document.querySelector(".splide-content");
    if (typeof (splideContent) != 'undefined' && splideContent != null) {
        let containerSplide = new Splide(".splide-content", {
            type: "loop",
            perPage: 1,
            autoplay: true,
            interval: 15000,
            pagination: true,
            classes: {
                arrows: "splide__arrows",
                arrow: "splide__arrow",
                prev: "splide__arrow--prev content-arrow-prev",
                next: "splide__arrow--next content-arrow-next",
            },
        });
        containerSplide.mount();
    }
    let splideBanner = document.querySelector(".splide-content");
    if (typeof (splideBanner) != 'undefined' && splideBanner != null) {
        let bannerSlide = new Splide(".banner-slide", {
            type: "loop",
            perPage: 1,
            autoplay: true,
            interval: 15000,
            pagination: true,
            infinite: false,
            drag: false,
            dragAngleThreshold: 0,
            cover: true,
            classes: {
                arrows: "splide__arrows",
                arrow: "splide__arrow",
                prev: "splide__arrow--prev banner-arrow-prev",
                next: "splide__arrow--next banner-arrow-next",
            },
        });
        bannerSlide.on('move', function () {
            return false;
        });
        bannerSlide.mount()
    }
});
feather.replace();
