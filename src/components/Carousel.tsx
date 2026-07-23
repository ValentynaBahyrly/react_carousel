import React from 'react';
import './Carousel.scss';
import { useState, useEffect } from 'react';

interface Props {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(step);
  const [currentItemWidth, setCurrentItemWidth] = useState(itemWidth);
  const [currentFrameSize, setCurrentFrameSize] = useState(frameSize);

  const maxIndex = Math.max(0, images.length - currentFrameSize);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  function handleNext() {
    setCurrentIndex(prev => Math.min(maxIndex, prev + currentStep));
  }

  function handlePrev() {
    setCurrentIndex(prev => Math.max(0, prev - currentStep));
  }

  return (
    <div className="Carousel">
      <div
        className="Carousel__viewport"
        style={{ width: `${currentFrameSize * currentItemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * currentItemWidth}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map(image => (
            <li
              className="Carousel__item"
              key={image}
              style={{ width: `${currentItemWidth}px` }}
            >
              <img
                className="Carousel__img"
                src={image}
                alt="Carousel item"
                width={currentItemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__controls">
        <div>
          <label htmlFor="stepId">Крок:</label>
          <input
            id="stepId"
            type="number"
            value={currentStep}
            onChange={e => setCurrentStep(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="itemId">Ширина:</label>
          <input
            id="itemId"
            type="number"
            value={currentItemWidth}
            onChange={e => setCurrentItemWidth(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="frameId">Розмір кадру:</label>
          <input
            id="frameId"
            type="number"
            value={currentFrameSize}
            onChange={e => setCurrentFrameSize(Number(e.target.value))}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={handlePrev}
            disabled={!infinite && currentIndex === 0}
          >
            Prev
          </button>
          <button
            type="button"
            data-cy="next"
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
