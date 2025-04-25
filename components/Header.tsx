import { useEffect, useRef, useState } from "react";
import { FaInstagram, FaVk, FaBars } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import styles from "../styles/Header.module.css";

const Header = () => {
  const [activeSection, setActiveSection] = useState<string>("home"); //activeSection — подсвечивает текущую секцию в меню
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false); //dropdownOpen — управляет видимостью выпадающего меню "Портфолио"
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false); //mobileMenuOpen — состояние бургер-меню на мобилках
  const dropdownRef = useRef<HTMLLIElement>(null); //dropdownRef — нужно, чтобы отловить клик вне меню и закрыть его

  //useEffect для подсветки активной секции, определяет, какая секция сейчас в центре экрана, и подсвечивает соответствующую ссылку в меню.
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "portfolio", "contact"];
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //useEffect для плавного скролла по якорям
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href") || "");
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          setMobileMenuOpen(false); // закрываем меню после клика
        }
      });
    });
  }, []);

  //useEffect для закрытия дропдауна по клику вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <button
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Открыть меню"
        >
          <FaBars />
        </button>

        {/* Разметка меню */}
        <ul className={`${styles.menu} ${mobileMenuOpen ? styles.open : ""}`}>
          <li>
            <a
              href="#home"
              className={activeSection === "home" ? styles.active : ""}
            >
              Главная
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={activeSection === "about" ? styles.active : ""}
            >
              О себе
            </a>
          </li>
          <li ref={dropdownRef} className={styles.portfolioItem}>
            <button
              className={`${styles.portfolioButton} ${
                activeSection === "portfolio" ? styles.active : ""
              }`}
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              Портфолио <FiChevronDown />
            </button>
            {dropdownOpen && (
              <ul className={styles.dropdown}>
                <li>
                  <a href="#study">Учёба</a>
                </li>
                <li>
                  <a href="#china">Китай</a>
                </li>
                <li>
                  <a href="#moscow">Москва</a>
                </li>
                <li>
                  <a href="#resume">Резюме</a>
                </li>
                <li>
                  <a href="#frontend">Frontend</a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a
              href="#contact"
              className={activeSection === "contact" ? styles.active : ""}
            >
              Комментарии
            </a>
          </li>
        </ul>
      </nav>

      {/* Соцсети */}
      <div className={styles.socialLinks}>
        <a
          href="https://www.instagram.com/arina_beslanovna?igsh=MXNsMGV1ZGFoaGpiZQ%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <FaInstagram />
        </a>
        <a
          href="https://vk.com/id757070632"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <FaVk />
        </a>
      </div>
    </header>
  );
};

export default Header;
