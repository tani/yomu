import sqlite3
import json

cn = sqlite3.connect('ejdict.sqlite3')
cr = cn.cursor()
sql = 'select * from items'
raw = [(row[1], row[2]) for row in cr.execute(sql)]
print(json.dumps(dict(raw)))
cn.close()
