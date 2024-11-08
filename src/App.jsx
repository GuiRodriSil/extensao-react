import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SidePanel from "./components/SidePanel";
import UsersPage from "./components/UsersPage";
import TicketPage from "./components/TicketPage";
import Principal from "./components/Principal";
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
      <h1 className='app-title'>JET DATA</h1>
        <nav>
          <ul className="Links">

            <li>
              <Link to="/Principal">Principal</Link>
            </li>
            <li>
              <Link to="/sidepanel">Side Panel</Link>
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
          <Route path="/Principal" element={<Principal />} />
          <Route path="/sidepanel" element={<SidePanel />} />
          <Route path="/userspage" element={<UsersPage />} />
          <Route path="/ticketpage" element={<TicketPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;