module.exports = {
    method: 'post',
    endpoint: '/messages/add/:content/:username',
    cmd: async(db, req, res) => {
        const content = req.params.content;
        const username = req.params.username;

        const user = await db.users.findOne({where: {username: username}})

        if(!user)
            return res.sendStatus(404);


        const msgs = await db.msgs.create({content: content, username: username});

        if(!msgs)
            return res.sendStatus(500);
        return res.sendStatus(200);

    }
}
