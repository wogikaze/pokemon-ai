import csv
import sys

args = sys.argv
file_type = args[1]

# CSVファイルを読み込み、置換マッピングを作成
translation_map = {}
with open(f"{file_type}_jp.csv", encoding="utf-8") as csv_file:
    csv_reader = csv.reader(csv_file)
    for row in csv_reader:
        japanese, english = row
        translation_map[japanese] = english

# items_pre.jsを読み込み
with open(f"../source/{file_type}_pre.js", "r", encoding="utf-8") as file:
    content = file.read()

# 日本語のテキストを英語に置き換え
for japanese, english in translation_map.items():
    content = content.replace(f'name: "{english}"', 'name: "' + japanese + '"')
    english = english.replace(" ", "").replace("-", "").replace("'", "").lower()
    print(english)
    content = content.replace("	" + english + ": {", '	"' + japanese + '": {')

# 置き換えた内容をファイルに書き込む
with open(f"../source/{file_type}_pre.js", "w", encoding="utf-8") as file:
    file.write(content)
