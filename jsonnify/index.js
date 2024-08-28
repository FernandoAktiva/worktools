const textin = document.getElementById("textin");
const hereItIs = document.querySelector(".here-it-is");
const btn = document.getElementById("jsonnify");

textin.addEventListener("input", ()=>{
    hereItIs.innerText = "";
});

btn.addEventListener("click", () => {
    if (textin.value == "") return;
    
    let a = replaceSubstring(textin.value, "'", '"');
    let b = replaceSubstring(a, "False", "false");
    let c = replaceSubstring(b, "True", "true");
    let d = replaceSubstring(c, "None", "null");
    let body_html = new RegExp(/"body_html"\s*:\s*"(.*?)",\s*"/, 'g');
    let e = replaceSubstring(d, body_html, '"body_html": "", "');
    let aphostrophe = new RegExp(/\b(")\b/, 'g')
    let f = replaceSubstring(e, aphostrophe, "'");
    hereItIs.innerText = f;
});

const btnClipboard = document.getElementById("btnClipboard");
btnClipboard.addEventListener("click", ()=>{
    
    let sel = window.getSelection();
    let range = new Range();
    range.selectNodeContents(hereItIs);
    sel.removeAllRanges();
    hereItIs.focus();
    sel.addRange(range);
    document.execCommand("copy");
});

function replaceSubstring(text, replace, withStr) {
    if (replace instanceof RegExp) {
        return text.replaceAll(replace, withStr);
    }
    return text.split(replace).join(withStr);
}

