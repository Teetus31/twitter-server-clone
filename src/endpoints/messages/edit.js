module.exports = {
    method:'post',
    endpoint:'/messages/edit/:username/:content/:newContent',
    cmd: async (db, req, res) => {
        const content = req.params.content;
        const newContent = req.params.newContent;
        const username = req.params.username;

        const editMsg = await db.msgs.update({content: newContent}, {where: {content: content, username: username}});
        console.log(editMsg);

        if(editMsg > 0)
            return res.sendStatus(200)
        return res.sendStatus(500);
    }
}
