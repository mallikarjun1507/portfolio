import React from 'react';
import Sectiontitle from '../../components/Sectiontitle';
import { useSelector } from 'react-redux';
import { projects } from "../../resources/projects";
function Projects() {
    const [selectedItemIndex, setselectedItemIndex] = React.useState(0);
    const {  portfolioData } = useSelector((state) => state.root);
    const { projects } = portfolioData;
    console.log("portfolioData",portfolioData)
    console.log(Projects,"the project data line 9")

    return (
        <div>
            <Sectiontitle title="Projects" />


            <div className='flex py-10 gap-10 sm:flex-col'>
                <div className='flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full'>
                    {projects.map((projects, index) => (
                        <div
                            onClick={() => {
                                setselectedItemIndex(index);
                            }}
                            className='cursor-pointer'

                        >
                            <h1 className={`text-xl px-10
                                ${selectedItemIndex === index ? 'text-tertairy border-tertairy border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3' : 'text-white'} `}>{projects.title}</h1>
                        </div>
                    ))}
                </div>
                <div className='flex items-center justify-center gap-10 sm:flex-col'>

                    <div className='flex flex-col gap-5'>
                        <h1 className='text-secondary text-xl'>{projects[selectedItemIndex].title}</h1>
                        <p className='text-white'>{projects[selectedItemIndex].description}</p>
                        <p className='text-white p-1'>{projects[selectedItemIndex].technologies}</p>
                        {/* <p className='text-white'>In this projects we used technologies like  HTML,CSS, JAVASCRIPT, PYTHON AND LIBRARIES,PHP,SQL</p> */}
                    </div>
                </div>

            </div>

        </div>
    );
};




export default Projects;
