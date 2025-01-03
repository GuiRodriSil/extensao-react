import React, { useEffect, useState } from 'react';
import './TicketPage.css';

const TicketPage = () => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch('http://localhost:3001/tickets/836281');
        if (!response.ok) {
          throw new Error('Erro ao buscar ticket');
        }
        const data = await response.json();
        setTicket(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, []);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">Erro: {error}</div>;

  return (
    <div className="ticket-page">
      <div className="panel-header" onClick={toggleExpansion}>
        <h2 className="ticket">Dados do Ticket</h2>
        <span className="arrow">{isExpanded ? '▲' : '▼'}</span>
      </div>

      {isExpanded && ticket && (
        <div className="ticket-item">
          <p>ID do Ticket: {ticket.id}</p>
          <p>Status: {ticket.status}</p>
          <p>Mensagens Não Lidas: {ticket.unreadMessages}</p>
          <p>Última Mensagem: <a href={ticket.lastMessage} target="_blank" rel="noopener noreferrer">Ver Mensagem</a></p>
          <p>Primeira Mensagem: {ticket.firstMessage}</p>
          <p>Canal: {ticket.channel}</p>
          <p>Respondido: {ticket.answered ? 'Sim' : 'Não'}</p>
          <p>Grupo: {ticket.isGroup ? 'Sim' : 'Não'}</p>
          <p>Demanda Ativa: {ticket.isActiveDemand ? 'Sim' : 'Não'}</p>
          <p>Data de Criação: {new Date(ticket.createdAt).toLocaleString()}</p>
          <p>Data de Atualização: {new Date(ticket.updatedAt).toLocaleString()}</p>
         
          <h3>Informações de usuário</h3>
          <p>ID do Contato: {ticket.contact.id}</p>
          <p>Nome: {ticket.contact.name}</p>
          <p>Número: {ticket.contact.number}</p>
          <p>Imagem de Perfil: <img src={ticket.contact.profilePicUrl} alt="Perfil" /></p>
          <p>Pushname: {ticket.contact.pushname}</p>
          <p>Canal: {ticket.contact.channel || 'Não informado'}</p>
          <p>Nome do contato: {ticket.contact.firstConnectionModel.name}</p>
          <p>Status: {ticket.contact.firstConnectionModel.status || 'Não informado'}</p>
          <p>Email: {ticket.contact.email || 'Não informado'}</p>

          <h3>Informações Básicas do contato</h3>
          <p>ID do usuário: {ticket.user.id} </p>
          <p>Nome: {ticket.user.name}</p>
          <p>Email: {ticket.user.email}</p>
           
          <h3>WhatsApp</h3>
          <p>ID: {ticket.whatsapp.id}</p>
          <p>Nome: {ticket.whatsapp.name}</p>
          <p>Tipo: {ticket.whatsapp.type}</p>
          
          <h3>Fila</h3>
          <p>ID: {ticket.queue.id}</p>
          <p>Fila: {ticket.queue.queue}</p>
          <p>Status da fila: {ticket.queue.isActive ? 'Ativo' : 'Não está ativa'}</p>
          <p>ID de usuário na fila: {ticket.queue.userId}</p>
          <p>Criado em: {ticket.queue.createdAt}</p>
          <p>Atualizado em: {ticket.queue.updatedAt}</p>
        </div>
      )}
    </div>
  );
};

export default TicketPage;
