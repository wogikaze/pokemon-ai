let text = ""
for (let i = 0; i < document.querySelectorAll("table td:not(:has(th))").length - 1; i += 2) {
    text += document.getElementsByTagName("table")[0].querySelectorAll("td:not(:has(th))")[i].innerText
    text += ","
    text += document.getElementsByTagName("table")[0].querySelectorAll("td:not(:has(th))")[i+1].innerText
    text += "\n"
}
console.log(text)