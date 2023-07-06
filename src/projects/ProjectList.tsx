import React, { useState } from 'react';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface IProjectListProps {
  projects: Project[];
  onSave: (project: Project) => void;
}

function ProjectList({ projects, onSave }: IProjectListProps) {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project);
  };
  const cancelEditing = () => {
    setProjectBeingEdited({});
  };

  return (
    <div className="row">
      {projects.map((project) => {
        return (
          <div className="cols-sm" key={project.id}>
            {project === projectBeingEdited ? (
              <ProjectForm
                onSave={onSave}
                onCancel={cancelEditing}
                project={project}
              />
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
