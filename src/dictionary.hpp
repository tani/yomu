#pragma once
#include <string>
#include <unordered_map>
#include <optional>
#include <regex>
#include <iostream>

class Dictionary {
	private:
		const int max_depth;
		const std::unordered_map<std::string, std::string> source;
		const std::string alphabet;
		const std::regex suffix;
		std::optional<std::string> edit(const std::string&, const int) const;
	public:
		Dictionary(const std::unordered_map<std::string, std::string>&, const int);
		std::optional<std::string> correct(const std::string&) const;
		std::optional<std::string> lookup(const std::string&) const;
};
