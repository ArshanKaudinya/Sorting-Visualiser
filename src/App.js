// App.js
import React from 'react';
import styled from 'styled-components';
import SortingVisualiser from './components/Sorting Visualiser'; // Import SortingVisualiser component

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
`;

const Header = styled.h1`
    margin-top: 20px;
`;

const App = () => {
    return (
        <AppContainer>
            <Header>Sorting Visualizer</Header>
            <SortingVisualiser />
        </AppContainer>
    );
};

export default App;
