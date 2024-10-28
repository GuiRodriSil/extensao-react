import "./SidePanel.css";
import { useEffect, useState } from 'react';

const SidePanel = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div className="loading" >Carregando...</div>;
  }

  if (error) {
    return <div className="error" >Erro: {error}</div>;
  }

  return (
    <div className="sidebar">
      <h2>Contatos</h2>
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <div key={contact.id} className="contact-item">
            <div><strong>ID:</strong> {contact.id || 'N/A'}</div>
            <div><strong>Nome:</strong> {contact.name || 'N/A'}</div>
            <div><strong>Título:</strong> {contact.title || 'N/A'}</div>
            <div><strong>Notas:</strong> {contact.notes || 'N/A'}</div>

            {/* Emails */}
            {contact.emails && contact.emails.length > 0 && (
              <div>
                <h4>E-mails:</h4>
                {contact.emails.map((emailItem, index) => (
                  <div key={index}>
                    <div><strong>Email:</strong> {emailItem.email || 'N/A'}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Telefones */}
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
  );
};


export default SidePanel