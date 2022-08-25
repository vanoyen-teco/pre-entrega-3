const root = (req, res) => {
    res.render("./admin/dash", {
        layout: 'admin',
        pageTitle: "CMS",
        loggedIn: true
    });
}

module.exports = {
    root,
};