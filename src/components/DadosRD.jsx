import DealPage from "./DealPage";
import "./Principal.css";
import SidePanel from "./SidePanel";
import DadosGerais from "./dadosgerais";



const DadosRD = () => {
    return (
      <div className="app-container">

        <div className="section-container">
          <SidePanel />
        </div>

        <div className="section-container">
          <DadosGerais />
        </div>

        <div className="section-container">
          <DealPage />
        </div>

      </div>
    );
  };
  
  export default DadosRD;
  