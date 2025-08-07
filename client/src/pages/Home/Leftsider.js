import React from 'react';

function Leftsider() {
    return (
        <div className='fixed left-0 bottom-0 px-10 sm:static'>
            <div className='flex flex-col items-center'>
                <div className='flex flex-col gap-3 sm:flex-row'>
                    <i className="ri-facebook-circle-line text-gray-600"></i>
                    <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox">
                        <i className="ri-mail-line text-gray-600"></i>
                    </a>
                    <i className="ri-instagram-line text-gray-600"></i>
                    <a href="https://www.linkedin.com/feed/">
                        <i className="ri-linkedin-box-line text-gray-600"></i>
                    </a>
                    <a href="https://github.com/mallikarjun33">
                        <i className="ri-github-line text-gray-600"></i>
                    </a>
                </div>
                <div className='w-[1px] h-32 bg-[#125f63] sm:hidden'></div>
            </div>
        </div>
    );
}

export default Leftsider;
