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
            <td key={1} onClick={colorHandler} bgcolor="" />
            <td key={2} onClick={colorHandler} bgcolor="" />
            <td key={3} onClick={colorHandler} bgcolor="" />
            <td key={4} onClick={colorHandler} bgcolor="" />
            <td key={5} onClick={colorHandler} bgcolor="" />
            <td key={6} onClick={colorHandler} bgcolor="" />
            <td key={7} onClick={colorHandler} bgcolor="" />
            <td key={8} onClick={colorHandler} bgcolor="" />
            <td key={9} onClick={colorHandler} bgcolor="" />
            <td key={10} onClick={colorHandler} bgcolor="" />
            <td key={11} onClick={colorHandler} bgcolor="" />
            <td key={12} onClick={colorHandler} bgcolor="" />
         </tr>
      );
   }

   let borderColor = "";
   if (state.state.currMood)
      borderColor = "solid 10px #" + state.state.currMood;

   const colorPreview = {
      display: "inline-block",
      border: borderColor,
      width: 10,
      height: 10
   };

   return (
      <div className="row">
         <div className="col-md-4">
            <b>Mood Selected: </b>
            <div style={colorPreview} />
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
                  <button type="button" className="btn btn-secondary">
                     Stressed/Anxious
                  </button>
                  <button type="button" className="btn btn-secondary">
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
         <div className="col-md-8">
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
