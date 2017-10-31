CC  = emcc
SRC = dictionary.cpp bindings.cpp
OUT = bindings.js
DAT = ejdict.json
OPT = -O2 -std=c++1z -s WASM=1 -s TOTAL_MEMORY=52428800 --bind --embed-file $(DAT)

all:
	$(CC) $(SRC) -o $(OUT) $(OPT)

.PHONY: clean

clean:
	rm *~
