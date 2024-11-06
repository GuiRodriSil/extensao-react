import React, { useEffect, useState } from 'react';
import './Userspage.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedUserIds, setExpandedUserIds] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/users');
        if (!response.ok) {
          throw new Error('Erro ao buscar usuários');
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleExpansion = (userId) => {
    setExpandedUserIds((prevExpanded) => ({
      ...prevExpanded,
      [userId]: !prevExpanded[userId],
    }));
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h2 className="usuario">Usuários</h2>
      {users.map((user) => (
        <div key={user.id} className="user-item">
          <div className="panel-header" onClick={() => toggleExpansion(user.id)}>
            <p><strong>Nome:</strong> {user.name}</p>
            <span className="arrow">{expandedUserIds[user.id] ? '▲' : '▼'}</span>
          </div>
          
          {expandedUserIds[user.id] && (
            <div className="user-details">
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Tipo de perfil:</strong> {user.profile}</p>
              <p><strong>Último Login:</strong> {new Date(user.lastLogin).toLocaleString()}</p>
              <p><strong>Último Logout:</strong> {new Date(user.lastLogout).toLocaleString()}</p>
              <p><strong>Online:</strong> {user.isOnline ? 'Sim' : 'Não'}</p>

              {user.queues.length > 0 ? (
                <div>
                  <h4>Departamentos:</h4>
                  {user.queues.map((queue) => (
                    <div key={queue.id}>
                      <h3>Informações da fila</h3>
                      <p><strong>Departamento:</strong> {queue.queue}</p>
                      <p><strong>Fila de usuário:</strong> {queue.UsersQueues.id}</p>
                      <p><strong>ID da fila:</strong> {queue.UsersQueues.queueId}</p>
                      <p><strong>ID do usuário:</strong> {queue.UsersQueues.userId}</p>
                      <p><strong>Data de Criação da Fila:</strong> {new Date(queue.UsersQueues.createdAt).toLocaleString()}</p>
                      <p><strong>Data de Atualização da Fila:</strong> {new Date(queue.UsersQueues.updatedAt).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Nenhum departamento associado.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UsersPage;
