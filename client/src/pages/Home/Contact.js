import React from 'react';
import Sectiontitle from '../../components/Sectiontitle';
import { useSelector } from 'react-redux';

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);

  // Optional chaining to safely access contact object
  const contact = portfolioData?.contact || {};

  return (
    <div>
      <Sectiontitle title="Say Hello" />
      <div className='flex sm:flex-col items-center justify-between'>
        <div className='flex flex-col'>
          <p className='text-tertairy'>{"{"}</p>
          {Object.keys(contact).map((key) =>
            key !== "id" && contact[key] && (
              <p key={key} className='ml-5'>
                <span className='text-tertairy'>{key}:</span>{' '}
                <span className='text-tertairy'>{contact[key]}</span>
              </p>
            )
          )}
          <p className='text-tertairy'>{"}"}</p>
        </div>

        <div className='h-[400px]'>
          <lottie-player
            src="https://assets9.lottiefiles.com/packages/lf20_eroqjb7w.json"
            background="transparent"
            speed="1"
            autoplay
            style={{ height: '100%', width: '100%' }}
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default Contact;
