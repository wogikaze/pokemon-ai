import csv

# CSVファイルを読み込み、置換マッピングを作成
translation_map = {}
with open("tokusei_jp.csv", encoding="utf-8") as csv_file:
    csv_reader = csv.reader(csv_file)
    for row in csv_reader:
        japanese, english = row
        translation_map[japanese] = english

# items_pre.jsを読み込み
with open("../source/tokusei_pre.js", "r", encoding="utf-8") as file:
    content = file.read()

# 日本語のテキストを英語に置き換え
for japanese, english in translation_map.items():
    # content = content.replace(english, '"' + japanese + '"')
    english = english.replace(" ", "").replace("-", "").replace("'", "").lower()
    print(english)
    content = content.replace("	" + english + ": {", '	"' + japanese + '": {')

# 置き換えた内容をファイルに書き込む
with open("../source/tokusei_pre.js", "w", encoding="utf-8") as file:
    file.write(content)
