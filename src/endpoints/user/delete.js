module.exports =  {
    method: 'post',
    endpoint: '/user/delete/:username/:password',
    cmd: async (db, req, res) => {
        const username = req.params.username;
        const pass = req.params.password;

        const deleteUser = await db.users.destroy({
            where: {
                username: username,
                password: pass
            }
        });

        if(!deleteUser) {
            return res.sendStatus(404);
        }

        const deleteMsg = await db.msgs.destroy({
            where: {
                username: username
            }
        });

        if(!deleteMsg)
            return res.sendStatus(404);

        return res.sendStatus(200);
    }
}
