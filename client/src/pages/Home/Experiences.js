import React from 'react';
import Sectiontitle from '../../components/Sectiontitle';
import { useSelector } from 'react-redux';
// import { experiences } from "../../resources/experiences"



function Experiences() {
    const [selectedItemIndex, setselectedItemIndex] = React.useState(0);
    const {  portfolioData } = useSelector((state) => state.root);
    const experience = portfolioData?.experience || []
    //const experienceList = portfolioData?.experience || [];

    console.log(experience,"experience")
    return (

        <div>
            <Sectiontitle title="Experiences" />
            <div className='flex py-10 gap-10 sm:flex-col'>
                <div className='flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full'>
                    {experience.map((experiences, index) => (
                        <div
                            onClick={() => {
                                setselectedItemIndex(index);
                            }}
                            className='cursor-pointer'

                        >
                            <h1 className={`text-xl px-10
                                ${selectedItemIndex === index ? 'text-tertairy border-tertairy border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3' : 'text-white'} `}>{experiences.period}</h1>
                        </div>
                    ))}
                </div>
                {experience.length > 0 && (
                    <div className='flex flex-col gap-5'>
                        <h1 className='text-secondary text-xl'>{experience[selectedItemIndex].title}</h1>
                        <h1 className='text-tertairy text-xl'>{experience[selectedItemIndex].company}</h1>
                        <h1 className='text-white'>{experience[selectedItemIndex].description}</h1>
                    </div>
                )
                }
            </div>

        </div>
    );
};


export default Experiences
