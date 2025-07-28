const OptionStatus = document.querySelectorAll('select[name="status"]')
if(OptionStatus.length > 0){
    let url = new URL(window.location.href)
    OptionStatus.forEach(select =>{
        select.addEventListener("change", ()=>{
            const status = select.value;
            if(status){
                url.searchParams.set("status", status)
            }else {
                url.searchParams.delete("status")
            }
            window.location.href = url.href
        })
    })
}

const formSearch =  document.querySelector("#form-search");
if(formSearch){
    let url = new URL(window.location.href)
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if(keyword){
                url.searchParams.set("keyword", keyword)
            }else {
                url.searchParams.delete("keyword")
            }
        window.location.href = url.href
    })
}