const {PrismaClient} = require("@prisma/client");
const {generateSlug} = require("../utils");
const prisma=new PrismaClient();

const store = async (req,res)=>{
        const {title,content,slug}=req.body;

        const data={
            title,
            content,
            slug,
            published: req.body.published ? true : false
        }
        // Creare un post
        try {
            const post = await prisma.post.create({data});
            res.status(200).send(post);
        }catch(err){
            console.error(err);
        }
     
}

module.exports ={
    store,
}