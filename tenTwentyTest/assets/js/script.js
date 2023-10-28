$(document).ready(function () {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    //  Mobile Menu Nav Toggle
    $('.menu-btn').click(function () {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('.navbar').addClass('active');
        } else {
            $('.navbar').removeClass('active');
        }
    });

    // Hero Slider

    var $bar,
        $slick,
        tick

    var $slick = $('.banner-slider');
    var $status = $('.slider-pagination');


    $slick.on('init reInit afterChange', function (e, slick, currentSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $status.html('<span class="slideNumber">0' + i + '</span>' + '<span class="line"></span> 0' + slick.slideCount);
    });

    $slick.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: false,
        nextArrow: '<button type="button" class="slick-custom-buttom slick-next"><div data-slick-index="0" class="progress-bar"></div></button>',
        useTransform: false,
        infinite: true,
        speed: 500,
        fade: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        swipe: false
    });
    // Slider Clip Path Effect
    $slick.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        const slideImageWrapper = slick.$slides[nextSlide].querySelector('.slider-image');
        const $nextSlide = slick.$slides[nextSlide];
        const slideTimeline = gsap.timeline();
        slideTimeline.set(slideImageWrapper, {
            clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
            webkitClipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)"
        });
        slideTimeline.fromTo(slideImageWrapper, {
            clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
            webkitClipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)'
        }, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            webkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 2,
        });
        slideTimeline.to($nextSlide.querySelector('.hero-image'), {
            scale: 1.2,
            duration: 2,
        }, '<');
        startProgressbar();

    });

    //Next Thumb

    setTimeout(function () {
        $('.slick-next').append('<span>Next</span><div class="next-slick-img slick-thumb-nav"><img src="/img.jpg" class="thumb"></div>');
        get_next_slick_img();
    }, 500);


    $slick.on("afterChange", function () {
        get_next_slick_img();
    });

    $slick.on('click', '.slick-next', function (e) {
        get_next_slick_img();
    });

    function get_next_slick_img() {
        var currentSlideIndex = $('.slick-slider').slick('slickCurrentSlide');
        var $nextSlide = $('.slick-slider').find('.slick-slide').eq(currentSlideIndex + 1);

        if ($nextSlide.length > 0) {
            var nextSlickImg = $nextSlide.find('.slider-image img').attr('src');
            $('.next-slick-img img').attr('src', nextSlickImg);
            $('.next-slick-img').css('background-image', 'url(' + nextSlickImg + ')');
        }
    }

    // Progress Bar 

    $bar = $('.progress-bar');

    function startProgressbar() {
        resetProgressbar();
        tick = setInterval(interval, 30);
    }

    function interval() {
        $bar.css({
            Animation: "progress 4s linear forwards"
        });
    }

    function resetProgressbar() {
        $bar.css({
            Animation: "stop 4s linear forwards"
        });
        clearTimeout(tick);
    }


    startProgressbar();






    /*======================================
     Title Animation
    ========================================*/
    let splitTitleLines = gsap.utils.toArray(".title-anim");

    splitTitleLines.forEach(splitTextLine => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: splitTextLine,
                start: 'top 100%',
                end: 'bottom 60%',
                scrub: false,
                markers: false,
                toggleActions: 'play none none none'
            }
        });

        const itemSplitted = new SplitType(splitTextLine, {
            type: "words, lines"
        });
        gsap.set(splitTextLine, {
            perspective: 400
        });
        itemSplitted.split({
            type: "lines"
        })
        tl.from(itemSplitted.lines, {
            duration: 1,
            delay: 0.3,
            opacity: 0,
            rotationX: -80,
            force3D: true,
            transformOrigin: "top center -50",
            stagger: 0.3
        });
    });

    /*======================================
     Paragraph Animation 
    ========================================*/
    let char_come = document.querySelectorAll(".animation__char_come")

    char_come.forEach((char_come) => {
        let split_char = new SplitType(char_come, {
            type: "chars, words,"
        })
        gsap.from(split_char.chars, {
            duration: 1,
            x: 70,
            autoAlpha: 0,
            stagger: 0.06
        });
    })



    /*======================================
        Product Slider
    ========================================*/

    let slideVerticalOffset = window.matchMedia('(max-width: 767px)').matches ? 25 : 50;

    const productSlider = new Swiper(".products-swiper .swiper", {
        speed: 1000,
        grabCursor: true,
        centeredSlides: true,
        effect: "creative",
        slidesPerView: 3,
        initialSlide: 0,
        loop: true,
        spaceBetween: -270,
        creativeEffect: {
            perspective: true,
            limitProgress: 20,
            prev: {
                shadow: false,
                translate: ["-100%", slideVerticalOffset, 0],
                rotate: [0, 0, -9.50],
            },
            next: {
                shadow: false,
                translate: ["100%", slideVerticalOffset, 0],
                rotate: [0, 0, 9.50],
            },
        },

        breakpoints: {
            414: {
                spaceBetween: -290,
            },
            667: {
                spaceBetween: -300,
            },
            768: {
                spaceBetween: -400,
            },
            820: {
                spaceBetween: -380,
            },
            990: {
                spaceBetween: -300,
            },
            1440: {
                spaceBetween: -150,
            },
        },
    });

    window.addEventListener('resize', function (e) {
        slideVerticalOffset = window.matchMedia('(max-width: 767px)').matches ? 25 : 50;
        productSlider.params.creativeEffect.prev.translate[1] = slideVerticalOffset;
        productSlider.params.creativeEffect.next.translate[1] = slideVerticalOffset;
        productSlider.update(); // Update Swiper settings
    });



    /*======================================
        Mouse Custom Cursor
    ========================================*/
    const ProductSection = document.querySelector('.products-swiper');
    const cursor = document.querySelector('.cursor');

    if (ProductSection) {
        ProductSection.addEventListener("mouseenter", () => {
            cursor.style.opacity = 1;
            window.addEventListener('mousemove', handleMouseMove);
        });

        ProductSection.addEventListener("mouseleave", () => {
            cursor.style.opacity = 0;
            window.removeEventListener('mousemove', handleMouseMove);
        });

        function handleMouseMove(event) {
            const { clientX: mouseX, clientY: mouseY } = event;

            gsap.to(cursor, {
                duration: 0.3,
                left: mouseX,
                top: mouseY,
                ease: 'power2.out',
            });
        }
    }






});