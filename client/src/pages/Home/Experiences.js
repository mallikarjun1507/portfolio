import React, { useState, useEffect, useMemo } from 'react';
import Sectiontitle from '../../components/Sectiontitle';
import { useSelector } from 'react-redux';

function Experiences() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { portfolioData } = useSelector((state) => state.root);

  // ✅ Memoize the experiences array
  const experiences = useMemo(() => {
    return portfolioData?.experience || [];
  }, [portfolioData?.experience]);

  // ✅ Reset selected index when experiences change
  useEffect(() => {
    if (selectedItemIndex >= experiences.length) {
      setSelectedItemIndex(0);
    }
  }, [experiences.length, selectedItemIndex]);

  return (
    <div>
      <Sectiontitle title="Experiences" />
      <div className='flex py-10 gap-10 sm:flex-col'>
        <div className='flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full'>
          {experiences.map((item, index) => (
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
                {item?.period || `Experience ${index + 1}`}
              </h1>
            </div>
          ))}
        </div>

        {experiences[selectedItemIndex] && (
          <div className='flex flex-col gap-5'>
            <h1 className='text-secondary text-xl'>
              {experiences[selectedItemIndex]?.title || 'No Title'}
            </h1>
            <h1 className='text-tertairy text-xl'>
              {experiences[selectedItemIndex]?.company || 'No Company'}
            </h1>
            <p className='text-white'>
              {experiences[selectedItemIndex]?.description || 'No Description available.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Experiences;
