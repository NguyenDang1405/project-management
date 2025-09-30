module.exports =  (objPagination,query, count) => {
    if(query.page){
            objPagination.currentPage = parseInt(query.page);
        }
        objPagination.skip = (objPagination.currentPage - 1) * objPagination.limitItem;
        objPagination.totalPage = Math.ceil(count/objPagination.limitItem);
        return objPagination;
}