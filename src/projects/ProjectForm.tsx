import React, { SyntheticEvent, useState } from 'react';
import { Project } from './Project';

interface IProjectFormProps {
  project: Project;
  onCancel: () => void;
  onSave: (project: Project) => void;
}

interface IErrors {
  name: string;
  description: string;
  budget: string;
}

function ProjectForm({
  onCancel,
  onSave,
  project: initialProject,
}: IProjectFormProps) {
  const [project, setProject] = useState(initialProject);
  const [errors, setErrors] = useState<IErrors>({
    name: '',
    description: '',
    budget: '',
  });

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isValid()) return;
    onSave(project);
  };

  const handleChange = (event: SyntheticEvent) => {
    const { type, name, checked, value } = event.target as HTMLInputElement;
    const updatedValue =
      type === 'checkbox' ? checked : type === 'number' ? Number(value) : value;
    const change = {
      [name]: updatedValue,
    };
    let updatedProject: Project;
    setProject((p) => {
      updatedProject = new Project({ ...p, ...change });
      return updatedProject;
    });
    setErrors(() => validate(updatedProject));
  };

  function validate(project: Project) {
    const errs: IErrors = { name: '', description: '', budget: '' };
    if (project.name.length === 0) {
      errs.name = 'Name is required';
    }
    if (project.name.length > 0 && project.name.length < 3) {
      errs.name = 'Name needs to be at least 3 characters';
    }
    if (project.description.length === 0) {
      errs.description = 'Description is required';
    }
    if (project.budget <= 0) {
      errs.budget = 'Budget must be more than $0';
    }
    return errs;
  }

  function isValid() {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
  }

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        name="name"
        placeholder="enter name"
        value={project.name}
        onChange={handleChange}
      />
      {errors.name.length > 0 && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}
      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        placeholder="enter description"
        value={project.description}
        onChange={handleChange}
      ></textarea>
      {errors.description.length > 0 && (
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      )}
      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        name="budget"
        placeholder="enter budget"
        value={project.budget}
        onChange={handleChange}
      />
      {errors.budget.length > 0 && (
        <div className="card error">
          <p>{errors.budget}</p>
        </div>
      )}
      <label htmlFor="isActive">Active?</label>
      <input
        type="checkbox"
        name="isActive"
        checked={project.isActive}
        onChange={handleChange}
      />

      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span></span>
        <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
