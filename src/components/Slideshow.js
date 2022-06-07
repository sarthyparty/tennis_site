import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import image1 from "../images/tennis2.jpeg"
import image2 from "../images/tennis3.jpeg"

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img src={image1} alt="" onDragStart={handleDragStart} role="presentation" width="fill"/>,
  <img src={image2} alt="" onDragStart={handleDragStart} role="presentation" />,
  <img src="../../public/tennis.jpeg" alt="" onDragStart={handleDragStart} role="presentation" />,
];

export const Slideshow = () => {
  return (
    <AliceCarousel mouseTracking items={items} />
  );
}