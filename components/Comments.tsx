import { signIn } from "next-auth/react"; //метод NextAuth для входа через провайдеров
import { useEffect, useState } from "react"; // React-хуки для состояния и побочных эффектов
import styles from "../styles/Comments.module.css";
import { FaStar } from "react-icons/fa";
import axios from "axios"; //для работы с API (отправка рейтинга, получение средней оценки)

export default function Comments() {
  const [rating, setRating] = useState<number | null>(null); //rating — выбранная пользователем оценка.
  const [average, setAverage] = useState<number | null>(null); //average — средняя оценка по всем пользователям (приходит с сервера).

  // Функция для получения средней оценки
  const fetchAverage = async () => {
    try {
      const res = await axios.get("/api/ratings");
      setAverage(res.data.average);
    } catch (err) {
      console.error("Ошибка при получении средней оценки", err);
    }
  };

  useEffect(() => {
    // Среднюю оценку получаем только если пользователь уже поставил рейтинг
    if (rating !== null) {
      fetchAverage();
    }
  }, [rating]);

  // Обработка клика по звезде
  const handleRating = async (value: number) => {
    try {
      setRating(value);
      await axios.post("/api/ratings", { rating: value });
      await fetchAverage();
    } catch (err) {
      console.error("Ошибка при отправке рейтинга", err);
    }
  };

  // Авторизация
  const handleLogin = (provider: "google" | "yandex") => {
    signIn(provider, { callbackUrl: "/CommentsPage" });
  };

  return (
    <section className={styles.wrapper}>
      <h2>Оцените мой сайт</h2>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((value) => (
          <FaStar
            key={value}
            size={30}
            color={value <= (rating || 0) ? "#ffc107" : "#ccc"}
            onClick={() => handleRating(value)}
            className={styles.star}
          />
        ))}
      </div>

      {rating !== null && average !== null && (
        <p className={styles.average}>
          Средняя оценка: {average.toFixed(1)} / 5
        </p>
      )}

      <p className={styles.subtitle}>или оставьте свой комментарий</p>

      <div className={styles.authButtons}>
        <button onClick={() => handleLogin("google")}>
          Войти через Google
        </button>
        <button onClick={() => handleLogin("yandex")}>
          Войти через Yandex
        </button>
      </div>
    </section>
  );
}
