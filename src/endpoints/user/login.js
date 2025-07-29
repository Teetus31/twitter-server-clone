module.exports = {
    method: 'get',
    endpoint: '/user/login/:username/:pass',
    cmd: async (db, req, res) => {
        const username = req.params.username;
        const pass = req.params.pass;

        const user = await db.users.findOne({where: {username: username, password: pass}});
        console.log(user);

        if(!user)
           return res.sendStatus(404);

        return res.sendStatus(200);
    }
}
