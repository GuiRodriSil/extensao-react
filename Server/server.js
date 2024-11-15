import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let tokenJetSales = ''; // Variável para armazenar o token dinâmico
let ticketJetSales = ''; // Variável para armazenar o ID do ticket

// Rota para atualizar o token
app.post('/api/enviarToken', (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ status: 'error', message: 'Token não enviado!' });
    }
    tokenJetSales = token;
    console.log("Token recebido:", tokenJetSales);
    res.json({ status: 'success', message: 'Token atualizado com sucesso!' });
});

// Rota para atualizar o ID do ticket
app.post('/api/enviarTicket', (req, res) => {
    const { ticket } = req.body;
    if (!ticket) {
        return res.status(400).json({ status: 'error', message: 'Ticket não enviado!' });
    }
    ticketJetSales = ticket;
    console.log("Ticket ID recebido:", ticketJetSales);
    res.json({ status: 'success', message: 'Ticket atualizado com sucesso!' });
});

// Rota para buscar contatos no CRM da RD Station
app.get('/', async (req, res) => {
    try {
        const response = await fetch('https://crm.rdstation.com/api/v1/contacts?token=66d99c5de8ff3d001a241492');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar contatos' });
    }
});

// Rota para buscar organizações no CRM da RD Station
app.get('/organization', async (req, res) => {
    try {
        const response = await fetch('https://crm.rdstation.com/api/v1/organizations?token=66d99c5de8ff3d001a241492');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar organizações' });
    }
});

// Rota para buscar negócios no CRM da RD Station
app.get('/deals', async (req, res) => {
    try {
        const response = await fetch('https://crm.rdstation.com/api/v1/deals?token=66d99c5de8ff3d001a241492');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar negócios' });
    }
});

// Rota para buscar usuários da JetSales
app.get('/users', async (req, res) => {
    if (!tokenJetSales) {
        return res.status(400).json({ error: 'Token não configurado' });
    }
    try {
        const response = await fetch('https://chatapi.jetsalesbrasil.com/users/?pageNumber=1&hasMore=true', {
            headers: {
                "accept": "application/json, text/plain, */*",
                "authorization": `Bearer ${tokenJetSales}`
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

// Rota para buscar informações de um ticket específico da JetSales
app.get('/tickets/:ticketId', async (req, res) => {
    const ticketId = req.params.ticketId;
    if (!tokenJetSales) {
        return res.status(400).json({ error: 'Token não configurado' });
    }
    try {
        const response = await fetch(`https://chatapi.jetsalesbrasil.com/tickets/${ticketId}?id=${ticketId}`, {
            headers: {
                "accept": "application/json, text/plain, */*",
                "authorization": `Bearer ${tokenJetSales}`
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados do ticket' });
    }
});

// Iniciar o servidor
app.listen(3001, () => {
    console.log("Listening on port 3001");
});
