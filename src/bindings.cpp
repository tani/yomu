#include <emscripten/bind.h>
#include <unordered_map>
#include <vector>
#include <utility>
#include <algorithm>
#include <string>
#include <optional>
#include <fstream>
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
/*
Dictionary makeDictionary(const emscripten::val& data) {
	std::unordered_map<std::string, std::string> source;
	const auto& entries  = emscripten::vecFromJSArray<emscripten::val>(data);
	const auto& begin    = std::begin(entries);
	const auto& end      = std::end(entries);
	const auto& inserter = std::inserter(source, std::end(source));
	std::transform(begin, end, inserter, [](emscripten::val entry){ 
		return std::make_pair(entry[0].as<std::string>(), entry[1].as<std::string>());
	});
	return Dictionary(source, 3);
}
*/
std::string value_or(const std::optional<std::string>& opt, const std::string& otherwise) {
	return opt.value_or(std::forward<const std::string&>(otherwise));
}

EMSCRIPTEN_BINDINGS(dictionary) {
	emscripten::function("makeDictionary", &makeDictionary);
	emscripten::class_<std::optional<std::string>>("Optional")
		.function("valueOr", &value_or);
	emscripten::class_<Dictionary>("Dictionary")
		.function("correct", &Dictionary::correct)
		.function("lookup", &Dictionary::lookup);
}
