import React from "react";

export default function Crime() {
  return (
    <div className="relative flex flex-col items-center w-[90vw] h-[90vh] mx-auto">
      <div className="w-full h-full flex justify-center items-center overflow-hidden rounded-[2vh] shadow-lg">
        <img
          src="images/photo.png"
          alt="slider"
          id="photo1"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="flex justify-between relative top-[-10vh] mt-[2vh] w-full">
        <button
          id="prev-btn"
          className="px-[1vw] py-[1vh] bg-gray-500 text-white rounded-md text-[1vw] hover:bg-blue-600"
        >
          &lt;
        </button>
        <button
          id="next-btn"
          className="px-[1vw] py-[1vh] bg-gray-500 text-white rounded-md text-[1vw] hover:bg-blue-600"
        >
          &gt;
        </button>
      </div>

      <div className="absolute bottom-[0vh] w-full flex justify-between px-[4vw]">
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
