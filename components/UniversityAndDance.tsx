import { useState } from "react"; // React-хук, чтобы отслеживать открыто ли модальное окно
import styles from "../styles/UniversityAndDance.module.css";
import Image from "next/image";
import { motion } from "framer-motion"; // импорт анимированного компонента из библиотеки framer-motion

import dance1 from "../public/images/dance-1.jpg";
import dance2 from "../public/images/dance-2.jpg";

const images = [dance1, dance2];

const UniversityAndDance = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const openModal = (index: number) => {
    setCurrent(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);
  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className={styles.section} id="university">
      <div className={styles.gallery}>
        {images.map((src, index) => (
          <div
            key={index}
            className={`${styles.polaroid} ${
              index % 2 === 0 ? styles.imageTiltLeft : styles.imageTiltRight
            }`}
            onClick={() => openModal(index)}
          >
            <Image
              src={src}
              alt={`Танец ${index + 1}`}
              className={styles.image}
              placeholder="blur"
            />
          </div>
        ))}
      </div>

      <motion.div
        className={styles.text}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
         <h2 className={styles.title}>Учёба и танцы</h2>
        <p>
          В 16 лет я поступила в ПГЛУ — институт с длинным названием и ещё
          длиннее расписанием. Перевод с китайского? Да легко! А вот найти
          горячую воду в общаге — это уже квест.
        </p>
        <p>
          Общежитие было атмосферное. Иногда казалось, что мы там не одни — вещи сами падали,
          двери дрожали, и звуки... будто кто-то репетирует хоррор. После пары лет я научилась
          спать с включённым светом — не от страха, а просто лампа была теплее, чем батареи.
        </p>
        <p>
          Самое крутое — это, конечно, «Позитив». Наш танцевальный коллектив: хип-хоп, хаус,
          dancehall, popping... Мы танцевали везде — от подвалов до филармоний. Репетиции, баттлы,
          Студвесна — всё, как в фильме, только без монтажа.
        </p>
        <p>Было весело. Было ярко. Было классно.</p>
      </motion.div>

      {isOpen && (
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={closeModal}>×</button>
          <button className={styles.navButton} onClick={prevImage}>‹</button>
          <div className={styles.modalContent}>
            <Image
              src={images[current]}
              alt={`Просмотр фото ${current + 1}`}
              className={styles.image}
              placeholder="blur"
            />
          </div>
          <button className={styles.navButton} onClick={nextImage}>›</button>
        </div>
      )}
    </section>
  );
};

export default UniversityAndDance;
