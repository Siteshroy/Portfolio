import "../css/about.css";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

// export const locationData = [
//   {
//     lat: 23.9716,
//     lng: 87.5946,
//     name: "Location 2",
//     description: "Description for Location 2",
//   },
//   {
//     lat: 12.9716,
//     lng: 77.5946,
//     name: "Bangalore, India",
//     description: "Silicon Valley of India",
//   },
// ];

const About = () => {
  const { theme } = useTheme();

  const openFile = (fileName) =>
    window.open(`${process.env.PUBLIC_URL}/assets/pdf/${fileName}`, "_blank");

  useEffect(() => {
    const imgLanguage = document.getElementById("imgLanguage");
    const language = document.querySelector(".lang-container");
    const swapImage = () => {
      if (!imgLanguage) return;

      const speakingSrc = `${process.env.PUBLIC_URL}/assets/me_cartoon_speak.png`;
      const originalSrc = `${process.env.PUBLIC_URL}/assets/me_cartoon.png`;

      imgLanguage.src = imgLanguage.src.includes("me_cartoon_speak.png")
        ? originalSrc
        : speakingSrc;
      language.classList.toggle("active");
    };
    imgLanguage?.addEventListener("mouseenter", swapImage);
    imgLanguage?.addEventListener("mouseleave", swapImage);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    document.querySelectorAll(".scroller").forEach((s) => {
      if (s.dataset.animated) return;

      s.dataset.animated = "true";
      const inner = s.querySelector(".inner");
      const children = Array.from(inner.children);

      children.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.ariaHidden = "true";
        inner.append(clone);
      });
    });

    const cards = document.querySelectorAll(".certifications .card-item");
    if (!cards.length) return;

    const imgObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const imgWidth = entry.contentRect.width + "px";
        const card = entry.target.closest(".card-item");
        if (card) {
          card.style.setProperty("--img-width", imgWidth);
        }
      });
    });

    cards.forEach((card) => {
      const img = card.querySelector("img");
      if (img) {
        imgObserver.observe(img);
      }
    });

    return () => {
      imgObserver.disconnect();
      imgLanguage?.removeEventListener("mouseenter", swapImage);
      imgLanguage?.removeEventListener("mouseleave", swapImage);
    };
  }, []);

  return (
    <div id="aboutSection" className="about-section">
      {/* <div id="spacer0" className="spacer" />
      <section className="globe-section">
        <Scene />
        {locationData.map((location, index) => (
          <div key={index} id={`location-${index}`} className="location-reveal">
            <h2>{location.name}</h2>
            <p>{location.description}</p>
          </div>
        ))}
      </section>
      <div id="spacer1" className="spacer" /> */}

      <div className="section-header">
        <h1>
          About&nbsp;<strong>Me</strong>
        </h1>
      </div>

      <div className="about-body">
        <div className="about-item">
          <div className="sticky experience">
            <h2>
              <i className="fas fa-briefcase"></i> Experience
            </h2>
            <div className="timeline">
              <div className="experience-item">
                <h3>Artificial Intelligence Intern</h3>
                <p className="company">1Stop, Bengaluru</p>
                <p className="date">Mar 2024-Current</p>
                <p>
                  Introduced on basics of Deep Learning and worked with projects
                  on Artificial Intelligence.
                </p>
              </div>
              <div className="experience-item">
                <h3>Python with Machine Learning Intern</h3>
                <p className="company">
                  Karunadu Technologies pvt Ltd, Bengaluru
                </p>
                <p className="date">Aug 2023-Sept 2023</p>
                <p>
                  Trained on Machine Learning algorithms and developed projects
                  on it.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-item">
          <div className="sticky skills">
            <h1>
              <i className="fas fa-code"></i> Skills
            </h1>
            <div className="skills-container">
              <div className="skill-category">
                <div className="container-image">
                  <img
                    id="imgLanguage"
                    src={`${process.env.PUBLIC_URL}/assets/me_cartoon.png`}
                    alt="Happy face"
                  />
                </div>

                <div className="lang-container inner">
                  <span className="lang skill-soft">English</span>
                  <span className="lang skill-soft">Hindi</span>
                  <span className="lang skill-soft">Bengali</span>
                </div>

                <div className="scroller">
                  <div className="inner">
                    <span className="skill-tech">HTML</span>
                    <span className="skill-tech">CSS</span>
                    <span className="skill-tech">JavaScript</span>
                    <span className="skill-tech">React</span>
                    <span className="skill-tech">Node.js</span>
                    <span className="skill-tech">Python</span>
                    <span className="skill-tech">AI</span>
                    <span className="skill-tech">ML</span>
                    <span className="skill-tech">Django</span>
                    <span className="skill-tech">MongoDB</span>
                    <span className="skill-tech">AWS</span>
                    <span className="skill-soft">Communication skills</span>
                    <span className="skill-soft">Team work</span>
                    <span className="skill-soft">Multi tasker</span>
                    <span className="skill-soft">Quick Learner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-item">
          <div className="sticky certifications">
            <h1>
              <i className="fas fa-certificate"></i> Certifications
            </h1>
            <div className="cards">
              <div className="card-main-course">
                <div className="card-item">
                  <div className="card-inner">
                    <img
                      className="card-img"
                      src={`${process.env.PUBLIC_URL}/assets/pentagonSpace.png`}
                      alt="pentagonSpace-logo"
                    />
                    <div className="card-desc">
                      <div className="card-desc-top">
                        <div className="card-title">
                          <p>Pentagon Space, Bengaluru</p>
                          <h2>Python Full Stack</h2>
                        </div>
                        <p className="card-date">Apr 24 - Dec 24</p>
                      </div>

                      <div className="card-desc-bottom">
                        <div className="card-bottom-left">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="card-button"
                            onClick={() => openFile("degree.pdf")}
                          >
                            View Certificate
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-side-course">
                <div className="card-item card-udemy">
                  <div className="card-inner">
                    <img
                      className="card-img"
                      src={`${process.env.PUBLIC_URL}/assets/udemy.png`}
                      alt="udemy-logo"
                    />
                    <div className="card-desc card-items-wrapper">
                      <div className="card-sub-item">
                        <motion.div
                          className="card-scale-wrapper"
                          whileHover={{ scale: 1.1 }}
                          transition={{ scale: { duration: 0.2 } }}
                        >
                          <i className="fab fa-react"></i>
                          <h3>ReactJs</h3>
                        </motion.div>
                      </div>

                      <div className="card-sub-item">
                        <motion.div
                          className="card-scale-wrapper"
                          whileHover={{ scale: 1.1 }}
                          transition={{ scale: { duration: 0.2 } }}
                        >
                          <i className="fas fa-code"></i>
                          <h3>Web Development</h3>
                        </motion.div>
                      </div>
                      <div className="card-sub-item">
                        <motion.div
                          className="card-scale-wrapper"
                          whileHover={{ scale: 1.1 }}
                          transition={{ scale: { duration: 0.2 } }}
                        >
                          <i className="fab fa-js-square"></i>
                          <h3>JavaScript</h3>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-item card-linkedIn">
                  <div className="card-inner">
                    <img
                      className="card-img"
                      src={`${process.env.PUBLIC_URL}/assets/linkedin.png`}
                      alt="LinkedIn logo"
                    />
                    <div className="card-desc card-items-wrapper">
                      <div className="card-sub-item">
                        <motion.div
                          className="card-scale-wrapper"
                          whileHover={{ scale: 1.1 }}
                          transition={{ scale: { duration: 0.2 } }}
                        >
                          <i className="fab fa-react"></i>
                          <h3>ReactJs</h3>
                        </motion.div>
                      </div>
                      <div className="card-sub-item">
                        <motion.div
                          className="card-scale-wrapper"
                          whileHover={{ scale: 1.1 }}
                          transition={{ scale: { duration: 0.2 } }}
                        >
                          <i className="fas fa-code"></i>
                          <h3>Web Development</h3>
                        </motion.div>
                      </div>
                      <div className="card-sub-item">
                        <motion.div
                          className="card-scale-wrapper"
                          whileHover={{ scale: 1.1 }}
                          transition={{ scale: { duration: 0.2 } }}
                        >
                          <i className="fab fa-js-square"></i>
                          <h3>JavaScript</h3>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-item">
                  <h3>30 Days Masterclass on JavaScript</h3>
                  <p className="company">Pantech E-Learning</p>
                  <p className="date">Sept 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-item">
          <div className="sticky education">
            <h1>
              <i className="fas fa-graduation-cap"></i> Education
            </h1>
            <div className="cards">
              <div className="highest-education">
                <div className="card-item">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/rrit-logo.png`}
                    alt="rrit_logo"
                  />
                  <div className="card-desc">
                    <div className="card-desc-top">
                      <div className="card-title">
                        <p>Bachelor of Engineering (B.E.)</p>
                        <div className="edu-inline">
                          <h2>R. R. Institute of Technology</h2>
                          <p>, Chikkavanabara</p>
                        </div>
                        <p>CSE | VTU</p>
                      </div>
                      <p className="card-date">2020 – 2024</p>
                    </div>
                    <div className="card-desc-bottom">
                      <div className="card-bottom-left">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="card-button"
                          onClick={() => openFile("degree.pdf")}
                        >
                          View Certificate
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="card-button"
                          onClick={() => openFile("VTUTranscript.pdf")}
                        >
                          View Transcript
                        </motion.button>
                      </div>
                      <p className="edu-bottom-right">
                        CGPA &nbsp;<strong>8.65</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="previous-education">
                <div className="card-item">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/bci-logo.png`}
                    alt="bci_logo"
                  />
                  <div className="card-desc">
                    <div className="card-desc-top">
                      <div className="card-title">
                        <p>Higher Secondary Education</p>
                        <div className="edu-inline">
                          <h3>Bidhan Chandra Institution</h3>
                          <p>, Durgapur</p>
                        </div>
                        <p>PCMCs | WBCHSE </p>
                      </div>
                      <p className="card-date">2018 - 2020</p>
                    </div>
                    <div className="card-desc-bottom">
                      <div className="card-bottom-left"></div>
                      <p className="edu-bottom-right">
                        <strong>78%</strong>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-item">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/sms-logo1.png`}
                    alt="sms_logo"
                  />
                  <div className="card-desc">
                    <div className="card-desc-top">
                      <div className="card-title">
                        <p>Secondary Education</p>
                        <div className="edu-inline">
                          <h3>St Michael's School</h3>
                          <p>, Durgapur</p>
                        </div>
                        <p>Science | ICSE </p>
                      </div>
                      <p className="card-date">2018</p>
                    </div>
                    <div className="card-desc-bottom">
                      <div className="card-bottom-left"></div>
                      <p className="edu-bottom-right">
                        <strong>91%</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
