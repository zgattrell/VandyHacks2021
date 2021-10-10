import React from 'react';
import './dataContainer.css'

function DataContainer(props) {
    console.log('data container')
    var weightOnMoon = (props.weight * (1/6))
    return (
        <div className="dataContainer">
            <p>MET on the Moon: {((weightOnMoon*3.5)/200)} Calories Burned in last activity on the Moon: {((weightOnMoon*3.5)/200) * (props.distance/60)}</p>
        </div>
    );
}

export default DataContainer;