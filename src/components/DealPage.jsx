import React, { useEffect, useState } from 'react';
import './DealPage.css';

const DealPage = () => {
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const response = await fetch('http://localhost:3001/deals');
        if (!response.ok) {
          throw new Error('Erro ao buscar deal');
        }
        const data = await response.json();
        setDeal(data.deals[0]); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeal();
  }, []);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error">Erro: {error}</div>;
  }

  return (
    <div className="sidebardeal">
      <div className="panel-header" onClick={toggleExpansion}>
        <h2 className="deal">Detalhes da Negociação</h2>
        <span className="arrow">{isExpanded ? '▲' : '▼'}</span>
      </div>
      
      {isExpanded && (
        <div className="panel-content">
          {deal ? (
            <div className="deal-item">
              <div><strong>ID do Deal:</strong> {deal.id}</div>
              <div><strong>Nome:</strong> {deal.name}</div>
              <div><strong>Valor Mensal:</strong> {deal.amount_montly}</div>
              <div><strong>Valor Único:</strong> {deal.amount_unique}</div>
              <div><strong>Valor Total:</strong> {deal.amount_total}</div>
              <div><strong>Data de Previsão:</strong> {deal.prediction_date || 'Não informado'}</div>
              <div><strong>Markup:</strong> {deal.markup}</div>
              <div><strong>Última Atividade:</strong> {deal.last_activity_at || 'Não disponível'}</div>
              <div><strong>Interações:</strong> {deal.interactions}</div>
              <div><strong>Data de Criação:</strong> {new Date(deal.created_at).toLocaleString()}</div>
              <div><strong>Data de Atualização:</strong> {new Date(deal.updated_at).toLocaleString()}</div>
              <div><strong>Avaliação:</strong> {deal.rating}</div>
              <div><strong>Markup Criado:</strong> {deal.markup_created}</div>

              <h3>Informações do Usuário</h3>
              <div><strong>ID do Usuário:</strong> {deal.user.id}</div>
              <div><strong>Nome:</strong> {deal.user.name}</div>
              <div><strong>Email:</strong> {deal.user.email}</div>
              <div><strong>Apelido:</strong> {deal.user.nickname}</div>

              <h3>Estágio do Deal</h3>
              <div><strong>Nome do Estágio:</strong> {deal.deal_stage.name}</div>
              <div><strong>Apelido:</strong> {deal.deal_stage.nickname}</div>

              <h3>Fonte do Deal</h3>
              <div><strong>Nome da Fonte:</strong> {deal.deal_source.name}</div>

              <h3>Campanha</h3>
              <div><strong>Nome da Campanha:</strong> {deal.campaign.name}</div>
            </div>
          ) : (
            <div>Informação do deal.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DealPage;
