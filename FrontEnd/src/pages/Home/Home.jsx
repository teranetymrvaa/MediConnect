import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Etibarlı Tibbi Yardım Burada Başlayır</h1>
          <p className="hero-subtitle">
            Azərbaycanda minlərlə istifadəçi MediConnect ilə həkim seçir, növbə götürür və daha sağlam gələcəyə addımlayır.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Həkimləri Göstər</button>
            <button className="btn-outline">Necə işləyir?</button>
          </div>
        </div>
      </section>

      {/* Image Slider */}
      <section className="slider-section">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              src="https://www.azernews.az/media/2020/03/28/president_280320_6.jpg"
              alt="hospital 1"
              className="slide-img"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://kaspi.az/storage/posts/large/62373a87753a5.jpg"
              alt="hospital 2"
              className="slide-img"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://img.nuhcixan.az/gallery/2020/03/27697_5e7f37020b259.jpg"
              alt="hospital 3"
              className="slide-img"
            />
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
}

export default Home;
