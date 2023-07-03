'use client';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useEffect } from 'react';
import { currentAreaAtom, currentSpecieAtom } from '@/context/store';
import { useAtom } from 'jotai';

const buttonStyle = `rounded-full bg-white/60 shadow-l hover:bg-white transition duration-300`;

interface CarouselProps {
  children: React.ReactNode;
  length: number;
  type?: 'area' | 'specie';
}

const Carousel = ({ children: slides, length, type }: CarouselProps) => {
  const [currentArea, setCurrentArea] = useAtom(currentAreaAtom);
  const [currentSpecie, setCurrentSpecie] = useAtom(currentSpecieAtom);

  const handleNext = () => {
    if (type === 'area')
      setCurrentArea((prev) => (currentArea === length - 1 ? 0 : prev + 1));
    else if (type === 'specie')
      setCurrentSpecie((prev) => (currentSpecie === length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    if (type === 'area')
      setCurrentArea((prev) => (currentArea === 0 ? length - 1 : prev - 1));
    else if (type === 'specie')
      setCurrentSpecie((prev) => (currentSpecie === 0 ? length - 1 : prev - 1));
  };

  return (
    <div className='overflow-hidden relative w-full'>
      <div
        className='flex transition-transform ease-out duration-500'
        style={{
          transform: `translateX(-${
            type === 'area' ? currentArea * 100 : currentSpecie * 100
          }%`,
        }}
      >
        {slides}
      </div>
      <div className='absolute inset-0 flex items-center justify-between px-2'>
        <button onClick={() => handlePrev()} className={buttonStyle}>
          <FiChevronLeft size={40} />
        </button>
        <button onClick={() => handleNext()} className={buttonStyle}>
          <FiChevronRight size={40} />
        </button>
      </div>
      <div className='absolute bottom-4 right-0 left-0'>
        <div className='flex items-center justify-center gap-4'>
          {Array.from({ length: length }).map((_, index) => (
            <div
              className={`transition-all rounded-full h-3 w-3 bg-white ${
                type === 'area' && currentArea === index
                  ? 'p-2'
                  : 'bg-opacity-50'
              } ${
                type === 'specie' && currentSpecie === index
                  ? 'p-2'
                  : 'bg-opacity-50'
              } cursor-pointer hover:bg-opacity-100`}
              key={index}
              onClick={() => {
                if (type === 'area') setCurrentArea(index);
                if (type === 'specie') setCurrentSpecie(index);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
