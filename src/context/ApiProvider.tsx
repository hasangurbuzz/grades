import React, {FC} from 'react';
import {ApiContext} from "./ApiContext";
import {GradeApi} from "../client";

const ApiClientProvider: FC<{ children: React.ReactNode }> = ({children}) => {
    const gradeApi = new GradeApi();
    return (
        <ApiContext.Provider value={
            {gradeApi: gradeApi}
        }>
            {children}
        </ApiContext.Provider>
    )
}

export default ApiClientProvider