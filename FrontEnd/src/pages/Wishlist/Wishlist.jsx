import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./wishlist.css";

function Wishlist() {
  const [doctors, setDoctors] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const removeFromWishlist = (doctorId) => {
    const newWishlist = wishlist.filter((id) => id !== doctorId);
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };

  const wishlistDoctors = doctors.filter((doctor) =>
    wishlist.includes(doctor._id)
  );

  return (
    <div className="wishlist2-container">
      <h1 className="wishlist2-title">Sevimli Həkimlərim</h1>

      {wishlistDoctors.length === 0 ? (
        <p className="wishlist2-empty">Sevimlilər siyahınız boşdur.</p>
      ) : (
        <div className="wishlist2-list">
          {wishlistDoctors.map((doctor) => (
            <div className="wishlist2-card" key={doctor._id}>
              <Link to={`/public/doctorDetails/${doctor._id}`}>
                <img
                  src={doctor.profileImage}
                  alt={doctor.name}
                  className="wishlist2-img"
                />
              </Link>
              <div className="wishlist2-info">
                <h3>{doctor.name}</h3>
                <p>{doctor.profession}</p>
              </div>
              <button
                className="wishlist2-remove-btn"
                onClick={() => removeFromWishlist(doctor._id)}
                aria-label={`Sevimlilərdən sil: ${doctor.name}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
