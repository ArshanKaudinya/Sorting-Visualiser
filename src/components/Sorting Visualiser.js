import React, { useState, useRef } from 'react';
import Bar from './Bar';
import './components/Sorting Visualiser.css';
import { mergeSort, bubbleSort } from './Sorting Algorithms';


const SortingVisualiser = () => {
    const [array, setArray] = useState([]);
    const [animationSpeed, setAnimationSpeed] = useState(5); // speed
    const timeouts = useRef([]); 

    const generateRandomArray = (length, maxValue) => {
        return Array.from({ length }, () => Math.floor(Math.random() * maxValue) + 1);
    };

    const animateSorting = (animations) => {
        let tempArray = [...array];
        animations.forEach((animation, index) => {
            const { type, indices } = animation;
            const timeoutId = setTimeout(() => {
                if (type === 'comparison2') {
                    const [i, j] = indices;
                    const barI = document.getElementById(`bar-${i}`);
                    const barJ = document.getElementById(`bar-${j}`);
                    if (barI) barI.style.backgroundColor = '#ff9a55';
                    if (barJ) barJ.style.backgroundColor = '#ff9a55';
                } else if (type === 'swap') {
                    const [idx, newValue] = indices;
                    tempArray[idx] = newValue;
                    setArray([...tempArray]);
                    const bar = document.getElementById(`bar-${idx}`);
                    if (bar) {
                        bar.style.backgroundColor = '#54fffb';
                        setTimeout(() => {
                            if (bar) bar.style.backgroundColor = '#ff9a55';
                        }, 40);
                    }
                }
            }, (index * 15) / animationSpeed); // delay for animations
            timeouts.current.push(timeoutId);
        });
    };

    const clearAllTimeouts = () => {
        timeouts.current.forEach(timeoutId => clearTimeout(timeoutId));
        timeouts.current = [];
    };

    const handleResetArray = () => {
        clearAllTimeouts(); 
        const newArray = generateRandomArray(130, 450);
        setArray(newArray);
    };

    const handleMergeSort = () => {
        clearAllTimeouts();
        const animations = mergeSort([...array]);
        animateSorting(animations);
    };
    const handleBubbleSort = () => {
        clearAllTimeouts();
        const animations = bubbleSort([...array]);
        animateSorting(animations);
    };

    return (
        <div className="outer-container">
          <div className="container">
            <div className="button-container">
              <button className="button" onClick={handleResetArray}>Generate Array</button>
              <button className="button" onClick={handleMergeSort}>Merge Sort</button>
              <button className="button" onClick={handleBubbleSort}>Bubble Sort</button>
            </div>
            <div className="slider-container">
              <label>Speed:</label>
              <input
                className="slider"
                type="range"
                min="1"
                max="10"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              />
              <span>{animationSpeed}</span>
            </div>
          </div>
          <div className="array-container">
            {array.map((value, idx) => (
              <Bar key={idx} height={value} idx={idx} />
            ))}
          </div>
        </div>
    );
};

export default SortingVisualiser;
