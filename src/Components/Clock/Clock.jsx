import React, { useEffect } from 'react';
import './Clock.css';
import TimeFinal from './TimeFinal';
import clocks from '../../images/clock.png'

export default function Clock({timeString}) {
    const [rotation, setRotation] = React.useState(180);
    const [rotationMinute, setRotationMinute] = React.useState(270);
    const [rotationHour, setRotationHour] = React.useState(0);
    const [parts, setParts] = React.useState([]);

    useEffect(() => {
        setParts(timeString.split(/[:/\s]+/));
    }, [timeString])

    useEffect(() => {
        setRotation(-90 + (parts[2] * 6));
        setRotationMinute(-90 + (parts[1] * 6) + (parts[2] * 0.1));
        setRotationHour(-90 + (parts[0] * 30) + (parts[1] * 0.5) + (parts[2] * 0.00833));
    }, [parts])

    return (
        <div>
            <div className = 'Digital-Clock' style = {{backgroundImage: `url(${clocks})`}}>
                <div className='Digital-Clock-Second' style={{
                    animationName: 'spin', 
                    animationDuration: '1s', 
                    animationIterationCount: 'infinite', 
                    animationTimingFunction: 'linear'
                }}>
                </div>
                <div className='Digital-Clock-Minute' style={{
                    animationName: 'spinMinute', 
                    animationDuration: '3600s', 
                    animationIterationCount: 'infinite', 
                    animationTimingFunction: 'linear'
                }}>
                </div>
                <div className='Digital-Clock-Hour' style={{ 
                    animationName: 'spinHour',
                    animationDuration: '43200s',
                    animationIterationCount: 'infinite',
                    animationTimingFunction: 'linear'
                }}>
                </div>
                <div style ={{borderRadius : '5px', height : '10px', width : '10px', backgroundColor : 'black', position : 'absolute', top : '50%', left : '50%', transform : 'translate(-50%, -50%)', zIndex : '4'}}></div>
            </div>
            <style>
                {`
                    @keyframes spin {
                        0%   { transform: rotate(${rotation}deg); }
                        100% { transform: rotate(${rotation}deg); }
                    }

                    @keyframes spinMinute {
                        0%   { transform: rotate(${rotationMinute}deg); }
                        100% { transform: rotate(${rotationMinute}deg); }
                    }

                    @keyframes spinHour {
                        0%   { transform: rotate(${rotationHour}deg); }
                        100% { transform: rotate(${rotationHour}deg); }
                    }
                `}
            </style>
        </div>
    );
}
