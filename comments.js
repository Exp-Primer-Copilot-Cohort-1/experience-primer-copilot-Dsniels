// Crear un servidor web
// Crear un fichero de comentarios
// Crear una API REST
// GET /comments -> Devuelve todos los comentarios
// POST /comments -> Añade un comentario
// GET /comments/:id -> Devuelve el comentario con el id dado
// DELETE /comments/:id -> Elimina el comentario con el id dado

const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());

const COMMENTS_PATH = path.join(__dirname, 'comments.json');

app.get('/comments', async (req, res) => {
  try {
    const comments = await fs.readFile(COMMENTS_PATH);
    res.json(JSON.parse(comments));
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/comments', async (req, res) => {
  try {
    const comments = JSON.parse(await fs.readFile(COMMENTS_PATH));
    const newComment = req.body;
    comments.push(newComment);
    await fs.writeFile(COMMENTS_PATH, JSON.stringify(comments, null, 2));
    res.json(newComment);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/comments/:id', async (req, res) => {
  try {
    const comments = JSON.parse(await fs.readFile(COMMENTS_PATH));
    const comment = comments.find(comment => comment.id === req.params.id);
    if (!comment) {
      res.status(404).send('Comment not found');
      return;
    }
    res.json(comment);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/comments/:id', async (req, res) => {
  try {
    const comments = JSON.parse(await fs.readFile(COMMENTS_PATH));
    const filteredComments = comments.filter(comment => comment.id !== req.params.id);
    if (comments.length === filteredComments.length) {
      res.status(404).send('Comment not found');
      return;
    }
    await fs.writeFile(COMMENTS_PATH, JSON.stringify(filteredComments, null, 2));
    res.send('Comment deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});