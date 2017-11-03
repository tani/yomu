CC  = emcc
SRC = dictionary.cpp bindings.cpp
OUT = pdf.js/web/bindings.js
OPT = -O2 -std=c++1z
OPT += --bind
OPT += -s WASM=1
OPT += -s TOTAL_MEMORY=52428800
OPT += -s MODULARIZE=1

all: $(OUT)

$(OUT): $(SRC)
	$(CC) $(SRC) -o $(OUT) $(OPT)
