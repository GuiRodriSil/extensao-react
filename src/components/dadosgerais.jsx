import "./SidePanel.css";
import { useEffect, useState } from 'react';

const DadosGerais = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch('http://localhost:3001/organization');
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        const data = await response.json();
        setOrganizations(data.organizations || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
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
    <div className="sidebar">
      <div className="panel-header" onClick={toggleExpansion}>
        <h2 className="panel-title">Organizações RD Station</h2>
        <span className="arrow">{isExpanded ? '▲' : '▼'}</span>
      </div>
      
      {isExpanded && (
        <div className="panel-content">
          {organizations.length > 0 ? (
            organizations.map((organization) => (
              <div key={organization.id} className="item">
                <div><strong>ID:</strong> {organization.id || 'N/A'}</div>
                <div><strong>Nome:</strong> {organization.resume || 'N/A'}</div>
                <div><strong>Resumo:</strong> {organization.resume || 'N/A'}</div>
                <div><strong>Contagem de vitórias:</strong> {organization.won_count}</div>
                <div><strong>Contagem de perdas:</strong> {organization.lost_count}</div>
                <div><strong>Criado em:</strong> {new Date(organization.created_at).toLocaleDateString()}</div>
                
                {organization.organization_segments && organization.organization_segments.length > 0 && (
                  <div>
                    <h4>Segmentos da Organização:</h4>
                    {organization.organization_segments.map((segment) => (
                      <div key={segment.id}>
                        <div><strong>Nome do Segmento:</strong> {segment.name}</div>
                      </div>
                    ))}
                  </div>
                )}

                {organization.user && (
                  <div>
                    <h4>Informações do Usuário:</h4>
                    <div><strong>Nome:</strong> {organization.user.name}</div>
                    <div><strong>Apelido:</strong> {organization.user.nickname}</div>
                    <div><strong>Email:</strong> {organization.user.email}</div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>Nenhuma organização encontrada.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DadosGerais;
