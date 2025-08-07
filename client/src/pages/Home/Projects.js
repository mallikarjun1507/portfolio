import React, { useState } from 'react';
import Sectiontitle from '../../components/Sectiontitle';
import { useSelector } from 'react-redux';

function Projects() {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const { portfolioData } = useSelector((state) => state.root);
    const projects = portfolioData?.projects || [];

    const selectedProject = projects[selectedItemIndex] || null;

    return (
        <div>
            <Sectiontitle title="Projects" />

            <div className='flex py-10 gap-10 sm:flex-col'>
                {/* Project List Section */}
                <div className='flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full'>
                    {projects.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedItemIndex(index)}
                            className='cursor-pointer'
                        >
                            <h1
                                className={`text-xl px-10 ${
                                    selectedItemIndex === index
                                        ? 'text-tertairy border-tertairy border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3'
                                        : 'text-white'
                                }`}
                            >
                                {item.title}
                            </h1>
                        </div>
                    ))}
                </div>

                {/* Selected Project Details */}
                {selectedProject && (
                    <div className='flex flex-col gap-5 w-2/3 sm:w-full'>
                        <h1 className='text-secondary text-xl'>
                            {selectedProject.title}
                        </h1>
                        <p className='text-white'>
                            {selectedProject.description}
                        </p>
                        <p className='text-white p-1'>
                            <strong>Technologies:</strong> {selectedProject.technologies}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Projects;
