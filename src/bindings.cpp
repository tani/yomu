#include <emscripten/bind.h>
#include <unordered_map>
#include <vector>
#include <utility>
#include <algorithm>
#include <string>
#include <optional>
#include <fstream>
#include <locale>
#include <codecvt>
#include "json.hpp"
#include "dictionary.hpp"

Dictionary makeDictionary() {
	std::unordered_map<std::string, std::string> source;
	std::ifstream data("ejdict.json");
	nlohmann::json json;
	data >> json;
	for(auto it = std::begin(json); it != std::end(json); ++it) {
		source.insert(std::make_pair<std::string, std::string>(it.key(), it.value()));
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
