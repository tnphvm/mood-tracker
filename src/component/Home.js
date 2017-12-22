import React from "react";
import "../css/home.css";

export const Home = ({ handleLogout, user, colorHandler, updateMood }) => {
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

   return (
      <div className="row">
         <div className="col-md-4">
            <h2 style={{ textAlign: "center" }}>{user.displayName}</h2>
            <img src={user.avatar} alt={user.displayName} id="prof-pic" />
            <button
               type="button"
               className="btn btn-primary btn-block"
               onClick={handleLogout}
            >
               Sign Out
            </button>
            <div className="text-center">
               <div className="btn-group-vertical">
                  <button
                     type="button"
                     className="btn btn-amazing"
                     onClick={updateMood("fff")}
                  >
                     Amazing!
                  </button>
                  <button type="button" className="btn btn-average">
                     Normal/Average
                  </button>
                  <button type="button" className="btn btn-sad">
                     Depressed/Sad
                  </button>
                  <button type="button" className="btn btn-light">
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
