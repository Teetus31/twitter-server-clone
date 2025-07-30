module.exports = {
    method:'post',
    endpoint:'/messages/edit/:content/:newContent',
    cmd: async (db, req, res) => {
        const content = req.params.content;
        const newContent = req.params.newContent;
        const username = req.cookies.user;

        if(!username)
            return res.sendStatus(404);

        const editMsg = await db.msgs.update({content: newContent}, {where: {content: content, username: username}});
        console.log(editMsg);

        if(editMsg > 0)
            return res.sendStatus(200)
        return res.sendStatus(500);
    }
}
