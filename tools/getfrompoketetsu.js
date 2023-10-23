let text = ""
for (let i = 0; i < document.querySelectorAll("table td:not(:has(th))").length - 1; i += 2) {
    text += document.getElementsByTagName("table")[0].querySelectorAll("td:not(:has(th))")[i].innerText
    text += ","
    text += document.getElementsByTagName("table")[0].querySelectorAll("td:not(:has(th))")[i + 1].innerText
    text += "\n"
}
console.log(text)

/*持ち物*/
let t = ""
for (let i = 0; i < document.querySelectorAll("td:not(:has(th))").length / 2 - 1; i += 3) {
    if (document.querySelectorAll("td:not(:has(th))")[i+1].innerText.match("持たせると")!==null) {
        t += document.querySelectorAll("td:not(:has(th))")[i].innerText
        t += ","
        t += document.querySelectorAll("td:not(:has(th))")[i + 1].innerHTML
            .replace(/<img[^<>]*?alt="([^<>]*?)".+?>/g, "($1)")
            .replace(/<img[^<>]+?>/g, "")
            .replace(/<a[^<>]*?>|<\/a>/g, "")
            .replace(/<span.*?>|<\/span>/g,"")
        t += "\n"
    }
}
console.log(t)