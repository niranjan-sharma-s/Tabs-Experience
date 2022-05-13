import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

const url = "https://course-api.com/react-tabs-project";
function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <section className="section">
      {loading && (
        <section className="section loading">
          <h1>Loading...</h1>
        </section>
      )}

      <h2 className="title">Experience</h2>
      <div className="underline"></div>
      {employees.length && (
        
        <div className="job-center" style={{"display": "inline-flex"}} >
          {/* {button container} */}
          <div className="btn-container">
            {employees.map((item, index) => {
              return (
                <button
                  key={item.id}
                  onClick={() => setValue(index)}
                  className={`job-btn ${index === value} && 'active-btn`}
                >
                  {item.company}
                </button>
              );
            })}
          </div>
          {/* {job-info} */}
          <article className="job-info">
            <h3>{employees[value].title}</h3>
            <h4>{employees[value].company}</h4>
            <p className="job-date">{employees[value].dates}</p>
            {employees[value].duties.map((duty) => {
              return (
                <div key={duty.id} className="job-desc">
                  <FaAngleDoubleRight className="job-icon" />
                  <p>{duty}</p>
                </div>
              );
            })}
          </article>
        </div>
      )}
    </section>
  );
}

export default App;
