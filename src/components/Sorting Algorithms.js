// MERGE SORT
export const mergeSort = (array) => {
    if (array.length <= 1) return array;
    const animations = [];
    mergeSortHelper(array, 0, array.length - 1, array.slice(), animations);
    return animations;
};

const mergeSortHelper = (mainArray, startIdx, endIdx, auxArray, animations) => {
    if (startIdx === endIdx) return;
    const midIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxArray, startIdx, midIdx, mainArray, animations);
    mergeSortHelper(auxArray, midIdx + 1, endIdx, mainArray, animations);
    merge(mainArray, startIdx, midIdx, endIdx, auxArray, animations);
};

const merge = (mainArray, startIdx, midIdx, endIdx, auxArray, animations) => {
    let k = startIdx, i = startIdx, j = midIdx + 1;

    while (i <= midIdx || j <= endIdx) {
        if (j > endIdx || (i <= midIdx && auxArray[i] <= auxArray[j])) {
            animations.push({ type: 'comparison1', indices: [i, j] });
            animations.push({ type: 'swap', indices: [k, auxArray[i]] });
            mainArray[k++] = auxArray[i++];
        } else {
            animations.push({ type: 'comparison2', indices: [i, j] });
            animations.push({ type: 'swap', indices: [k, auxArray[j]] });
            mainArray[k++] = auxArray[j++];
        }
    }
};

// BUBBLE SORT
export const bubbleSort = (array) => {
    const animations = [];
    const n = array.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            // Color change for comparison
            animations.push({ type: 'comparison1', indices: [j, j + 1] });
            animations.push({ type: 'comparison2', indices: [j, j + 1] });

            if (array[j] > array[j + 1]) {
                // Swap elements and push the swap animation
                animations.push({ type: 'swap', indices: [j, array[j + 1]] });
                animations.push({ type: 'swap', indices: [j + 1, array[j]] });

                // Perform the swap
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                swapped = true;
            }
        }
        // If no elements were swapped, the array is sorted
        if (!swapped) break;
    }

    return animations;
};