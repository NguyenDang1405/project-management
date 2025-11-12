module.exports.createPost = (req, res, next) => {
    if(!req.body.fullname){
    req.flash('error', `Vui lòng nhập tên`);
    const referer = req.get('Referer');
    if (referer && referer.includes('/admin/accounts')) {
        res.redirect(referer);
    } else {
        res.redirect('/admin/account/create');
    }
        return;
    }
    if(!req.body.email){
    req.flash('error', `Vui lòng nhập email`);
    const referer = req.get('Referer');
    if (referer && referer.includes('/admin/accounts')) {
        res.redirect(referer);
    } else {
        res.redirect('/admin/account/create');
    }
        return;
    }
    if(!req.body.password){
    req.flash('error', `Vui lòng nhập mật khẩu`);
    const referer = req.get('Referer');
    if (referer && referer.includes('/admin/accounts')) {
        res.redirect(referer);
    } else {
        res.redirect('/admin/account/create');
    }
        return;
    }
    next();
}