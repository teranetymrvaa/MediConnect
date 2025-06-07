import React, { useState } from "react";
import "./Faq.css";

const faqData = [
  {
    question: "MediConnect nədir?",
    answer:
      "MediConnect, həkimlərlə pasientləri rahat və sürətli şəkildə birləşdirən onlayn platformadır.",
  },
  {
    question: "Qeydiyyatdan keçmək üçün nə etmək lazımdır?",
    answer:
      "Saytda qeydiyyat bölməsindən öz kateqoriyanıza uyğun qeydiyyatdan keçərək platformadan istifadə etməyə başlaya bilərsiniz.",
  },
  {
    question: "Həkimlər öz profillərini necə idarə edə bilərlər?",
    answer:
      "Həkimlər qeydiyyatdan keçdikdən sonra profil səhifələrində məlumatlarını redaktə edə, növbələrini idarə edə və konsultasiya qiymətlərini təyin edə bilərlər.",
  },
  {
    question: "Pasientlər həkimləri necə axtara bilərlər?",
    answer:
      "Pasientlər şəhər, rayon, xəstəxana kateqoriyası və digər kriteriyalara əsasən həkimləri axtara və uyğun həkimi seçə bilərlər.",
  },
  {
    question: "Növbə sistemindən necə istifadə olunur?",
    answer:
      "Həkimlərin profilində mövcud olan növbə vaxtlarını görə və uyğun vaxtı seçərək randevu ala bilərsiniz.",
  },
];

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-page">
      <div className="faq-bg"></div>
      <div className="faq-container">
        <h1 className="faq-header">Tez-tez verilən suallar</h1>
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFaq(index)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleFaq(index);
              }}
            >
              <div className="faq-question">
                <span>{item.question}</span>
                <span className="faq-toggle-icon">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
