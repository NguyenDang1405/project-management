module.exports.createPost = (req, res, next) => {
    if(!req.body.title){
    req.flash('error', `Vui lòng nhập tiêu đề`);
    const referer = req.get('Referer');
    if (referer && referer.includes('/admin/products')) {
        res.redirect(referer);
    } else {
        res.redirect('/admin/products/create');
    }
        return;
    }
    next();
}