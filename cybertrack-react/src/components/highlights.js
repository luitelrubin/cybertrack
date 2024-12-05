import React from 'react';
import './style.css';

export default function Highlights() {
  return (
    <div className="container3 mx-auto my-5 w-[90%] text-center">
      <h1 className="mb-12 text-3xl" style={{ color: 'var(--text-highlights)' }}>
        Highlights
      </h1>
      
      <div className="highlights flex flex-wrap justify-between gap-8">
        {/* Box 1 */}
        <div className="boxes bg-background border-[0.2vw] border-border-color rounded-[1vw] shadow-lg overflow-hidden flex-1 min-w-[25%] max-w-[30%] h-auto p-2 relative">
          <div
            className="press font-sans text-base font-semibold text-center py-2 px-4 mt-4 w-4/5 mx-auto"
            style={{
              backgroundColor: 'var(--text-highlights)',
              color: 'var(--background)',
            }}
          >
            Press Release
          </div>
          <p
            className="heading-highlights mt-4 mx-5 text-xl font-semibold leading-6 text-left"
            style={{ color: 'var(--text-highlights)' }}
          >
            Heading of Cyber Crime Portal Something Important
          </p>
          <div
            className="line h-[0.5vh] w-[90%] my-4 mx-auto"
            style={{ backgroundColor: 'var(--primary)' }}
          ></div>
          <p
            className="uploaded_date mt-2 mx-5 text-base font-normal text-left"
            style={{ color: 'var(--text)' }}
          >
            17th October, 2024
          </p>
          <img
            src="images/news1.png"
            alt="news1"
            className="h-photo mx-auto w-full h-[50%] object-cover"
          />
        </div>

        
        <div className="boxes bg-background border-[0.2vw] border-border-color rounded-[1vw] shadow-lg overflow-hidden flex-1 min-w-[25%] max-w-[30%] h-auto p-2 relative">
          <div
            className="press font-sans text-base font-semibold text-center py-2 px-4 mt-4 w-4/5 mx-auto"
            style={{
              backgroundColor: 'var(--text-highlights)',
              color: 'var(--background)',
            }}
          >
            Press Release
          </div>
          <p
            className="heading-highlights mt-4 mx-5 text-xl font-semibold leading-6 text-left"
            style={{ color: 'var(--text-highlights)' }}
          >
            Heading of Cyber Crime Portal Something Important
          </p>
          <div
            className="line h-[0.5vh] w-[90%] my-4 mx-auto"
            style={{ backgroundColor: 'var(--primary)' }}
          ></div>
          <p
            className="uploaded_date mt-2 mx-5 text-base font-normal text-left"
            style={{ color: 'var(--text)' }}
          >
            17th October, 2024
          </p>
          <img
            src="images/news2.png"
            alt="news2"
            className="h-photo mx-auto w-full h-[50%] object-cover"
          />
        </div>

    
        <div className="boxes bg-background border-[0.2vw] border-border-color rounded-[1vw] shadow-lg overflow-hidden flex-1 min-w-[25%] max-w-[30%] h-auto p-2 relative">
          <div
            className="press font-sans text-base font-semibold text-center py-2 px-4 mt-4 w-4/5 mx-auto"
            style={{
              backgroundColor: 'var(--text-highlights)',
              color: 'var(--background)',
            }}
          >
            Press Release
          </div>
          <p
            className="heading-highlights mt-4 mx-5 text-xl font-semibold leading-6 text-left"
            style={{ color: 'var(--text-highlights)' }}
          >
            Heading of Cyber Crime Portal Something Important
          </p>
          <div
            className="line h-[0.5vh] w-[90%] my-4 mx-auto"
            style={{ backgroundColor: 'var(--primary)' }}
          ></div>
          <p
            className="uploaded_date mt-2 mx-5 text-base font-normal text-left"
            style={{ color: 'var(--text)' }}
          >
            17th October, 2024
          </p>
          <img
            src="images/news3.png"
            alt="news3"
            className="h-photo mx-auto w-full h-[50%] object-cover"
          />
        </div>
      </div>

      <button
        className="btn view_highlights bg-transparent border-[0.3vw] border-button rounded-[2vh] text-xl font-semibold py-2 px-6 mt-12 mx-auto cursor-pointer"
        style={{
          color: 'var(--text-highlights)',
          borderColor: 'var(--border-color)',
        }}
      >
        View All
      </button>
    </div>
  );
}
