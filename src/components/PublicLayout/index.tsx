import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import "./index.scss";

const PublicLayout = () => {
    const [ sidebarOpen, setSidebarOpen ] = useState<boolean>(true)
    const [ unlogin, setUnlogin ] = useState<boolean>(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            setUnlogin(true)
            setSidebarOpen(false)
        }
    }, [])

    return (
        <div className='layout'>

            {/* sidebar */}
            <Sidebar
                setSidebarStatus={
                    function (arg0: boolean): void {
                        setSidebarOpen(arg0)
                    }
                }
                openByFa={sidebarOpen}
            />

            {/* main */}
            <div className='main'>
                <Navbar
                    hasSidebarIcon={!sidebarOpen}
                    openSidebar={
                        function (): void {
                            setSidebarOpen(true)
                        }
                    }
                    unlogin={unlogin}
                    setUnlogin={setUnlogin}
                />
                {/* use route component to fill content */}
                <Outlet />
                <div className='footer'>
                    ChatGPT can make mistakes. Check important info.
                </div>
            </div>

        </div>
    );
};

export default PublicLayout;
