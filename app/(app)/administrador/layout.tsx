import { ReactNode } from "react";
import Sidebar from "./_components/aside";

const Layout = ({
    children
}: {
    children: ReactNode;
}) => {
    return (
        <main className="flex min-h-screen">
            <Sidebar/>
            {children}
        </main>
    );
}
 
export default Layout;