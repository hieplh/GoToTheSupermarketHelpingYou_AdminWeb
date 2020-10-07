import React, { useState } from "react";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const SelectDateStyle = {
    
    marginTop:'20px',
    

}
 
const SelectDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div style={SelectDateStyle}>
        <label style={{marginRight:5}}>Select Date </label>
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
    </div>
  
  );
};

export default SelectDate;