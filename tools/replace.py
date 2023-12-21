import csv
import sys

args = sys.argv
file_type = args[1]

# CSVファイルを読み込み、置換マッピングを作成
translation_map = {}
for file_name in ["Poke", "Move", "Ability", "Items"]:
    with open(f"{file_name}_jp.csv", encoding="utf-8") as csv_file:
        csv_reader = csv.reader(csv_file)
        for row in csv_reader:
            japanese, english = row
            translation_map[english] = japanese
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
    "Normal",
    "Fire",
    "Water",
    "Electric",
    "Grass",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dragon",
    "Dark",
    "Steel",
    "Fairy",
]
for t in range(len(type_ja)):
    translation_map[type_en[t]] = type_ja[t]

# 置き換えたいファイルを取得
with open(f"../src/data/{file_type}dex.ts", "r", encoding="utf-8") as file:
    content = file.read()

# 日本語のテキストを英語に置き換え
for english, japanese in translation_map.items():
    # content = content.replace(f'name: "{english}"', f'name: "{japanese}"')
    content = content.replace(f'"{english}"', f'"{japanese}"')
    english = (
        english.replace(" ", "")
        .replace(".", "")
        .replace("-", "")
        .replace("'", "")
        .lower()
    )
    # print(english)
    content = content.replace(" " + english + ": {", ' "' + japanese + '": {')
    # print(f'"{english}"')
    content = content.replace(f'"{english}"', f'"{japanese}"')
    # content = content.replace(f"{english}", f"{japanese}")

# 置き換えた内容をファイルに書き込む
with open(f"../src/data/{file_type}dex.ts", "w", encoding="utf-8") as file:
    file.write(content)
