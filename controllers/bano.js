
exports.getBan = (req, res, next) => {
    let query = req.query.q
    arg = query.split(' ').join('+')
    let filter = req.params.filter
    res.redirect(`http://api-adresse.data.gouv.fr/search/?q=${filter}+${arg}`, )
};