import { useState, useEffect } from "react";
import req_img from "../../assets/home.svg";

export default function Home() {
  const highlights = ["QrZen", "QRCodeGenerator", "Innovation"];
  const [highlightIndex, setHighlightIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prevIndex) => (prevIndex + 1) % highlights.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [highlights.length]);

  return (
    <div className="">
      <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-10 lg:gap-[10rem] mt-[50px] lg:mt-[100px] h-100  px-5">
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="font-semibold text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-4">
            Welcome to our
            <span
              className="block text-purple-500 text-4xl sm:text-5xl lg:text-6xl mt-3 transition-opacity duration-1000 animate-fade-left"
              key={highlightIndex}
            >
              {highlights[highlightIndex]}
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mt-5 leading-relaxed">
            Make Your QR code <br className="hidden sm:block" />
            Seamless And U
          </p>
        </div>
        <div
          className="flex justify-center items-center h-auto"
        >
          <img
            className="w-[250px] sm:w-[300px] lg:w-[480px] object-contain"
            src={req_img}
            alt="Community illustration"
          />
        </div>
      </div>
    </div>
  );
}
