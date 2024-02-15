import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'
import 'src/context/BootstrapProvider';
import React, {FC} from "react";

const BootstrapProvider: FC<{ children: React.ReactNode }> = ({children}) => {
    return (<>
        {children}
    </>);
};

export default BootstrapProvider