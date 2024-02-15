import React from "react";
import {GradeApi} from "../client";

const ApiContext = React.createContext({
    gradeApi: new GradeApi()
})


export {ApiContext}