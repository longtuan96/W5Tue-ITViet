import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import JobDetail from "./JobDetail";
const QUERYSTR_PREFIX = "q";
const JobsList = () => {
  let query = useQuery();
  let history = useHistory();

  const [jobList, setJobList] = useState([]);
  const [input, setInput] = useState("");
  const [originalList, setOriginalList] = useState([]);
  console.log("aaa", query.get(QUERYSTR_PREFIX));
  let [keyword, setKeyword] = useState(query.get(QUERYSTR_PREFIX));
  const fetchData = async () => {
    let url = `https://my-json-server.typicode.com/longtuan96/W5Tue-ITViet/jobs`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    setJobList(data);
    setOriginalList(data);
  };
  const changeToDetail = (id) => {
    console.log("id ", id);
    history.push(`/job/${id}`);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [originalList]);

  const handleSearch = (e) => {
    console.log("haha");
    let filteredJobs = originalList;
    if (e) {
      e.preventDefault();
      history.push(`/jobs/?${QUERYSTR_PREFIX}=${encodeURIComponent(keyword)}`);
    }
    if (keyword) {
      filteredJobs = originalList.filter((job) =>
        job.title.toLowerCase().includes(keyword.toLowerCase())
      );
      console.log("filtered");
    }
    setJobList(filteredJobs);
  };
  // const submitValue = (e) => {
  //   console.log("submit");
  //   e.preventDefault();
  //   // console.log("input:", input);
  //   setKeyword(input);
  // };
  const inputValue = (e) => {
    console.log(e.target.value);
    setKeyword(e.target.value);
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
        <label>
          Name:
          <input type="text" onChange={inputValue} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <h1 className="text-center">{`There are ${
        jobList && jobList.length
      } jobs for you!!`}</h1>
      <div className={"container"}>
        {jobList &&
          jobList.map((item) => (
            <div
              className={"row jobListBox"}
              key={item.id}
              onClick={() => changeToDetail(item.id)}
            >
              <div className={"col-2"}>
                <img src={item.img} alt="company logo" />
              </div>
              <div className={"col-8 d-flex flex-column align-items-start"}>
                <h4>{item.title}</h4>
                <p>{`${item.salary}$`}</p>
                <ul>
                  {item.benefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className={"d-flex"}>
                  {item.tags.map((item) => (
                    <div key={item} className={"tagBox"}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={
                  "col-2 d-flex flex-column justify-content-between align-items-end"
                }
              >
                <div className={item.isHotjob ? "hotJob" : ""}>
                  {item.isHotjob ? "Hot Job" : ""}
                </div>
                <div>
                  <p>{item.city}</p>
                  <p>{`District ${item.district}`}</p>
                </div>
                <div>{moment(item.time).fromNow()}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default JobsList;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
