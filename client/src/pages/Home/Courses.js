import React from 'react';
import Sectiontitle from '../../components/Sectiontitle';
import courses from '../../resources/courses';
import { useSelector } from 'react-redux';
function Courses() {
    const [selectedItemIndex, setselectedItemIndex] = React.useState(0);
    const {  portfolioData } = useSelector((state) => state.root);
    const { courses } = portfolioData;

    return (
        <div>
            <Sectiontitle title="Courses" />


            <div className='flex py-10 gap-10 sm:flex-col'>
                <div className='flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full'>
                    {courses.map((courses, index) => (
                        <div
                            onClick={() => {
                                setselectedItemIndex(index);
                            }}
                            className='cursor-pointer'

                        >
                            <h1 className={`text-xl px-10
                                ${selectedItemIndex === index ? 'text-tertairy border-tertairy border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3' : 'text-white'} `}>{courses.title}</h1>
                        </div>
                    ))}
                </div>
                <div className='flex items-center justify-center gap-10 sm:flex-col'>
                    <div className='flex flex-col gap-5'>
                        <h1 className='text-secondary text-xl'>{courses[selectedItemIndex].title}</h1>
                        <p className='text-white'>{courses[selectedItemIndex].description}</p>
                        <p className='text-white'></p>
                    </div>
                </div>

            </div>

        </div>
    );
};




export default Courses;
