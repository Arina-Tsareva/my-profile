import { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Welcome.module.css';

const Welcome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const greetingLines = [
    'Добро пожаловать!',
    'Я Арина, и я рада, что ты здесь!',
    'Давай знакомиться!',
  ];

  return (
    <section id="home" className={styles.section}>
      <div className={styles.content}>
        <div className={styles.greeting}>
          {greetingLines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.5, duration: 0.6 }}
              className={styles.greetingLine}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.img
          src="/images/profile-photo.png"
          alt="Profile"
          className={styles.profilePhoto}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
        />
      </div>
    </section>
  );
};

export default Welcome;
