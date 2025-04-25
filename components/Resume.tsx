import { useRouter } from "next/router";
import styles from "../styles/Resume.module.css";
import { motion } from "framer-motion";
import Image from "next/image";
import resumeImage from "../public/images/resume.png"; // Картинка резюме
import resumeIcon from "../public/icons/arrow-icon.svg"; // Иконка стрелки

const Resume = () => {
  const router = useRouter();

  const handleImageClick = () => {
    router.push("/ResumePage"); 
  };

  return (
    <section className={styles.section}>
      <div className={styles.text}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Резюме
        </motion.h2>
        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          За почти 10 лет в Москве я успела погрузиться в мир работы, который
          оказался не таким скучным, как я думала! 😅 Моя карьера — это как
          зоопарк: и стартапы, и крупные компании, и везде что-то интересное.
          Иногда я сама не понимаю, как всё это удается совмещать. Хочешь
          узнать, чем я занималась? Жми на картинку справа! Там ты найдешь моё
          резюме с самыми яркими моментами — проекты, достижения и (по секрету)
          пару фишек, как не стать скучным трудоголиком! 🎉
        </motion.p>
        <motion.div
          className={styles.iconWrapper}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Image
            src={resumeIcon}
            alt="Иконка указания на картинку"
            className={styles.arrowIcon}
          />
        </motion.div>
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src={resumeImage}
          alt="Резюме"
          className={styles.resumeImage}
          onClick={handleImageClick}
        />
      </div>
    </section>
  );
};

export default Resume;
