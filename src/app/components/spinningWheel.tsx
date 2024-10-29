"use client";

import React, { useState, useRef, useEffect } from "react";

interface Segment {
  name: string;
  color: string;
}

const SpinningWheel: React.FC = () => {
  const [segments, setSegments] = useState<Segment[]>([
    { name: "Name 1", color: "#FFCDD2" },
    { name: "Name 2", color: "#F8BBD0" },
    { name: "Name 3", color: "#E1BEE7" },
  ]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const segmentAngle = 360 / segments.length;

  const startSpin = () => {
    if (isSpinning || segments.length === 0) return;

    const additionalRotation = 3600 + Math.random() * 360;
    setRotation((prevRotation) => prevRotation + additionalRotation);
    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
    }, 4000);
  };

  const handleNameChange = (index: number, value: string) => {
    const newSegments = [...segments];
    newSegments[index].name = value;
    setSegments(newSegments);
  };

  const handleColorChange = (index: number, value: string) => {
    const newSegments = [...segments];
    newSegments[index].color = value;
    setSegments(newSegments);
  };

  const addSegment = () => {
    setSegments([
      ...segments,
      { name: `Name ${segments.length + 1}`, color: "#D1C4E9" },
    ]);
  };

  const removeSegment = (index: number) => {
    const newSegments = segments.filter((_, i) => i !== index);
    setSegments(newSegments);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      const radius = canvas.width / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      segments.forEach((segment, index) => {
        const startAngle = (index * segmentAngle * Math.PI) / 180;
        const endAngle = ((index + 1) * segmentAngle * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, startAngle, endAngle);
        ctx.fillStyle = segment.color;
        ctx.fill();
        ctx.save();

        // Draw text
        ctx.translate(
          radius +
            Math.cos(startAngle + (endAngle - startAngle) / 2) * (radius * 0.6),
          radius +
            Math.sin(startAngle + (endAngle - startAngle) / 2) * (radius * 0.6)
        );
        ctx.rotate(startAngle + (endAngle - startAngle) / 2);
        ctx.fillStyle = "#333";
        ctx.font = "16px Arial";
        ctx.fillText(segment.name, -ctx.measureText(segment.name).width / 2, 0);
        ctx.restore();
      });
    }
  }, [segments]);

  return (
    <div className="flex flex-col items-center p-4 h-full">
      <h1 className="text-4xl mb-4 font-mono pb-5">Spinning Wheel</h1>

      <div className="relative">
        {/* Arrow*/}
        <div className="absolute -top-10 z-20 left-1/2 transform -translate-x-1/2 translate-y-10">
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-red-500"></div>
        </div>

        {/* Wheel */}
        <canvas
          ref={canvasRef}
          width={256}
          height={256}
          className={`rounded-full transition-transform duration-[4000ms] ease-out`}
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        ></canvas>
      </div>

      {/* Segment input form */}
      <div className="mb-4 pt-5">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center mb-2">
            <button
              onClick={() => removeSegment(index)}
              className="mr-2 text-red-500 hover:text-red-700 text-4xl"
            >
              &times;
            </button>
            <input
              type="text"
              value={segment.name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="p-2 border border-gray-300 rounded-md text-black text-center"
              placeholder={`Name ${index + 1}`}
            />
            <input
              type="color"
              value={segment.color}
              onChange={(e) => handleColorChange(index, e.target.value)}
              className="ml-2 w-10 h-10 p-1 rounded-full border border-gray-300"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex space-x-4">
          <button
            onClick={addSegment}
            className={`mb-4 px-4 py-5 text-white rounded-full  ${
              isSpinning ? "bg-slate-700" : "bg-green-500 hover:bg-green-600"
            }`}
            disabled={isSpinning || segments.length === 0}
          >
            Add Participant
          </button>
          <button
            onClick={startSpin}
            className={`mb-4 px-6 py-5 text-white rounded-full ${
              isSpinning ? "bg-slate-700" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isSpinning || segments.length === 0}
          >
            {isSpinning ? "Spinning..." : "Spin"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpinningWheel;
