import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import "./index.scss";

const PublicLayout = () => {
    return (
        <div className='layout'>

            {/* sidebar */}
            <Sidebar uid="" />

            {/* main */}
            <div className='main'>
                {/* <Navbar /> */}
                {/* use route component to fill content */}
                <Outlet />
            </div>

        </div>
    );
};

export default PublicLayout;
