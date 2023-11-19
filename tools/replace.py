import csv
import sys

args = sys.argv
file_type = args[1]

# CSVファイルを読み込み、置換マッピングを作成
translation_map = {}
for file_name in ["skills", "tokusei", "items"]:
    with open(f"{file_name}_jp.csv", encoding="utf-8") as csv_file:
        csv_reader = csv.reader(csv_file)
        for row in csv_reader:
            japanese, english = row
            translation_map[japanese] = english
type_ja = [
    "ノーマル",
    "ほのお",
    "みず",
    "でんき",
    "くさ",
    "こおり",
    "かくとう",
    "どく",
    "じめん",
    "ひこう",
    "エスパー",
    "むし",
    "いわ",
    "ゴースト",
    "ドラゴン",
    "あく",
    "はがね",
    "フェアリー",
]
type_en = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "Ground",
    "flying",
    "Psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
]
for t in range(len(type_ja)):
    translation_map[type_ja[t]] = type_en[t]

# items_pre.jsを読み込み
with open(f"../source/{file_type}_pre.js", "r", encoding="utf-8") as file:
    content = file.read()

# 日本語のテキストを英語に置き換え
for japanese, english in translation_map.items():
    content = content.replace(f'name: "{english}"', 'name: "' + japanese + '"')
    content = content.replace(f'"{english}"', '"' + japanese + '"')
    english = english.replace(" ", "").replace("-", "").replace("'", "").lower()
    # print(english)
    content = content.replace("	" + english + ": {", '	"' + japanese + '": {')
    content = content.replace(f'"{english}"', '"' + japanese + '"')

# 置き換えた内容をファイルに書き込む
with open(f"../source/{file_type}_pre.js", "w", encoding="utf-8") as file:
    file.write(content)
