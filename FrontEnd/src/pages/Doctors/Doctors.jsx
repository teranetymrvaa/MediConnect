import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Doctors.css";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Hamısı");

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

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === "Hamısı" || doctor.profession === category;

    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = [
    "Hamısı",
    ...Array.from(new Set(doctors.map((d) => d.profession))),
  ];

  return (
    <div className="doctors-page">
      <h1>Həkimlərim</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Axtar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {uniqueCategories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="doctors-list">
        {filteredDoctors.map((doctor) => (
          <div className="doctor-card" key={doctor._id}>
            <img src={doctor.profileImage} alt={doctor.name} />
            <h3>{doctor.name}</h3>
            <p>{doctor.profession}</p>
            <Link to={`/public/doctors/${doctor._id}`} className="details-link">
              Ətraflı
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
