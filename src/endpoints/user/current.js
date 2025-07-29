module.exports = {
    method: "get",
    endpoint: "/user/current",
    cmd: async (_, req, res) => {
        const currentUser = req.cookies.user || null;

        if(!currentUser)
            return res.sendStatus(404);

        res.setHeader("Content-Type", "application/json");
        res.status(200);

        return res.end(JSON.stringify({
            user: currentUser
        }));
    }
}
