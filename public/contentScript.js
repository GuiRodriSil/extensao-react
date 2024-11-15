document.addEventListener('click', function(e) {
    if (e.target.closest('.ticketBorder')) {
        chrome.runtime.sendMessage({ action: "sidePanel" }, (response) => {
            if (response && response.status === "success") {
                console.log("Painel lateral aberto com sucesso!");

                // Obtendo o token da Jetsales
                let tokenJetSales = localStorage.getItem('token');
                if (tokenJetSales) {
                    tokenJetSales = tokenJetSales.replace(/^"|"$/g, ''); // Remove aspas extras
                    console.log('Token JetSales:', tokenJetSales);
                } else {
                    console.error("Token não encontrado no localStorage");
                    return;
                }

                // Obtendo o ID do ticket
                const currentUrl = window.location.href;
                const regex = /atendimento\/(\d+)/; // Correção na expressão regular
                const match = currentUrl.match(regex);
                const ticketId = match && match[1] ? parseInt(match[1], 10) : null;

                if (ticketId) {
                    console.log('Ticket ID:', ticketId);
                } else {
                    console.error("Ticket ID não encontrado na URL");
                    return;
                }

                // Enviando o token para o backend e, em seguida, o ticket
                fetch('http://localhost:3001/api/enviarToken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: tokenJetSales })
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Token enviado com sucesso:", data);

                    // Após o token, enviar o ticket
                    return fetch('http://localhost:3001/api/enviarTicket', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ ticket: ticketId })
                    });
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Ticket enviado com sucesso:", data);
                })
                .catch(error => {
                    console.error("Erro ao enviar o token ou ticket:", error);
                });

            } else {
                console.error("Erro ao abrir o painel lateral:", response ? response.message : "Sem resposta");
            }
        });
    }
});
