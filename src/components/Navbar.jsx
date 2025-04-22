import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../css/navbar.module.css";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const navItems = [
    { name: "About", href: "aboutSection" },
    { name: "Contact", href: "contactSection" },
    { name: "Projects", href: "projectsSection" },
  ];
  const blurStyle = {
    backdropFilter: `${isMobileMenuOpen ? "None" : "blur(6px)"}`,
  };

  const smoothScroll = (section) => (e) => {
    e.preventDefault();
    const sectionName = document.getElementById(section);
    if (sectionName)
      sectionName.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} style={blurStyle}>
        <div className={styles.logo}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/meicon-dark.png`}
            alt="Portfolio Logo"
          />
        </div>

        {/* Desktop Navigation */}
        <div className={styles.navLinks}>
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              whileHover={{ scale: 1.05 }}
              href={`#${item.href}`}
              onClick={smoothScroll(item.href)}
              className={styles.navLink}
            >
              {item.name}
            </motion.a>
          ))}

          <motion.a
            whileHover={{ scale: 1.05 }}
            href={`${process.env.PUBLIC_URL}/assets/meResume0525.pdf`}
            className={`${styles.navLink} ${styles.resumeLink}`}
            download="Sitesh_Resume.pdf"
          >
            Get Resume
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05, rotate: -10, cursor: "pointer" }}
            className={styles.modeToggle}
            onClick={toggleTheme}
          >
            <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`} />
          </motion.button>

          <div className={styles.mobileMenu}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.mobileMenuButton}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div
                className={`bi ${
                  isMobileMenuOpen ? "bi-x" : "bi-three-dots-vertical"
                }`}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.mobileOverlay}
          >
            <div className={styles.mobileBackdrop} onClick={toggleMenu} />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className={styles.mobileContent}
            >
              <div className={styles.mobileInner}>
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={`#${item.href}`}
                    whileHover={{ x: 4 }}
                    className={styles.mobileLink}
                    onClick={(e) => {
                      toggleMenu();
                      smoothScroll(item.href)(e);
                    }}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.a
                  whileHover={{ x: 4 }}
                  href={`${process.env.PUBLIC_URL}/assets/meResume0525.pdf`}
                  className={styles.mobileLink}
                  download="Sitesh_Resume.pdf"
                >
                  Get Resume
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
