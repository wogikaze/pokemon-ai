# pokemon.tsvをチームの表記に書き変える
# tsvファイルのパスを指定
import csv
import re


file_path = "./pokemon.tsv"


def extract_effort_values(text):
    # ステータス名を定義
    stat_names = {
        "H": "HP",
        "A": "Atk",
        "D": "Def",
        "C": "SpA",
        "B": "SpD",
        "S": "Spe",
    }

    # 努力値を初期化
    effort_values = {name: 0 for name in stat_names.values()}

    # 各ステータスが大文字で単独の場合は252を代入し、小文字なら後続の数字を代入
    for stat, name in stat_names.items():
        if stat in text and not re.search(f"{stat}\d", text):
            effort_values[name] = 252
        else:
            match = re.search(f"{stat.lower()}(\d+)", text)
            if match:
                effort_values[name] = int(match.group(1))

    # 0以外の努力値を "値 キー" の形式で表示
    output = " / ".join(
        f"{value} {key}" for key, value in effort_values.items() if value != 0
    )
    return output


data_array = []
pokemon_team = ""
with open(file_path, "r", encoding="utf-8") as file:
    lines = file.readlines()
    for line in lines[1:]:  # 1行目以降を処理
        line = line.strip()  # 改行文字を取り除く
        columns = line.split("\t")  # タブで分割
        data_array.append(columns)
        pokemon_team += f""""{columns[0]}" @ "{columns[11]}"
Ability: "{columns[10]}"
EVs: {extract_effort_values(columns[1])}
"{''.join(re.findall(r'[あ-ん]', columns[1]))}" Nature
- "{columns[13]}"
- "{columns[15]}"
- "{columns[17]}"
- "{columns[19]}"

"""


def translate(text):
    translation_map = {}
    for file_name in ["Poke", "Move", "Ability", "Items", "Nature"]:
        with open(f"../tools/{file_name}_jp.csv", encoding="utf-8") as csv_file:
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

    # items_pre.jsを読み込み
    # with open(f"../src/data/{file_type}dex.ts", "r", encoding="utf-8") as file:
    content = text

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
        # content = content.replace(" " + english + ": {", ' "' + japanese + '": {')
        # print(f'"{english}"')
        content = content.replace(f'"{japanese}"', f"{english}")
        # content = content.replace(f"{japanese}", f"{english}")
    return content


# 結果を表示
print(data_array[0])
output_ja = translate(pokemon_team)
print(output_ja)
print("\n".join(re.findall(r'"(.*?)"', output_ja)))
