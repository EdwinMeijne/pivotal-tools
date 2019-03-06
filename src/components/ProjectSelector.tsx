import React from 'react';
import {PivotalProject} from "../services/pivotal";

export function ProjectSelector({ pivotalProjects, selectProject }: {
    pivotalProjects: PivotalProject[],
    selectProject: (project: PivotalProject) => void,
}) {

    return (
        <ul>
            {Object.entries(pivotalProjects).map(([, project]) => {
                return (
                    <li
                        style={{listStyleType: project.selected ? 'circle' : 'square'}}
                        key={project.project_id}
                        onClick={() => selectProject(project)}
                    >
                        {project.project_name}
                    </li>
                );
            })}
        </ul>

    );
}