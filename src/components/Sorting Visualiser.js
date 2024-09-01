import React, { useState, useRef } from 'react';
import Bar from './Bar';
import styled from 'styled-components';
import { mergeSort, bubbleSort } from './Sorting Algorithms'; // Importing mergeSort function

const OuterContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100vh; // Ensure it takes full height of the viewport
    overflow: hidden; // Prevent overflow
`;

const ArrayContainer = styled.div`
    display: flex;
    justify-content: center;
    transform: scaleY(-1);
    margin-top: 60px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scaleY(-1); // Center the container
    width: 100%; // Ensure the container spans the full width
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    position: relative;
    bottom: 40px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const Button = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    margin-right: 10px;
    cursor: pointer;
`;

const SliderContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    align-items: center;
`;

const Slider = styled.input`
    margin: 0 10px;
`;


const SortingVisualiser = () => {
    const [array, setArray] = useState([]);
    const [animationSpeed, setAnimationSpeed] = useState(5); // Default speed
    const timeouts = useRef([]); // Ref to track active timeouts

    const generateRandomArray = (length, maxValue) => {
        return Array.from({ length }, () => Math.floor(Math.random() * maxValue) + 1);
    };

    const animateSorting = (animations) => {
        let tempArray = [...array];
        animations.forEach((animation, index) => {
            const { type, indices } = animation;
            const timeoutId = setTimeout(() => {
                if (type === 'comparison2') {
                    // Revert the color of the bars being compared
                    const [i, j] = indices;
                    const barI = document.getElementById(`bar-${i}`);
                    const barJ = document.getElementById(`bar-${j}`);
                    if (barI) barI.style.backgroundColor = '#ff9a55';
                    if (barJ) barJ.style.backgroundColor = '#ff9a55';
                } else if (type === 'swap') {
                    // Swap the bars
                    const [idx, newValue] = indices;
                    tempArray[idx] = newValue;
                    setArray([...tempArray]);
                    // Optionally highlight the swapped bar
                    const bar = document.getElementById(`bar-${idx}`);
                    if (bar) {
                        bar.style.backgroundColor = '#54fffb';
                        setTimeout(() => {
                            if (bar) bar.style.backgroundColor = '#ff9a55';
                        }, 40); // Change the color back after a short delay
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
        clearAllTimeouts(); // Clear any ongoing animations
        const newArray = generateRandomArray(130, 450); // Generate a new random array
        setArray(newArray);
    };

    const handleMergeSort = () => {
        clearAllTimeouts(); // Clear any ongoing animations
        const animations = mergeSort([...array]); // Get sorting animations
        animateSorting(animations);
    };
    const handleBubbleSort = () => {
        clearAllTimeouts(); // Clear any ongoing animations
        const animations = bubbleSort([...array]); // Get sorting animations
        animateSorting(animations);
    };

    return (
        <OuterContainer>
        <Container>
            <ButtonContainer>
                <Button onClick={handleResetArray}>Generate Array</Button>
                <Button onClick={handleMergeSort}>Merge Sort</Button>
                <Button onClick={handleBubbleSort}>Bubble Sort</Button>
            </ButtonContainer>
            <SliderContainer>
                <label>Speed:</label>
                <Slider
                    type="range"
                    min="1"
                    max="10"
                    value={animationSpeed}
                    onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                />
                <span>{animationSpeed}</span>
            </SliderContainer>
        </Container>
        <ArrayContainer>
            {array.map((value, idx) => (
                <Bar key={idx} height={value} idx={idx} />
            ))}
        </ArrayContainer>
    </OuterContainer>
    );
};

export default SortingVisualiser;
