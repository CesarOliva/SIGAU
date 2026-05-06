import Nav from "@/app/(app)/_components/nav";
import Bienvenida from "./_components/bienvenida";

const HomePage = () => {
    return (
        <section className="flex flex-col w-full">
            <Nav/>
            <Bienvenida/>
        </section>
    );
}
 
export default HomePage;