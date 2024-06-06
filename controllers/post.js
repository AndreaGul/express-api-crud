const { PrismaClient } = require("@prisma/client");
const { generateSlug } = require("../utils");
const prisma = new PrismaClient();

const store = async (req, res) => {
  const { title, content } = req.body;

  try {
    // Ottieni tutti i post per generare uno slug unico
    const posts = await prisma.post.findMany();
    
    const slug = generateSlug(title, posts);

    const data = {
      title,
      content,
      slug,
      published: req.body.published ? true : false
    };

    // Creare un post
    const post = await prisma.post.create({ data });
    res.status(200).send(post);
  } catch (err) {
    console.error(err);
    res.status(500).send('Errore del server');
  }
};

const index = async (req, res) => {
  try {
    const where = {};
    const posts = await prisma.post.findMany({
      include: {
        category: {
          select: {
            name: true
          }
        },
        tags: {
          select: {
            name: true
          }
        }
      }
    });
    res.json({
      posts
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Errore del server');
  }
};

module.exports = {
  store,
  index
};