import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import styles from "../styles/Moscow.module.css";
import moscow1 from "../public/images/moscow-1.jpg";
import moscow2 from "../public/images/moscow-2.jpg";
import moscow3 from "../public/images/moscow-3.jpg";
import moscow4 from "../public/images/moscow-4.jpg";
import moscow5 from "../public/images/moscow-5.jpg";

const images = [moscow1, moscow2, moscow3, moscow4, moscow5];

const Moscow = () => {
  const [currentImage, setCurrentImage] = useState<number | null>(null);

  const handleOpen = (index: number) => setCurrentImage(index);
  const handleClose = () => setCurrentImage(null);
  const handleNext = () =>
    currentImage !== null &&
    setCurrentImage((currentImage + 1) % images.length);
  const handlePrev = () =>
    currentImage !== null &&
    setCurrentImage((currentImage - 1 + images.length) % images.length);

  const paragraphs = [
    "После учёбы в Китае мне захотелось увидеть больше — и я отправилась покорять столицу. Так началась моя история поисков профессии мечты. Спойлер: оказалось, одного китайского языка недостаточно — нужно ещё быть супергероем без возраста, опыта и, желательно, без личной жизни.",
    "Но я не растерялась и поступила в РГСУ на заочную магистратуру по менеджменту. А потом как завертелось — и вот теперь Москва — мой дом, мой марафон в ритме мегаполиса.",
  ];

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  };

  const wordAnimation = {
    hidden: { opacity: 0, y: 20, rotate: -5 },
    show: { opacity: 1, y: 0, rotate: 0 },
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const renderAnimatedText = (text: string, index: number) => (
    <motion.p
      key={index}
      className={styles.animatedParagraph}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {text.split(" ").map((word, i) => (
        <motion.span key={i} className={styles.word} variants={wordAnimation}>
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.p>
  );

  return (
    <section className={styles.section}>
      <div className={styles.background}>
        <div className={styles.gallery}>
          {images.map((img, index) => (
            <div
              className={styles.imageContainer}
              key={index}
              onClick={() => handleOpen(index)}
            >
              <Image
                src={img}
                alt={`Москва ${index + 1}`}
                className={styles.image}
              />
            </div>
          ))}
        </div>

        <div className={styles.text} ref={ref}>
          <h2 className={styles.title}>Жизнь в Москве</h2>
          {paragraphs.map((text, index) => renderAnimatedText(text, index))}
        </div>
      </div>

      {currentImage !== null && (
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={handleClose}>
            ×
          </button>
          <button className={styles.navButton} onClick={handlePrev}>
            ‹
          </button>
          <div className={styles.modalContent}>
            <Image
              src={images[currentImage]}
              alt={`Москва фото ${currentImage + 1}`}
              className={styles.image}
              placeholder="blur"
            />
          </div>
          <button className={styles.navButton} onClick={handleNext}>
            ›
          </button>
        </div>
      )}
      
      {/* контейнер для бегущей строки */}
      <div className={styles.marquee}>
        <div className={styles.marqueeContent}>
          🚇 Китай-город • 🚇 Таганская • 🚇 Курская • 🚇 Белорусская • 🚇
          Киевская • 🚇 Парк культуры • 🚇 Арбатская •
        </div>
      </div> 
    </section>
  );
};

export default Moscow;
