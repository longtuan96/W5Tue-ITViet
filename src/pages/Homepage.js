import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import Header from "../components/Header";
import JobsList from "../components/JobsList";

const Homepage = () => {
  return (
    <div>
      <Header />
      <h1 className="text-center">Lets Get Some Jobs</h1>
      <Button variant="primary" size="lg">
        JOBS
      </Button>
    </div>
  );
};

export default Homepage;
