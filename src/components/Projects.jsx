import "../css/main.css";
// import { useTheme } from "../context/ThemeContext";

const Projects = () => {
  // const { theme } = useTheme();

  const projectItems = [
    {
      title: "Project 1",
      image: "project1.png",
      desc: `Brief description of Project 1 goes here. Brief description of Project 1 goes here. Brief description of Project 1 goes here.
      Brief description of Project 1 goes here. Brief description of
      Project 1 goes here. Brief description of Project 1 goes here.
      Brief description of Project 1 goes here. Brief description of
      Project 1 goes here. Brief description of Project 1 goes here.`,
    },
    {
      title: "Project 2",
      image: "project2.png",
      desc: `Brief description of Project 1 goes here. Brief description of Project 1 goes here. Brief description of Project 1 goes here.
      Brief description of Project 1 goes here. Brief description of
      Project 1 goes here. Brief description of Project 1 goes here.
      Brief description of Project 1 goes here. Brief description of
      Project 1 goes here. Brief description of Project 1 goes here.`,
    },
    {
      title: "Project 3",
      image: "project3.png",
      desc: `Brief description of Project 1 goes here. Brief description of Project 1 goes here. Brief description of Project 1 goes here.
      Brief description of Project 1 goes here. Brief description of
      Project 1 goes here. Brief description of Project 1 goes here.
      Brief description of Project 1 goes here. Brief description of
      Project 1 goes here. Brief description of Project 1 goes here.`,
    },
    {
      title: "Project 4",
      image: "project4.png",
      desc: `Brief description of Project 1 goes here. Brief description of Project 1 goes here. Brief description of Project 1 goes here.
      Brief description of Project 1 goes here. Brief description of
      Project 1 goes here. Brief description of Project 1 goes here.
      Brief description of Project 1 goes here. Brief description of
      Project 1 goes here. Brief description of Project 1 goes here.`,
    },
    {
      title: "Project 5",
      image: "project5.png",
      desc: `Brief description of Project 1 goes here. Brief description of Project 1 goes here. Brief description of Project 1 goes here.
      Brief description of Project 1 goes here. Brief description of
      Project 1 goes here. Brief description of Project 1 goes here.
      Brief description of Project 1 goes here. Brief description of
      Project 1 goes here. Brief description of Project 1 goes here.`,
    },
    {
      title: "Project 6",
      image: "project6.png",
      desc: `Brief description of Project 1 goes here. Brief description of Project 1 goes here. Brief description of Project 1 goes here.
      Brief description of Project 1 goes here. Brief description of
      Project 1 goes here. Brief description of Project 1 goes here.
      Brief description of Project 1 goes here. Brief description of
      Project 1 goes here. Brief description of Project 1 goes here.`,
    },
  ];

  const projectGroups = projectItems.reduce((result, item, index) => {
    const chunkIndex = Math.floor(index / 2);
    if (!result[chunkIndex]) {
      result[chunkIndex] = [];
    }
    result[chunkIndex].push(item);
    return result;
  }, []);

  return (
    <div id="projectsSection" className="project-section">
      <div className="section-header">
        <h1>
          Featured&nbsp;<strong>Projects</strong>
        </h1>
      </div>

      {projectGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="project-body">
          {group.map((item, index) => (
            <div key={index} className="project-item">
              <a href="#">
                <div className="project-image">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/${item.image}`}
                    alt={item.title}
                  />
                </div>
                <div className="project-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Projects;
