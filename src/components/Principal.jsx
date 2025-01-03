import "./Principal.css";
import UsersPage from "./UsersPage";
import SidePanel from "./SidePanel";
import TicketPage from "./TicketPage";
import DadosGerais from "./dadosgerais";
import DealPage from "./DealPage";



const Principal = () => {
    return (
      <div className="app-container">

        <div className="section-container">
          <TicketPage />
        </div>
        
        <div className="section-container">
          <SidePanel />
        </div>

        <div className="section-container">
          <DadosGerais />
        </div>

        <div className="section-container">
          <DealPage />
        </div>
        
        <div className="section-container">
          <UsersPage />
        </div>
      
      </div>
    );
  };
  
  export default Principal;
  