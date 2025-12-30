import React from "react";

export default function Crime() {
  return (
    <div className="relative w-[105vw] h-screen flex flex-col items-center m-0 p-0 -ml-[2.5vw]">
      <div className="w-full h-full flex justify-center items-center overflow-hidden m-0 p-0">
        <img
          src="/images/Hero.png"
          alt="slider"
          id="photo1"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex justify-between absolute top-1/2 transform -translate-y-1/2 w-full px-6 z-10">
        <button
          id="prev-btn"
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-blue-600"
        >
          &lt;
        </button>
        <button
          id="next-btn"
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-blue-600"
        >
          &gt;
        </button>
      </div>

      <div className="absolute bottom-10 w-full flex justify-between px-8 z-10">
        {/* Button 1 */}
        <button className="border-[0.3vw] border-[var(--border-color)] rounded-[2vh] text-[2vw] font-semibold py-[2vh] px-[6vw] mt-[12vh] mx-auto cursor-pointer transform translate-y-[1vh] hover:translate-y-[-1vh] transition-all duration-300 bg-[var(--background)] text-[var(--text-highlights)] hover:bg-[var(--text-highlights)] hover:text-[var(--background)]">
          Button 1
        </button>

        {/* Button 2 */}
        <button className="border-[0.3vw] border-[var(--border-color)] rounded-[2vh] text-[2vw] font-semibold py-[2vh] px-[6vw] mt-[12vh] mx-auto cursor-pointer transform translate-y-[1vh] hover:translate-y-[-1vh] transition-all duration-300 bg-[var(--background)] text-[var(--text-highlights)] hover:bg-[var(--text-highlights)] hover:text-[var(--background)]">
          Button 2
        </button>

        {/* Button 3 */}
        <button className="border-[0.3vw] border-[var(--border-color)] rounded-[2vh] text-[2vw] font-semibold py-[2vh] px-[6vw] mt-[12vh] mx-auto cursor-pointer transform translate-y-[1vh] hover:translate-y-[-1vh] transition-all duration-300 bg-[var(--background)] text-[var(--text-highlights)] hover:bg-[var(--text-highlights)] hover:text-[var(--background)]">
          Button 3
        </button>
      </div>
    </div>
  );
}
