import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Icons
const ChevronLeftIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const PlayIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

const PauseIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

// Data
const cardData = [
  {
    id: 1,
    imageUrl: "/image1.jpg",
    title: "Computer Network and Internet Protocol Certificate",
    description: "",
  },
  {
    id: 2,
    imageUrl: "/image2.jpg",
    title: "C++ Mastery",
    description: "",
  },
  {
    id: 3,
    imageUrl: "/image3.jpg",
    title: "MERN Stack Certificate",
    description: "",
  },
  {
    id: 4,
    imageUrl: "/image4.jpg",
    title: "Python Training",
    description: "",
  },
  {
    id: 5,
    imageUrl: "/image5.jpg",
    title: "CSS Training",
    description: "",
  },
  {
    id: 6,
    imageUrl: "/image6.jpg",
    title: "Cloud Computing AWS",
    description: "",
  },
];

// Card Component
function Card({ card, index, activeIndex, totalCards }) {
  let offset = index - activeIndex;
  if (offset > totalCards / 2) offset -= totalCards;
  else if (offset < -totalCards / 2) offset += totalCards;

  const isVisible = Math.abs(offset) <= 2;
  const isActive = offset === 0;

  const animate = {
    x: `${offset * 65}%`,
    scale: isActive ? 1 : 0.82,
    zIndex: totalCards - Math.abs(offset),
    opacity: isVisible ? (isActive ? 1 : 0.5) : 0,
    rotateY: offset * 12,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  };

  return (
    <motion.div
      className="absolute w-96 h-72 md:w-[450px] md:h-80 lg:w-[500px] lg:h-[350px]"
      style={{ transformStyle: "preserve-3d" }}
      animate={animate}
      initial={false}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
        <img
          src={card.imageUrl}
          alt={card.title}
          className="w-full h-full object-contain bg-white transition-transform duration-700 hover:scale-105"
          onError={(e) => {
            const target = e.target;
            target.onerror = null;
            target.src =
              "https://placehold.co/600x400/1e1e1e/ffffff?text=Certificate";
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <motion.h3
            className="text-white text-base md:text-lg lg:text-xl font-bold mb-1 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0.8, y: isActive ? 0 : 10 }}
            transition={{ delay: 0.1 }}
          >
            {card.title}
          </motion.h3>
          {card.description && (
            <motion.p
              className="text-gray-200 text-sm opacity-90 drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
              transition={{ delay: 0.2 }}
            >
              {card.description}
            </motion.p>
          )}
        </div>
        {isActive && (
          <div className="absolute top-4 right-4 z-20">
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Main Component
export default function App() {
  const [activeIndex, setActiveIndex] = useState(
    Math.floor(cardData.length / 2)
  );
  const [isPaused, setIsPaused] = useState(false);
  const autoplayIntervalRef = useRef(null);
  const autoplayDelay = 4000;

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % cardData.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + cardData.length) % cardData.length);
  };

  const changeSlide = (newIndex) => {
    const safeIndex = (newIndex + cardData.length) % cardData.length;
    setActiveIndex(safeIndex);
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
    }
  };

  useEffect(() => {
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
    }
    return () => clearInterval(autoplayIntervalRef.current);
  }, [isPaused]);

  const onDragEnd = (event, info) => {
    const dragOffset = info.offset.x;
    const dragThreshold = 100;
    if (dragOffset > dragThreshold) {
      changeSlide(activeIndex - 1);
    } else if (dragOffset < -dragThreshold) {
      changeSlide(activeIndex + 1);
    }
  };

  return (
    <div className="w-full max-w-8xl mx-auto p-6">
      <div className="bg-gradient-to-br from-slate-800 via-purple-800 to-slate-800 rounded-3xl p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3">
              My Certificates
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Carousel */}
          <div className="relative h-96 md:h-[450px] lg:h-[500px] flex items-center justify-center overflow-hidden">
            <motion.div
              className="w-full h-full flex items-center justify-center"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={onDragEnd}
            >
              {cardData.map((card, index) => (
                <Card
                  key={card.id}
                  card={card}
                  index={index}
                  activeIndex={activeIndex}
                  totalCards={cardData.length}
                />
              ))}
            </motion.div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                  <ChevronLeftIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                  <ChevronRightIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-center mt-6">
            {/* Dots Navigation */}
            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
              {cardData.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => changeSlide(index)}
                  className="relative group"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {activeIndex === index ? (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-sm" />
                      <div className="relative w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
                    </div>
                  ) : (
                    <div className="w-2 h-2 bg-white/40 rounded-full group-hover:bg-white/70 transition-colors duration-200" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
