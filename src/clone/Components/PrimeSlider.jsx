'use client';
import Slider from "react-slick";
import { assetsImg } from "../Data/data";

const PrimeSlider = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    dots: false,
  };

  const banners = [
    "https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg",
    assetsImg.BannerImg1,
    assetsImg.BannerImg2,
    assetsImg.BannerImg3,
    assetsImg.BannerImg4,
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <Slider {...settings}>
        {banners.map((src) => (
          <div key={src} className="amazon-hero-slide">
            <img src={src} alt="" className="w-full max-h-[420px] object-cover" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PrimeSlider;
