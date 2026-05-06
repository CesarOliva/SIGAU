import Nav from "@/app/login/_components/nav";
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