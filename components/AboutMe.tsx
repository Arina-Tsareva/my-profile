import { useState, useRef } from "react"; //useState — хук для управления модальным окном (показывать/скрывать), useRef — создаем ссылку на элемент DOM
import { motion, useInView } from "framer-motion"; // useInView (из framer-motion) — определяет, находится ли элемент в зоне видимости (например, при прокрутке).
import styles from "../styles/AboutMe.module.css";

//Состояния и анимации
const AboutSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); //управляет отображением модального окна.
  const ref = useRef(null); //нужен, чтобы useInView отслеживал появление секции на экране
  const isInView = useInView(ref, { once: false, margin: "-100px" }); // Анимация будет срабатывать каждый раз. Элемент считается "в зоне видимости", если подошел ближе чем на 100px к вьюпорту.

  //Анимации текста
  const textVariants = {
    hidden: { opacity: 0, x: -50, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, type: "spring" },
    }),
  };
  const textChunks = [
    `Родилась я в городе <a href="https://ru.wikipedia.org/wiki/Нальчик" class="${styles.link}" target="_blank">Нальчике</a>, где прожила 16 лет.`,
    `С детства мама была уверена: ребёнок должен быть занят. Всегда.`,
    `Танцы (разбудите меня ночью — лезгинка будет исполнена без репетиции),`,
    `актёрское мастерство (нужно заплакать? Дайте 10 секунд — и слеза уже катится),`,
    `журналистика, море репетиторов — скучать было некогда.`,
  ];

  return (
    <section id="about" className={styles.section} ref={ref}>
      <div className={styles.content}>
        <div className={styles.text}>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Немного обо мне
          </motion.h2>
          {textChunks.map((chunk, i) => (
            <motion.p
              key={i}
              custom={i}
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"} // Анимация запускается, когда блок видим
              className={styles.paragraph}
              dangerouslySetInnerHTML={{ __html: chunk }}
            />
          ))}
        </div>
        <div className={styles.imageWrapper}>
          <img
            src="/images/about-me.jpg"
            alt="Нальчик"
            className={styles.image}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modal} onClick={() => setIsModalOpen(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <img src="/images/about-me.jpg" alt="Нальчик" />
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;
