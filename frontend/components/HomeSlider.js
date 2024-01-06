"use client";

import React, { useEffect, useRef, useState } from "react";

function HomeSlider() {
  const dotElementsRef = useRef([]);
  const heroSlideElementsRef = useRef([]);

  const [currentSlide, setCurrentSlide] = useState(0);

  let changeSlideInterval = useRef();

  const startSlideInterval = () => {
    changeSlideInterval.current = setInterval(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % dotElementsRef.current.length
      );
    }, 5000);
  };

  useEffect(() => {
    const dots = document.querySelectorAll(".dot");
    const heroSlides = document.querySelectorAll(".hero-slide");

    dotElementsRef.current = Array.from(dots);
    heroSlideElementsRef.current = Array.from(heroSlides);

    startSlideInterval();

    return () => clearInterval(changeSlideInterval);
  }, []);

  const changeSlide = (currentIndex) => {
    dotElementsRef.current.forEach((dot, index) => {
      dot.classList.toggle("active-dot", index === currentIndex);
    });
    heroSlideElementsRef.current.forEach((slide, index) => {
      const video = slide.querySelector("video");
      if (video) {
        if (index === currentIndex) {
          video.currentTime = 0;
          video.play();
        } else {
          video.pause();
        }
      }
      slide.classList.toggle("active-slide", index === currentIndex);
    });
  };

  // useEffect(() => {
  //   changeSlide(currentSlide);
  // }, [currentSlide]);

  // const handleDotClick = (index) => {
  //   clearInterval(changeSlideInterval.current);
  //   setCurrentSlide(index);
  //   startSlideInterval();
  // };

  return (
    <div className="relative h-full overflow-hidden">
      <div className="relative h-full flex justify-center content-center items-center">
        <div className="aspect-video absolute min-h-full w-content hero-slide active-slide">
          <video
            muted
            controls={false}
            disablePictureInPicture={true}
            disableRemotePlayback={true}
            className="h-full w-auto aspect-video pointer-events-none"
            playsInline
            autoPlay
            loop
          >
            <source src={"/videos/hero-banner-1.webm"} type="video/webm" />
            <source src={"/videos/hero-banner-1.mp4"} type="video/mp4" />
          </video>
        </div>
        {/* <div className="aspect-video absolute min-h-full w-content hero-slide">
          <video
            muted
            controls={false}
            disablePictureInPicture={true}
            disableRemotePlayback={true}
            className="h-full w-auto aspect-video pointer-events-none"
            playsInline
          >
            <source
              src={"/videos/hero-banner-2.webm"}
              type="video/webm"
              loading="lazy"
            />
            <source
              src={"/videos/hero-banner-2.mp4"}
              type="video/mp4"
              loading="lazy"
            />
          </video>
        </div>
        <div className="aspect-video absolute min-h-full w-content hero-slide">
          <video
            muted
            controls={false}
            disablePictureInPicture={true}
            disableRemotePlayback={true}
            className="h-full w-auto aspect-video pointer-events-none"
            playsInline
          >
            <source
              src={"/videos/hero-banner-3.webm"}
              type="video/webm"
              loading="lazy"
            />
            <source
              src={"/videos/hero-banner-3.mp4"}
              type="video/mp4"
              loading="lazy"
            />
          </video>
        </div> */}
      </div>
      {/* <div className="absolute bottom-[10px] w-full flex flex-row justify-center content-center items-center gap-[5px]">
        <div className="dot active-dot" onClick={() => handleDotClick(0)}>
          <div className="inner-dot"></div>
        </div>
        <div className="dot" onClick={() => handleDotClick(1)}>
          <div className="inner-dot"></div>
        </div>
        <div className="dot" onClick={() => handleDotClick(2)}>
          <div className="inner-dot"></div>
        </div>
      </div> */}
    </div>
  );
}

export default HomeSlider;
