module.exports = (query) => {
    let obj = {
        keyword: "",
        regex: ""
    }
    
    if(query.keyword){
        obj.keyword = query.keyword.trim();
        const regex = new RegExp(obj.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "i");
        obj.regex = regex;
        obj.$or = [
            { title: regex },
            { description: regex }
        ];
    }
    
    return obj;
}