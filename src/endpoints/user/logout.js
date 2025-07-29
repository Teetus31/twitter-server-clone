module.exports = {
    method: "get",
    endpoint: "/user/logout",
    cmd: async (_, req, res) => {
        const currentUser = req.cookies.user || null;

        if(!currentUser)
            return res.sendStatus(404);

        res.clearCookie("user", {
            httpOnly: true,
            sameSite: true
        })

        res.status(200);

        return res.end();
    }
}
