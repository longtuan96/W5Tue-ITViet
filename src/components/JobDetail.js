import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Media } from "react-bootstrap";
import { useParams } from "react-router-dom";
import locationIcon from "../../src/location-icon.png";
import moneyIcon from "../../src/money-icon.png";
import timeIcon from "../../src/time-icon.png";
const JobDetail = () => {
  const [singleJob, setSingleJob] = useState(null);
  const { id } = useParams();
  const getSingleJob = async () => {
    let url = `https://my-json-server.typicode.com/longtuan96/W5Tue-ITViet/jobs/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    setSingleJob(data);
  };
  console.log(singleJob);
  useEffect(() => {
    getSingleJob();
  }, []);
  return (
    <div>
      <div className={"container"}>
        {singleJob !== null ? (
          <Media>
            <img
              width={64}
              height={64}
              className="mr-3"
              src="holder.js/64x64"
              alt="Company logo"
            />
            <Media.Body>
              <h1>{singleJob.title}</h1>
              <div className="d-flex">
                {singleJob &&
                  singleJob.tags.map((item) => (
                    <div key={item} className={"tagBox"}>
                      {item}
                    </div>
                  ))}
              </div>
              <div className="d-flex align-items-center">
                <img className="iconJobDetail" src={moneyIcon} alt="" />
                <p className="greyWord"> {singleJob.salary}</p>
              </div>
              <div className="d-flex align-items-center">
                <img className="iconJobDetail" src={locationIcon} alt="" />
                <p className="greyWord">{`${singleJob.city} District ${singleJob.district}`}</p>
              </div>
              <div className="d-flex align-items-center">
                <img className="iconJobDetail" src={timeIcon} alt="" />
                <p className="greyWord">{moment(singleJob.time).fromNow()}</p>
              </div>
              <h1>Benefits:</h1>
              <ul>
                {singleJob && singleJob.benefits.map((item) => <li>{item}</li>)}
              </ul>
              <h1>Descriptions:</h1>
              <p>{singleJob.description}</p>
              <button className="buttonJobDetail">Apply now</button>
            </Media.Body>
          </Media>
        ) : (
          console.log("no data yet")
        )}
      </div>
    </div>
  );
};

export default JobDetail;
