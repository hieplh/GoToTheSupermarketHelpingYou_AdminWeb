import React from "react";

import cube from "../images/cube.png";


const TitleStyle = {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    marginTop:20,
    marginLeft:30,
}

const Title = ({numberTrans}) => {
  return (
    <div style={TitleStyle}>
      <img src={cube} alt="cube" style={{width:70,height:70}}/>
      <p style={{fontSize:30,marginRight:10,fontWeight: 'bold',color:'#8989ba'}}>Total Orders:</p>
      <p style={{fontSize:30,color: 'red'}} > {numberTrans}</p>
    </div>
  );
};

export default Title;
