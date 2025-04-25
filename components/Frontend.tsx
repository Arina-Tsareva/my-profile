import styles from "../styles/Frontend.module.css";
import Image from "next/image";

export default function Frontend() {
  return (
    <section className={styles.container}>
      <div className={styles.imageSection}>
        <Image
          src="/images/profile-photo.png"
          alt="Моя фотография"
          width={300}
          height={300}
          className={styles.profileImage}
        />
      </div>

      <div className={styles.textSection}>
        <h2 className={styles.title}>Frontend-разработчик</h2>
        <p className={styles.text}>
          Со временем я поняла всю свою любовь к структуре, табличкам и
          наведению красоты. И вот, я подумала, что есть нечто, что точно мне
          подходит — профессия фронтенд-разработчика. Сначала всё шло как по
          маслу, а потом я почувствовала тот самый ужас — волосы просто встали
          дыбом! Так что, если хотите почувствовать, что такое "чисто
          космический стресс", попробуйте. Но, как говорил самурай: "У самурая
          нет цели, есть только путь". Или как сказал бы Наруто, "Это мой путь
          ниндзя". Так что не сдаёмся и движемся вперед!
        </p>
      </div>
    </section>
  );
}
