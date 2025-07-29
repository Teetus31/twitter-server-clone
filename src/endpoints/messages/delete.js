module.exports = {
    method:'post',
    endpoint:'/messages/delete/:username/:content',
    cmd: async (db, req, res) => {
        const content = req.params.content;
        const username = req.params.username;

        console.log(username, content);

        const deleteMsg = await db.msgs.destroy({where:{username: username, content: content }});

        if(!deleteMsg)
            return res.sendStatus(404);
        return res.sendStatus(200);
    }
}
