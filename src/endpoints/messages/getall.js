module.exports = {
    method:'get',
    endpoint:'/messages/getall',
    cmd: async (db, req, res) => {
        const msgList = await db.msgs.findAll();

        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({
            msgList
        }));
    }
}
