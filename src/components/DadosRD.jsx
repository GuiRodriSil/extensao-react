import DealPage from "./DealPage";
import SidePanel from "./SidePanel";
import DadosGerais from "./dadosgerais";
import "./Principal.css";


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
  