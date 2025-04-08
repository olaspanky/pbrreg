import RegistrationForm from "./components/RegistrationForm";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Countdown from "./components/Countdown";
import About from "./components/About";
import Event from "./components/Event";

export default function Home() {
  return (
    <div className="bg-[white]">
       <Navbar />
       <Header />
       <Countdown />
       <About />
       <Event />
    </div>
  );
}