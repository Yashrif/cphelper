import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Grid } from "@chakra-ui/react";

import { Home } from "./home";
import { SideBar } from "./reusable/SideBar";
import { ProblemSet } from "./problemSet";
import { Problem } from "./problemSet/Problem";

export const App = () => {
  return (
    <Grid
      h={"100vh"}
      w={"100vw"}
      // py={"36"}
      overflow={"hidden"}
      templateColumns={"auto 1fr"}
      columnGap={"16"}
    >
      <HashRouter>
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problemset" element={<ProblemSet />} />
          <Route path="/problemset/problem/:id/:index" element={<Problem />} />
        </Routes>
      </HashRouter>
    </Grid>
  );
};
