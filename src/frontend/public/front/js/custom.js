const showPassword = (inputClick, inputOut) => {
    let outStatus = document.querySelector('.' + inputOut)
    let input = document.querySelector("." + inputClick)
    if (input.type === "password") {
      input.type = "text"
      outStatus.innerHTML = "<i class='fas fa-eye-slash center-item'></i>";
    } else {
      input.type = "password"
      outStatus.innerHTML = "<i class='fas fa-eye center-item'></i>";
    }
}


const copyElements = (id) => {
  let range = document.createRange();
  range.selectNode(document.querySelector(".copyElements-" + id));
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  document.execCommand("copy");
  window.getSelection().removeAllRanges();// to deselect
}