import React, { useState } from "react";
import styles from "../styles/China.module.css";
import { motion } from "framer-motion";
import Image from "next/image";

const chinaImages = [
  "/images/china-1.jpg",
  "/images/china-2.jpg",
  "/images/china-3.jpg",
  "/images/china-4.jpg",
  "/images/china-5.jpg",
  "/images/china-6.jpg",
  "/images/china-7.jpg",
  "/images/china-8.jpg",
];

const China = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev! + 1) % chinaImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) =>
      prev! === 0 ? chinaImages.length - 1 : prev! - 1
    );
  };

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.text}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <h2 className={styles.title}>Путешествие в Китай</h2>
        <p>
          Спустя три года я отправилась в Китай — город{" "}
          <a
            href="https://ru.wikipedia.org/wiki/Чанчунь"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Chángchūn 长春
          </a>
          . Первое время — культурный шок. Там всё иначе: от завтраков до
          взглядов на жизнь. Но ничего, адаптировалась, втянулась. В еду — в
          особенности 🍜
        </p>
        <p>
          Я там училась на филолога, немного занималась ушу и даже почти догнала
          бабушек, которые в 6 утра уже делали{" "}
          <a
            href="https://ru.m.wikipedia.org/wiki/Тайцзицюань"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Тайцзицюань 太极拳
          </a>{" "}
          под музыку на весь кампус.
        </p>
        <p>
          Удалось немного поездить по городам, увидеть ледяные дворцы Харбина,
          покататься на сноуборде и поесть всё, что только можно. Китай был как
          другая планета, но классная 🌏✨
        </p>
      </motion.div>

      <div className={styles.gallery}>
        {chinaImages.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`China ${index + 1}`}
            className={`${styles.image} ${styles[`fan${index % 8}`]}`}
            width={300} // или нужную ширину
            height={200} // и высоту
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>

      {selectedImage !== null && (
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={closeModal}>
            ✕
          </button>
          <button className={styles.navButton} onClick={prevImage}>
            ‹
          </button>
          <div className={styles.modalContent}>
            <Image
              src={chinaImages[selectedImage]}
              alt={`China ${selectedImage + 1}`}
              className={styles.modalImage}
              width={900}
              height={700}
            />
          </div>
          <button className={styles.navButton} onClick={nextImage}>
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default China;
