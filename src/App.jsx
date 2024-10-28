import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Key from "./components/Key";
import SidePanel from "./components/SidePanel";
import DadosGerais from "./components/dadosgerais";
import UsersPage from "./components/UsersPage";
import TicketPage from "./components/TicketPage";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/key">Key</Link>
            </li>
            <li>
              <Link to="/sidepanel">Side Panel</Link>
            </li>
            <li>
              <Link to="/dadosgerais">Dados Gerais</Link>
            </li>
            <li>
              <Link to="/userspage">Usuários</Link>
            </li>
            <li>
              <Link to="/ticketpage">Ticket</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/key" element={<Key />} />
          <Route path="/sidepanel" element={<SidePanel />} />
          <Route path="/dadosgerais" element={<DadosGerais />} />
          <Route path="/userspage" element={<UsersPage />} />
          <Route path="/ticketpage" element={<TicketPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
