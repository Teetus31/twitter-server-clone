module.exports =  {
    method: 'post',
    endpoint: '/user/delete',
    cmd: async (db, req, res) => {
        const username = req.cookies.user || null;

        if(!username)
            return res.sendStatus(404);

        const deleteUser = await db.users.destroy({
            where: { username: username }
        });

        if(!deleteUser)
            return res.sendStatus(404);

        await db.msgs.destroy({
            where: {
                username: username
            }
        });

        const currentUser = req.cookies.user || null;

        if(currentUser)
            res.clearCookie("user", {
                httpOnly: true,
                sameSite: true
            })


        return res.sendStatus(200);
    }
}
