import React from 'react';

const Bar = ({ height, idx }) => {
    const [barStyle, setBarStyle] = useState({
      width: '8px',
      margin: '0 1px',
    });
  
    useEffect(() => {
      const updateBarStyle = () => {
        const screenWidth = window.innerWidth;
  
        if (screenWidth <= 480) {
          setBarStyle({
            width: '2px',
            margin: '0 0.25px',
          });
        } else if (screenWidth <= 768) {
          setBarStyle({
            width: '4px',
            margin: '0 0.5px',
          });
        } else {
          setBarStyle({
            width: '8px',
            margin: '0 1px',
          });
        }
      };
  
      updateBarStyle();
      window.addEventListener('resize', updateBarStyle);
  
      return () => {
        window.removeEventListener('resize', updateBarStyle);
      };
    }, []);
  
    return (
      <div
        id={`bar-${idx}`}
        style={{
          height: `${height}px`,
          backgroundColor: '#ff9a55',
          display: 'inline-block',
          transition: '0.05s ease',
          ...barStyle,
        }}
      ></div>
    );
  };

export default Bar;
