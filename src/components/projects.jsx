import "../css/main.css";
import { useTheme } from "../context/ThemeContext";

const Projects = () => {
  const { theme } = useTheme();

  return (
    <div id="projectsSection" className="project">
      <div className="project-section">
        <div className="project-item">
          <a href="#">
            <div className="project-image">
              <img
                src={`${process.env.PUBLIC_URL}/assets/project1.png`}
                alt="Project 1"
              />
            </div>
            <div className="project-content">
              <h3>Project 1</h3>
              <p>
                Brief description of Project 1 goes here. Brief description of
                Project 1 goes here. Brief description of Project 1 goes here.
                Brief description of Project 1 goes here. Brief description of
                Project 1 goes here. Brief description of Project 1 goes here.
                Brief description of Project 1 goes here. Brief description of
                Project 1 goes here. Brief description of Project 1 goes here.
              </p>
            </div>
          </a>
        </div>
        <div className="project-item">
          <a href="#">
            <div className="project-image">
              <img
                src={`${process.env.PUBLIC_URL}/assets/project2.png`}
                alt="Project 2"
              />
            </div>
            <div className="project-content">
              <h3>Project 2</h3>
              <p>Brief description of Project 2 goes here.</p>
            </div>
          </a>
        </div>
      </div>

      <div className="project-section">
        <div className="project-item">
          <a href="#">
            <div className="project-image">
              <img
                src={`${process.env.PUBLIC_URL}/assets/project3.png`}
                alt="Project 3"
              />
            </div>
            <div className="project-content">
              <h3>Project 3</h3>
              <p>Brief description of Project 3 goes here.</p>
            </div>
          </a>
        </div>
        <div className="project-item">
          <a href="#">
            <div className="project-image">
              <img
                src={`${process.env.PUBLIC_URL}/assets/project4.png`}
                alt="Project 3"
              />
            </div>
            <div className="project-content">
              <h3>Project 4</h3>
              <p>Brief description of Project 4 goes here.</p>
            </div>
          </a>
        </div>
      </div>

      <div className="project-section">
        <div className="project-item">
          <a href="#">
            <div className="project-image">
              <img
                src={`${process.env.PUBLIC_URL}/assets/project5.png`}
                alt="Project 5"
              />
            </div>
            <div className="project-content">
              <h3>Project 5</h3>
              <p>Brief description of Project 5 goes here.</p>
            </div>
          </a>
        </div>
        <div className="project-item">
          <a href="#">
            <div className="project-image">
              <img
                src={`${process.env.PUBLIC_URL}/assets/project6.png`}
                alt="Project 6"
              />
            </div>
            <div className="project-content">
              <h3>Project 6</h3>
              <p>Brief description of Project 6 goes here.</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
