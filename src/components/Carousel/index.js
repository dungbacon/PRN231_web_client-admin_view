import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const isDisabled = (input) => {
    if (input === "prev") {
      return currentIndex === 0 ? true : false;
    }

    if (input === "next") {
      return currentIndex + 2 === slides.length - 1 ? true : false;
    }
    return false;
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-[1400px] h-[110px] w-full relative group flex justify-center mb-5">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex]})` }}
        className="w-[110px] h-[110px] rounded-xl bg-center bg-cover duration-500 mr-3"
      ></div>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex + 1]})` }}
        className="w-[110px] h-[110px] rounded-xl bg-center bg-cover duration-500 mr-3"
      ></div>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex + 2]})` }}
        className="w-[110px] h-[110px] rounded-xl bg-center bg-cover duration-500"
      ></div>
      {/* Left Arrow */}
      <button
        disabled={isDisabled("prev")}
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        onClick={prevSlide}
      >
        <BsChevronCompactLeft size={30} />
      </button>
      {/* Right Arrow */}
      <button
        disabled={isDisabled("next")}
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        onClick={nextSlide}
      >
        <BsChevronCompactRight size={30} />
      </button>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
