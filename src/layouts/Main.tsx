import {FC} from "react";
import {Outlet} from "react-router-dom";
import {Notification} from "@/features/notification/Notification";

interface MainProps {
}

const Main: FC<MainProps> = () => {
    return (
        <>
            <Notification/>
            <Outlet/>
        </>
    );
}
export default Main;

