all: ejdict.json

ejdict.json: ejdict.sqlite3
	python3 conv.py ejdict.sqlite3 > ejdict.json
