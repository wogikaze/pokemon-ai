var getElement = function (id) { return document.getElementById(id); };
var run = getElement("run");
var fix_select = getElement("selectpokemon");
var u_switch = getElement("user_switch");
var e_switch = getElement("enemy_switch");
var u_skill = getElement("user_skill");
var e_skill = getElement("enemy_skill");
var u_select = getElement("user_select");
var e_select = getElement("enemy_select");
var u_change = getElement("user_change");
var e_change = getElement("enemy_change");
var u_hp = getElement("user_hp");
var e_hp = getElement("enemy_hp");
var output = getElement("output");
var settings = getElement("settings");
var buttle = getElement("buttle");
var pagetitle = getElement("pagetitle");
function setup(isDevelop) {
    if (isDevelop) { }
    // u_select.innerHTML = make_select_box(pokemonMap.map(p => p.name))
    e_select.innerHTML = make_select_box(["aaaaaaaaaa", "bbb"]);
}
setup(true);
function make_select_box(names) {
    // create html array of options as `<label><input type="checkbox">カイリュー</label><br>`
    var html = "";
    for (var i = 0; i < names.length; i++) {
        html += "<label><input type=\"checkbox\">".concat(names[i], "</label><br>");
    }
    return html;
}
export {};
//# sourceMappingURL=gui.js.map