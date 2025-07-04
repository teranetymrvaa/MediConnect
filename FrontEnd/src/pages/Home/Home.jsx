import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./Home.css";
import { Link } from "react-router-dom";

// SVG Heart Icon komponentləri
const HeartIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={filled ? "red" : "none"}
    stroke="red"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24px"
    height="24px"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3
      7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3
      19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

function Home() {
  const [doctors, setDoctors] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    // localStorage-dən wishlist-i yüklə
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  // localStorage-ə wishlist-i yaz
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // wishlist-ə əlavə et / sil
  const toggleWishlist = (doctorId) => {
    if (wishlist.includes(doctorId)) {
      // varsa sil
      setWishlist(wishlist.filter((id) => id !== doctorId));
    } else {
      // yoxdursa əlavə et
      setWishlist([...wishlist, doctorId]);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Etibarlı Tibbi Yardım Burada Başlayır</h1>
          <p className="hero-subtitle">
            Azərbaycanda minlərlə istifadəçi MediConnect ilə həkim seçir, növbə
            götürür və daha sağlam gələcəyə addımlayır.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Həkimləri Göstər</button>
            <button className="btn-outline">Necə işləyir?</button>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="doctors-section">
        <h2 className="section-title">Populyar Həkimlər</h2>
        <div className="doctors-list">
          {doctors.map((doctor) => {
            const isInWishlist = wishlist.includes(doctor._id);
            return (
              <Link
                to={`/public/doctorDetails/${doctor._id}`}
                className="doctor-card"
                key={doctor._id}
              >
                <div className="doctor-card-img-wrapper" style={{ position: "relative" }}>
                  <img
                    src={doctor.profileImage}
                    alt={doctor.name}
                    className="doctor-img"
                  />
                  {/* Heart icon - klikləyəndə toggle olunur */}
                  <div
                    className="heart-icon"
                    onClick={(e) => {
                      e.preventDefault(); // linkin işini dayandır
                      toggleWishlist(doctor._id);
                    }}
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      cursor: "pointer",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      padding: "4px",
                      boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                      zIndex: 10,
                    }}
                    title={isInWishlist ? "Sevimlilərdən sil" : "Sevimlilərə əlavə et"}
                  >
                    <HeartIcon filled={isInWishlist} />
                  </div>
                </div>
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-specialty">{doctor.profession}</p>
              </Link>
            );
          })}
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
              src="https://static.president.az/upload/1960x1292/2020/03/28/2mpyboa3kc_013.jpg"
              alt="hospital 1"
              className="slide-img"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://static.president.az/upload/1960x1292/2020/03/28/9599cs3yr1_002.jpg"
              alt="hospital 2"
              className="slide-img"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://static.president.az/upload/1960x1292/2020/03/28/5kpmwop63h_021.jpg"
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
