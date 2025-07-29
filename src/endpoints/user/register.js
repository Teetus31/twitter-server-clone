module.exports = {
    method: 'post',
    endpoint: '/user/register/:username/:pass',
    cmd: async (db, req, res) => {
        const username = req.params.username;
        const pass = req.params.pass;

        const newUser = await db.users.create({username: username, password: pass});

        if(!newUser)
            return res.sendStatus(500);

        res.cookie("user", username, {
            httpOnly: true,
            sameSite: true,
            maxAge: 3600 * 1000
        })

        return res.sendStatus(200);
    }
}
