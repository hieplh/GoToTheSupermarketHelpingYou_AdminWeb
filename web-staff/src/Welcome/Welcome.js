import React from 'react';
import LogoStaff from '../images/staff.png'


const welcomeStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  };

const Welcome = ({name}) => {
    return(
        <div style={welcomeStyles}>
            <img src={LogoStaff} style={{height:50,width:50}} alt="Staff"/>
           
            <h2>{name}</h2>
            
        </div>
    )
}

export default Welcome;