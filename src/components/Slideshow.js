import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import "../styles/slideshow.css"

const handleDragStart = (e) => e.preventDefault();

function getImagePaths(directory) {
  let images = [];
  directory.keys().map((item, index) => images.push(item.replace("./", "")));
  return images;
}
const directory = require.context("../../images/", false, /\.(png|jpe?g|svg)$/);
let imagePaths = getImagePaths(directory);

let images = [];
imagePaths.map((path) => images.push(require("../../images/" + path)));

const items = images.map((img, index) => (
  <img key={index} src={img} alt={img} onDragStart={handleDragStart} role="presentation"/>
))
// [
  
//   <img src={image1} alt="" onDragStart={handleDragStart} role="presentation"/>,
//   <img src={image2} alt="" onDragStart={handleDragStart} role="presentation"/>,
//   <img src={image3} alt="" onDragStart={handleDragStart} role="presentation"/>,
// ];

export const Slideshow = () => {
  return (
    <div className='slideshow'>
    <AliceCarousel mouseTracking items={items} autoPlay autoPlayInterval={2000} infinite disableButtonsControls keyboardNavigation disableDotsControls/>
    </div>
  );
}