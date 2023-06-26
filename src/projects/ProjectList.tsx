import React from 'react';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface IProjectListProps {
  projects: Project[];
}

function ProjectList({ projects }: IProjectListProps) {
  return (
    <div className="row">
      {projects.map((project) => {
        return (
          <div className="cols-sm" key={project.id}>
            <ProjectCard project={project} />
            <ProjectForm />
          </div>
        );
      })}
    </div>
  );
}

export default ProjectList;
