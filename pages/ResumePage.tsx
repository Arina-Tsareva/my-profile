import Head from 'next/head';
import styles from '../styles/ResumePage.module.css';

export default function ResumePage() {
  const handleDownload = () => {
    window.open('/resume.pdf', '_blank'); 
  };

  return (
    <>
      <Head>
        <title>Полное резюме • Гогунокова Арина</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.name}>Гогунокова Арина Беслановна</h1>
            <p className={styles.text}>Женщина, 30 лет, родилась 1 ноября 1994</p>
            <p className={styles.text}>📞 +7 (916) 295-05-82 — предпочитаемый способ связи</p>
            <p className={styles.text}>📧 arina.gogunokova@yandex.ru</p>
            <p className={styles.text}>📍 Проживает: Москва</p>
            <p className={styles.text}>🛂 Гражданство: Россия, есть разрешение на работу: Россия</p>
            <p className={styles.text}>🚚 Готова к переезду, готова к редким командировкам</p>
          </div>
          <button className={styles.downloadButton} onClick={handleDownload}>
            📄 Скачать PDF
          </button>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Опыт работы — 7 лет</h2>

          <div className={styles.job}>
            <h3>ООО «Мехоборудование Гао Ян»</h3>
            <p className={styles.jobTitle}>Заместитель руководителя коммерческого отдела</p>
            <p className={styles.jobPeriod}>Июнь 2023 — Август 2024 (1 год 3 месяца)</p>
            <ul className={styles.jobDetails}>
              <li>Поиск тендеров (направление: промышленные насосы, насосы Warman, запорная арматура)</li>
              <li>Участие в коммерческих тендерах на площадках B2B, Tender.pro, УГМК, СУЭК, Евраз и т.д.</li>
              <li>Подготовка документации для аккредитации на площадках и участия в тендерах</li>
              <li>Коммуникация с заказчиками</li>
              <li>Коммуникация между отделами, запрос соответствующей документации</li>
              <li>Составление технико-коммерческих предложений</li>
              <li>Перевод чертежей и тех. описания с китайского языка</li>
              <li>Составление реестров и отчетов</li>
              <li>Общение с партнерами из Китая на китайском языке</li>
              <li>Выполнение поручений руководителя</li>
              <li>Распределение задач</li>
            </ul>
          </div>

          <div className={styles.job}>
            <h3>АО «Моспроект-3»</h3>
            <p className={styles.jobTitle}>Специалист отдела конкурентных процедур</p>
            <p className={styles.jobPeriod}>Июль 2022 — Июнь 2023 (1 год)</p>
            <ul className={styles.jobDetails}>
              <li>Планирование: проверка и корректировка документации от инициирующих закупку подразделений</li>
              <li>Проведение закупочных процедур: запросы котировок, коммерческие закупки, полный цикл закупок в ЕИС</li>
              <li>Договорная работа: оформление и согласование договоров, работа с исполнителями</li>
              <li>Отчетность: соблюдение законодательства, ведение реестров, подготовка справок и отчетов</li>
              <li>Мониторинг и анализ изменений законодательства в сфере закупок</li>
            </ul>
          </div>

          <div className={styles.job}>
            <h3>DHL Express</h3>
            <p className={styles.jobTitle}>Консультант отдела по работе с клиентами</p>
            <p className={styles.jobPeriod}>Июнь 2021 — Июль 2022 (1 год 2 месяца)</p>
            <ul className={styles.jobDetails}>
              <li>Приём заявок от клиентов на курьерский вызов</li>
              <li>Оформление заказов в учетной базе, формирование сопроводительной документации</li>
              <li>Консультация клиентов относительно таможенного оформления</li>
              <li>Составление ежедневной отчетности</li>
            </ul>
          </div>

          <div className={styles.job}>
            <h3>Фрилансер</h3>
            <p className={styles.jobTitle}>Работа в двух компаниях</p>
            <p className={styles.jobPeriod}>Октябрь 2020 — Июнь 2021 (9 месяцев)</p>
            <ul className={styles.jobDetails}>
              <li>Студия депиляции Ментол: ведение странички в Инстаграм и ТикТок, составление отчетов, работа с таргетологом</li>
              <li>Центр детской песни «Солнышко»: помощь в организации концертов для детей-инвалидов, волонтерская помощь</li>
            </ul>
          </div>

          <div className={styles.job}>
            <h3>ООО АМИКОМ ТРЕЙД</h3>
            <p className={styles.jobTitle}>Менеджер по маркетингу</p>
            <p className={styles.jobPeriod}>Декабрь 2019 — Май 2020 (6 месяцев)</p>
            <ul className={styles.jobDetails}>
              <li>Организация и проведение партнёрских мероприятий «под ключ» (обучения, форумы, семинары)</li>
              <li>Работа с базой клиентов, рассылки акций и предложений</li>
              <li>Работа с Bitrix24, соц. сетями, ведение канала на YouTube</li>
              <li>Организация вебинаров на Webinar.ru</li>
            </ul>
          </div>

          <div className={styles.job}>
            <h3>BLS International (Визовый центр Испании)</h3>
            <p className={styles.jobTitle}>Оператор по работе с клиентами</p>
            <p className={styles.jobPeriod}>Февраль 2018 — Декабрь 2019 (1 год 11 месяцев)</p>
            <ul className={styles.jobDetails}>
              <li>Прием и обработка документов на получение визы, консульские анкеты</li>
              <li>Прием биометрических данных, работа с вип-клиентами</li>
              <li>Работа с 1С</li>
            </ul>
          </div>

          <div className={styles.job}>
            <h3>VF Services (Французский визовый центр)</h3>
            <p className={styles.jobTitle}>Специалист по работе с документами</p>
            <p className={styles.jobPeriod}>Октябрь 2017 — Декабрь 2017 (3 месяца)</p>
            <ul className={styles.jobDetails}>
              <li>Прием и обработка биометрических данных, заполнение консульских анкет</li>
            </ul>
          </div>

          <div className={styles.job}>
            <h3>ООО «РУССЭКОПРОМ»</h3>
            <p className={styles.jobTitle}>Менеджер-переводчик</p>
            <p className={styles.jobPeriod}>Июнь 2017 — Октябрь 2017 (5 месяцев)</p>
            <ul className={styles.jobDetails}>
              <li>Устный и письменный перевод с китайского языка</li>
              <li>Работа с документами, командировки по России</li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Образование</h2>
          <ul className={styles.list}>
            <li><span className={styles.bold}>2025</span> — Компьютерная академия ТОР (Frontend-разработка)</li>
            <li><span className={styles.bold}>2019</span> — РГСУ, Менеджмент (магистратура)</li>
            <li><span className={styles.bold}>2016</span> — 长春师范大学, Китайский язык и литература</li>
            <li><span className={styles.bold}>2014</span> — ПГЛУ, Лингвистика (бакалавриат)</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Повышение квалификации</h2>
          <ul className={styles.list}>
            <li>2022 — Организация закупок, АНО ДПО</li>
            <li>2022 — ЕАИСТ, Мосслужба Закупок</li>
            <li>2020 — Курс по SMM Анны Бонецкой</li>
            <li>2008 — Школа искусств №1, Театр и хореография</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Навыки и языки</h2>
          <ul className={styles.skillsList}>
            <li>Русский — родной</li>
            <li>Английский — B1 (средний)</li>
            <li>Китайский — B1 (средний)</li>
          </ul>
        </section>
      </main>
    </>
  );
}
