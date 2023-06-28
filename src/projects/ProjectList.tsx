import React, { useState } from 'react';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface IProjectListProps {
  projects: Project[];
}

function ProjectList({ projects }: IProjectListProps) {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project);
  };

  return (
    <div className="row">
      {projects.map((project) => {
        return (
          <div className="cols-sm" key={project.id}>
            {project === projectBeingEdited ? (
              <ProjectForm />
            ) : (
              <ProjectCard project={project} onEdit={handleEdit} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProjectList;
