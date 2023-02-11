import {FC} from "react";
import {Outlet} from "react-router-dom";

interface MainProps {
}

const Main: FC<MainProps> = () => {
    return (
        <>
            <Outlet/>
        </>
    );
}
export default Main;

