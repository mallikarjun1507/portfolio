import React from 'react';
import Sectiontitle from '../../components/Sectiontitle';
import { useSelector } from 'react-redux';

function Courses() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const courseList = portfolioData?.courses || [];

  // Handle loading or empty state
  if (!courseList.length) {
    return (
      <div className='text-white text-center py-10'>
        <Sectiontitle title="Courses" />
        <p>No courses available.</p>
      </div>
    );
  }

  return (
    <div>
      <Sectiontitle title="Courses" />

      <div className='flex py-10 gap-10 sm:flex-col'>
        <div className='flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full'>
          {courseList.map((course, index) => (
            <div
              key={index}
              onClick={() => setSelectedItemIndex(index)}
              className='cursor-pointer'
            >
              <h1 className={`text-xl px-10
                ${selectedItemIndex === index
                  ? 'text-tertairy border-tertairy border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3'
                  : 'text-white'}`}
              >
                {course.title}
              </h1>
            </div>
          ))}
        </div>

        <div className='flex items-center justify-center gap-10 sm:flex-col'>
          <div className='flex flex-col gap-5'>
            <h1 className='text-secondary text-xl'>{courseList[selectedItemIndex]?.title || "No Title"}</h1>
            <p className='text-white'>{courseList[selectedItemIndex]?.description || "No Description"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
