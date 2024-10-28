import React, { useEffect, useState } from 'react';
import './Userspage.css'
const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h2>Usuários</h2>
      {users.map(user => (
        <div key={user.id} className="user-item">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Tipo de perfil:</strong> {user.profile}</p>
          <p><strong>Último Login:</strong> {new Date(user.lastLogin).toLocaleString()}</p>
          <p><strong>Último Logout:</strong> {new Date(user.lastLogout).toLocaleString()}</p>
          <p><strong>Online:</strong> {user.isOnline ? "Sim" : "Não"}</p>
          

          {/* Exibir Filas (Queues), departamentos */}
          {user.queues.length > 0 ? (
            <div>
              <h4>Departamentos:</h4>
              {user.queues.map(queue => (
                <div key={queue.id}>
                  
                  <h3>Informações da fila</h3>
                  <p><strong>Departamento:</strong> {queue.queue}</p>
                  <p><strong>Fila de usuario:{queue.UsersQueues.id}</strong></p>
                  <p><strong>Id da fila:{queue.UsersQueues.queueId}</strong></p>
                  <p><strong>Id do usuario: {queue.UsersQueues.userId}</strong></p>
                  <p><strong>Tenant Id:{queue.UsersQueues.tenantId}</strong></p>
                  <p><strong>Data de Criação da Fila: {queue.UsersQueues.createdAt}</strong></p>
                  <p><strong>Data de Criação da Fila: {queue.UsersQueues.updatedAt}</strong></p>
                </div>
              ))}
            </div>
          ) : (
            <p>Nenhum departamento associado.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default UsersPage;
