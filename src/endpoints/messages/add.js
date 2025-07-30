module.exports = {
    method: 'post',
    endpoint: '/messages/add/:content',
    cmd: async(db, req, res) => {
        const content = req.params.content;
        const username = req.cookies.user || null;

        if(!username)
            return res.sendStatus(404);

        const user = await db.users.findOne({where: {username: username}})
        if(!user)
            return res.sendStatus(404);


        const msgs = await db.msgs.create({content: content, username: username});

        if(!msgs)
            return res.sendStatus(500);
        return res.sendStatus(200);

    }
}
