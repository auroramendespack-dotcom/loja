const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Permite requisições de qualquer origem
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.json({ success: false, message: "Preencha todos os campos." });
  }

  // Lê usuários do JSON
  const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    return res.json({ success: true, message: "Login realizado com sucesso", username });
  } else {
    return res.json({ success: false, message: "Usuário ou senha incorretos" });
  }
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
