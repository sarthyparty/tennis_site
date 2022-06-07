import SimpleImageSlider from "react-simple-image-slider";

const images = [
  { url: "../../public/logo192.png" },
  { url: "../../public/logo192.png" },
  { url: "../../public/logo192.png" },
  { url: "../../public/logo192.png" },
  { url: "../../public/logo192.png" },
  { url: "../../public/logo192.png" },
  { url: "../../public/logo192.png" },
];

export const Slideshow = () => {
  return (
    <div>
      <SimpleImageSlider
        width={896}
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
      />
    </div>
  );
}