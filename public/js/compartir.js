
function copyLink() {
  
    let copyText1 = document.getElementById("joinLink")
    console.log(copyText1);
    var selection = window.getSelection();

    var range = document.createRange();

    range.selectNodeContents(copyText1);

    selection.removeAllRanges();

    selection.addRange(range);

    document.execCommand('copy');
}
