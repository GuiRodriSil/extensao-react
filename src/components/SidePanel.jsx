import "./SidePanel.css";
import { useEffect, useState } from 'react';

const SidePanel = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:3001');
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        const data = await response.json();
        setContacts(data.contacts || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
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
        <h2 className="contato">Contatos RD station </h2>
        <span className="arrow">{isExpanded ? '▲' : '▼'}</span>
      </div>
      
      {isExpanded && (
        <div className="panel-content">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <div key={contact.id} className="contact-item">
                <div><strong>ID:</strong> {contact.id || 'N/A'}</div>
                <div><strong>Nome:</strong> {contact.name || 'N/A'}</div>
                <div><strong>Título:</strong> {contact.title || 'N/A'}</div>
                <div><strong>Notas:</strong> {contact.notes || 'N/A'}</div>

                {contact.emails && contact.emails.length > 0 && (
                  <div>
                    <h4> Informação dos E-mails:</h4>
                    {contact.emails.map((emailItem, index) => (
                      <div key={index}>
                        <div><strong>Email:</strong> {emailItem.email || 'N/A'}</div>
                      </div>
                    ))}
                  </div>
                )}

                {contact.phones && contact.phones.length > 0 && (
                  <div>
                    <h4>Telefones:</h4>
                    {contact.phones.map((phoneItem, index) => (
                      <div key={index}>
                        <div><strong>Telefone:</strong> {phoneItem.phone || 'N/A'}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>Nenhum contato encontrado.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SidePanel;
