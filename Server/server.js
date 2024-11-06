import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
const app = express();

app.use(cors())

const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2FybmFtZSI6IkFsdW5vIFVuaXQiLCJ0ZW5hbnRJZCI6NzEsInRlbmFudFVpZCI6IjAwY2VhNzYzLWNmZjUtNGFlZS04NmU0LTg1ODJlNTE4OTE1NiIsInVpZCI6ImUzZjc1ZDBiLTA1YjQtNGVhNi04MDJmLTI4ZTVmZTBhNzhjNyIsInByb2ZpbGUiOiJ1c2VyIiwiaWQiOjUyNywiaWF0IjoxNzMwOTAwNjQzLCJleHAiOjE3MzExNTk4NDN9.yzh_D86nDZPRb5Ze8U3ehIrQLZLpj_roPnbQRXIpm_I" ;

app.get('/', async (req,res) =>{
    const response = await fetch('https://crm.rdstation.com/api/v1/contacts?token=66d99c5de8ff3d001a241492')
    const data = await response.json()
    
    res.json(data)
    
});

app.get('/users', async (req, res) => {
    try {
        const response = await fetch('https://chatapi.jetsalesbrasil.com/users/?pageNumber=1&hasMore=true', {
            headers: {
                "accept": "application/json, text/plain, */*",
                "authorization": `Bearer ${token}`
            },
            method: "GET"
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

app.get('/tickets/:ticketId', async (req, res) => {
    const ticketId = req.params.ticketId;
    try {
        const response = await fetch(`https://chatapi.jetsalesbrasil.com/tickets/${ticketId}?id=${ticketId}`, {
            headers: {
                "accept": "application/json, text/plain, /*",
                "authorization": `Bearer ${token}`
            },
            method: "GET"
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados do ticket' });
    }
});

app.listen(3001, () => {
    console.log("Listening on port 3001")
})