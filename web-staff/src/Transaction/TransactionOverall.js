import React from "react";

const TransactionOverall = ({ Title, num, image, colorBackground }) => {
  
  return (
    <div style={{ width: 400, height: 100 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          marginLeft: 40,
          marginRight:5,
          border: "2px solid #596164",
          justifyContent: "center",
          background: colorBackground,
          padding:5
        }}
      >
        <img
          style={{ width: 80, height: 80, marginRight: 20,marginLeft:10 }}
          src={image}
          alt={""}
        />

        <div style={{ textAlign: "center" }}>
          <p style={{ fontWeight: "bold", fontSize: 20 }}>{Title}</p>
          <p style={{ fontWeight: "bold", fontSize: 25, color: "#243949" }}>
            {num}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionOverall;
