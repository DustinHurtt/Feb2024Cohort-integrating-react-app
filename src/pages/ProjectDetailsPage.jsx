// src/pages/ProjectDetailsPage.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { API_URL } from "../services/API_URL";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";

function ProjectDetailsPage(props) {
  const [project, setProject] = useState(null);

  const [addingTask, setAddingTask] = useState(false);

  const { projectId } = useParams();

  const getProject = () => {
    //  <== ADD A NEW FUNCTION
    axios
      .get(`${API_URL}/projects/${projectId}?_embed=tasks`)
      .then((response) => {
        const oneProject = response.data;
        console.log("Found project===>", oneProject);
        setProject(oneProject);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // <== ADD AN EFFECT
    getProject();
  }, []);

  return (
    <div className="ProjectDetailsPage">
      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </>
      )}

      <button onClick={() => setAddingTask(!addingTask)}>
        {!addingTask ? "Add New Task" : "Hide Task Form"}
      </button>

      {addingTask && (
        <AddTask
          getProject={getProject}
          projectId={projectId}
          setAddingTask={setAddingTask}
        />
      )}

      {project &&
        project.tasks.map((task) => <TaskCard key={task.id} {...task} />)}

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>

      <Link to={`/projects/edit/${projectId}`}>
        <button>Edit Project</button>
      </Link>
    </div>
  );
}

export default ProjectDetailsPage;
