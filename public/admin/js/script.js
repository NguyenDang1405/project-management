const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonStatus.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}

const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}

const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
  let url = new URL(window.location.href);
  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const btnPagination = button.getAttribute("button-pagination");
      if (btnPagination) {
        url.searchParams.set("page", btnPagination);
      } else {
        url.searchParams.delete("page");
      }
      window.location.href = url.href;
    });
  });
}

const chekboxMulti = document.querySelector("[checkbox-multi]");
if (chekboxMulti) {
  const inputCheckAll = chekboxMulti.querySelector("input[name='checkall']");
  const inputId = chekboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputId.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = chekboxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      if (countChecked == inputId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}

const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e);
    const chekboxMulti = document.querySelector("[checkbox-multi]");
    const inputChecked = chekboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );
    console.log(inputChecked);
    const typeChange = e.target.elements.type.value;
    if (typeChange == "deleteALL") {
      const isConfirm = confirm("bạn có chắc muốn xóa không?");
      if (!isConfirm) {
        return;
      }
    }
    if (inputChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");
      inputChecked.forEach((input) => {
        const id = input.value;

        if (typeChange == "changePosition") {
            const position = input.closest("tr").querySelector("input[name='position']").value;
            ids.push(`${id}-${position}`);
        }else {
            ids.push(id);
        }
       
      });
      inputIds.value = ids.join(", ");
      formChangeMulti.submit();
    } else {
      alert("Vui long chon mot ban ghi");
    }
  });
}
