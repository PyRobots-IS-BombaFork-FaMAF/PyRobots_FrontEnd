import NavBar from "./NavBar";
import "./Home.css"
export default function Home() {
  return (
        <div>
          <div>
            <NavBar data-testid="NavBar" />
          </div>
          <div id="bg-image"></div>
        </div>
  );
}
