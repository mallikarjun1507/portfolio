import React from 'react';
import { useSelector } from 'react-redux';
import Sectiontitle from '../../components/Sectiontitle';

function About() {
  const { portfolioData, loading } = useSelector((state) => state.root);
  const about = portfolioData?.about || {};
  const { skills = [], description = "" } = about;

  // Show loader while loading or if about is not yet populated
  if (loading || !portfolioData?.about) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
      </div>
    );
  }

  return (
    <div>
      <Sectiontitle title='About' />

      {/* Animation + Description */}
      <div className='flex w-full items-center sm:flex-col sm:gap-10'>

        {/* Lottie Animation */}
        <div className='w-1/2 sm:w-full flex justify-center'>
          <iframe
            src="https://lottie.host/?file=4fe33fe9-0f72-40a0-8ed8-4f3d3f012f88/4W2hrDoJZ3.lottie"
            width="300"
            height="300"
            title="Lottie Animation"
            frameBorder="0"
          ></iframe>
        </div>

        {/* Description */}
        <div className='w-1/2 sm:w-full flex justify-center'>
          <p className='text-white max-w-[90%]'>{description}</p>
        </div>
      </div>

      {/* Skills Section */}
      <div className='py-5'>
        <h1 className='text-tertairy text-xl'>
          Here are a few technologies I have been working with recently:
        </h1>
        <div className='flex flex-wrap gap-10 mt-5'>
          {skills.map((skill, index) => (
            <div key={index} className='border border-tertairy py-3 px-10'>
              <h1 className='text-tertairy'>{skill}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
