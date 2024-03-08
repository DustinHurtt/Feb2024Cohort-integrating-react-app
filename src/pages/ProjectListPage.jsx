// src/pages/ProjectListPage.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { API_URL } from "../services/API_URL";
import ProjectCard from "../components/ProjectCard";

function ProjectListPage() {
  const [projects, setProjects] = useState([]);

  const getAllProjects = () => {
    axios
      .get(`${API_URL}/projects?_embed=tasks`)
      .then((response) => {
        console.log("Projects ===>", response.data);
        setProjects(response.data);
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="ProjectListPage">

      <Link to="/projects/create" className="create-button">
        <button>Create Project</button>
      </Link>

      {projects.length > 0 ? (
        projects.map((project) => {
          return (
            <ProjectCard key={project.id} {...project} />
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProjectListPage;
