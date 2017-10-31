#include <string>
#include <unordered_map>
#include <optional>
#include <regex>
#include <iostream>
#include "dictionary.hpp"

Dictionary::Dictionary(const std::unordered_map<std::string, std::string>& source, int max_depth)
	: max_depth(max_depth)
	, source(source)
	, suffix(std::regex("ing$|ies$"))
	, alphabet("abcdefghijklmnopqrstuvwxyz") {}

std::optional<std::string> Dictionary::edit(const std::string& word, int depth) const {
	if (depth == max_depth) {
		return (source.find(word) != std::end(source)) ? std::make_optional(word) : std::nullopt;
	}

	std::optional<std::string> result;
	for(int i = word.length() - 1; !result.has_value() && i > 0; --i) {
		for(auto c = std::begin(alphabet); !result.has_value() && c != std::end(alphabet); ++c) {
			std::string replacement = word;
			replacement[i] = *c;
			result = edit(replacement, depth+1);
		}
	}
	for(int i = word.length() - 1; !result.has_value() && i >= 0; --i) {
		std::string replacement = word;
		replacement[i] ^= replacement[i+1];
		replacement[i+1] ^= replacement[i];
		replacement[i] ^= replacement[i+1];
		result = edit(replacement, depth+1);
	}
	for(int i = word.length() - 1; !result.has_value() && i >= 0; --i) {
		std::string replacement = word;
		replacement.erase(std::begin(replacement)+i);
		result = edit(replacement, depth+1);
	}
	for(int i = word.length() - 1; !result.has_value() && i > 0; --i) {
		for(auto c = std::begin(alphabet); !result.has_value() && c != std::end(alphabet); ++c) {
			std::string replacement = word;
			replacement.insert(std::begin(replacement)+i, *c);
			result = edit(replacement, depth+1);
		}
	}
	return result;
}

std::optional<std::string> Dictionary::correct(const std::string& word) const {
	std::string replacement(std::regex_replace(word, suffix, "i"));
	std::optional<std::string> result = std::nullopt;
	for(int i = max_depth; !result.has_value() && i > 0; --i) {
		result = edit(replacement, i);
	}
    return result;
}

std::optional<std::string> Dictionary::lookup(const std::string& word) const {
	auto keyword = correct(word);
	return keyword.has_value() 
		? std::make_optional(source.at(keyword.value()))
		: std::nullopt;
}
