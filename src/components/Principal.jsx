import "./Principal.css";
import UsersPage from "./UsersPage";
import SidePanel from "./SidePanel";
import TicketPage from "./TicketPage";
import DadosGerais from "./dadosgerais";



const Principal = () => {
    return (
      <div className="app-container">

        <div className="section-container">
          <TicketPage />
        </div>
        
        <div className="section-container">
          <UsersPage />
        </div>
        
        <div className="section-container">
          <SidePanel />
        </div>

      </div>
    );
  };
  
  export default Principal;
  