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

const show = async (req, res) => {
    try {
        const {slug} = req.params;
        const post = await prisma.post.findUnique({
            where:{slug: slug},
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
        if(post){
            res.json(post);
        }else{
            throw new RestError(`Pizza con id ${id} non trovata.`, 404);
        }
      
    } catch (err) {
      console.error(err);
      res.status(500).send('Errore del server');
    }
  };

const index = async (req, res) => {
  try {
    const {published}= req.query;
   const where ={};
    if(published === 'true'){
        where.published = true
    }else if(published === 'false'){
        where.published = false
    }

    const posts = await prisma.post.findMany({
        where,
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
  show,
  index
};