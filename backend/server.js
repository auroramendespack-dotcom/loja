// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

// Permite requisições de qualquer origem (CORS)
app.use(cors());
app.use(express.json()); // Para ler JSON do body

// Base de dados simples em memória
const users = [
  { username: 'joao', password: '123', allowedPacks: ['Pack1', 'Pack2'] },
  { username: 'maria', password: '456', allowedPacks: ['Pack2', 'Pack3'] }
];

const packs = [
  { name: 'Pack1', description: 'Fotos do Pack 1', link: 'https://drive.google.com/...' },
  { name: 'Pack2', description: 'Fotos do Pack 2', link: 'https://drive.google.com/...' },
  { name: 'Pack3', description: 'Fotos do Pack 3', link: 'https://drive.google.com/...' }
];

// Endpoint de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.json({ success: false, message: 'Usuário ou senha incorretos' });

  res.json({ success: true, username: user.username });
});

// Aqui entra o seu endpoint de getPacks
app.post('/getPacks', (req, res) => {
  const { username } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) return res.json({ success: false, message: 'Usuário não encontrado.' });

  const allowedPacks = packs.filter(pack => user.allowedPacks.includes(pack.name));
  res.json({ success: true, packs: allowedPacks });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
