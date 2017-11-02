#include <emscripten/bind.h>
#include <emscripten/val.h>
#include <unordered_map>
#include <vector>
#include <utility>
#include <algorithm>
#include <string>
#include <optional>
#include <fstream>
#include <locale>
#include <codecvt>
#include "dictionary.hpp"

Dictionary makeDictionary(emscripten::val data) {
	std::unordered_map<std::string, std::string> source;
	std::wstring_convert<std::codecvt_utf8<wchar_t>, wchar_t> cv;
	auto entries = emscripten::val::global("Object").call<emscripten::val>("entries", data);
	for(int i = 0; i < entries["length"].as<int>(); i++) {
		std::pair<std::string, std::string> entry;
		entry.first = cv.to_bytes(entries[i][0].as<std::wstring>());
		entry.second = cv.to_bytes(entries[i][1].as<std::wstring>());
		source.insert(entry);
	}
	return Dictionary(source, 3);
}

std::wstring value_or(const std::optional<std::string>& opt, const std::string& otherwise) {
	std::wstring_convert<std::codecvt_utf8<wchar_t>, wchar_t> cv;
	return cv.from_bytes(opt.value_or(std::forward<const std::string&>(otherwise)));
}

EMSCRIPTEN_BINDINGS(dictionary) {
	emscripten::function("makeDictionary", &makeDictionary);
	emscripten::class_<std::optional<std::string>>("Optional")
		.function("valueOr", &value_or);
	emscripten::class_<Dictionary>("Dictionary")
		.function("correct", &Dictionary::correct)
		.function("lookup", &Dictionary::lookup);
}
