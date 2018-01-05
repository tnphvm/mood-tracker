import React from "react";
import "../css/home.css";

export const Home = ({
   handleLogout,
   user,
   colorHandler,
   updateMood,
   state
}) => {
   const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
   ];
   const columns = months.map(month => (
      <th scope="col" key={month}>
         {month}
      </th>
   ));

   const days = [];
   for (let i = 0; i < 31; i++) {
      days.push(
         <tr key={i + 1}>
            <th scope="row">{i + 1}</th>
            <td key={1} onClick={colorHandler} id={"1-" + (i + 1)} bgcolor="" />
            <td key={2} onClick={colorHandler} id={"2-" + (i + 1)} bgcolor="" />
            <td key={3} onClick={colorHandler} id={"3-" + (i + 1)} bgcolor="" />
            <td key={4} onClick={colorHandler} id={"4-" + (i + 1)} bgcolor="" />
            <td key={5} onClick={colorHandler} id={"5-" + (i + 1)} bgcolor="" />
            <td key={6} onClick={colorHandler} id={"6-" + (i + 1)} bgcolor="" />
            <td key={7} onClick={colorHandler} id={"7-" + (i + 1)} bgcolor="" />
            <td key={8} onClick={colorHandler} id={"8-" + (i + 1)} bgcolor="" />
            <td key={9} onClick={colorHandler} id={"9-" + (i + 1)} bgcolor="" />
            <td key={10} onClick={colorHandler} id={"10-" + (i + 1)} bgcolor="" />
            <td key={11} onClick={colorHandler} id={"11-" + (i + 1)} bgcolor="" />
            <td key={12} onClick={colorHandler} id={"12-" + (i + 1)} bgcolor="" />
         </tr>
      );
   }

   let borderColor = "";
   if (state.state.currMood)
      borderColor = "solid 30px #" + state.state.currMood;

   const colorPreview = {
      display: "block",
      border: borderColor,
      width: 30,
      height: 30,
      marginRight: "auto",
      marginLeft: "auto"
   };

   return (
      <div className="row">
         <div className="col-md-3">
            <div className="mood-header">
               <p id="mood">Mood Selected: </p>
               <div style={colorPreview} />
            </div>
            <div className="text-center">
               <div className="btn-group-vertical">
                  <button
                     type="button"
                     className="btn btn-amazing"
                     onClick={updateMood("ffea63")}
                  >
                     Happy/Amazing
                  </button>
                  <button
                     type="button"
                     className="btn btn-average"
                     onClick={updateMood("44b539")}
                  >
                     Normal/Average
                  </button>
                  <button
                     type="button"
                     className="btn btn-sad"
                     onClick={updateMood("3866b5")}
                  >
                     Depressed/Sad
                  </button>
                  <button
                     type="button"
                     className="btn btn-stressed"
                     onClick={updateMood("e8923c")}
                  >
                     Stressed/Anxious
                  </button>
                  <button
                     type="button"
                     className="btn btn-angry"
                     onClick={updateMood("b23131")}
                  >
                     Angry/Frustrated
                  </button>
                  <button
                     type="button"
                     className="btn btn-light"
                     onClick={updateMood("")}
                  >
                     Clear
                  </button>
               </div>
            </div>
         </div>
         <div className="col-md-9">
            <h1>2018</h1>
            <table className="table table-bordered">
               <thead className="thead-dark">
                  <tr>
                     <th scope="col">#</th>
                     {columns}
                  </tr>
               </thead>
               <tbody>{days}</tbody>
            </table>
         </div>
      </div>
   );
};
