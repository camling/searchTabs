/**
 * Checks if the string passed to it is part of the current pages URL
 * @function checkURL
 * @param {string} urlPart - part of a url string.
 * @returns {bool} True or false if the windows url matches the urlPart.
 */
function checkURL(urlPart) {
	const currentUrl = window.location.href;
	return currentUrl.includes(urlPart);
}

/**
 * Retrieves a substring from the beginning of a string up to the specified character.
 *
 * @function get_substring_by_character
 * @param {string} string - The input string from which to extract the substring.
 * @param {string} [character=":"] - The character used as a delimiter to determine the substring.
 * @returns {string} The substring from the start of the input string up to the first occurrence of the specified character.
 * @description If the input string contains the specified character, the function extracts the substring
 * from the beginning of the string up to (but not including) the first occurrence of the character.
 * If the character is not found, the entire original string is returned.
 * If the character is not provided, ":" is used as the default delimiter.
 */
function get_substring_by_character(string, character = ":") {
	let str = string;
	if (string.includes(character)) {
		str = string.substring(1);
		str = str.substring(0, str.indexOf(character));
	}

	return str;
}

/**
 * Creates an anchor element and a corresponding searchTab div element for search tab links.
 *
 * @function createSearchTabLink
 * @param {string} query - The search query parameter to include in the link.
 * @param {string} searchValue - The search type parameter to include in the link.
 * @returns {{ anchor: HTMLAnchorElement, searchTab: HTMLDivElement }} An object containing the created anchor and searchTab elements.
 * @description This function creates an anchor element with an href attribute formed from the current window's origin, pathname,
 * and the provided search query and type parameters. It also creates a searchTab div element and returns both elements as an object.
 */
function createSearchTabLink(query, searchValue) {
	const anchor = document.createElement("a");
	anchor.href = `${window.location.origin}${window.location.pathname}?qu=${query}&te=${searchValue}`;

	const searchTab = document.createElement("div");
	searchTab.classList.add("searchTab");

	return { anchor, searchTab };
}

function add_search_tabs() {
	// Stop program from working on profiles you want want it on IE youth
	if (checkURL("youth") || checkURL("mylists")) {
		return;
	}
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const searchType = urlParams.get("te");
	const query = urlParams.get("qu");
	const searchWrapper = document.querySelector(".searchResults_wrapper");

	const searchTabs = document.createElement("div");
	searchTabs.classList.add("searchTabs");
	searchTabs.id = "searchTabs";

	const searchSelect = document.getElementById("searchLimitDropDown");
	const optGroup = searchSelect.querySelector("optgroup");
	const options = optGroup.querySelectorAll("option");

	for (let i = 0; i < options.length; i++) {
		const textValue = options[i].innerText;
		const searchValue = get_substring_by_character(options[i].value, ":");

		console.log(textValue);
		console.log(searchValue);

		const { anchor, searchTab } = createSearchTabLink(query, searchValue);
		searchTab.classList.add("searchTab");

		if (searchType == searchValue) {
			searchTab.classList.add("selectedTab");
		}

		const searchTabText = document.createTextNode(textValue);

		searchTab.appendChild(searchTabText);
		anchor.appendChild(searchTab);
		searchTabs.appendChild(anchor);
	}

	const { anchor: anchor_all, searchTab: searchTab_all } = createSearchTabLink(
		query,
		""
	);

	searchTab_all.classList.add("searchTab");
	if (searchType == "") {
		searchTab_all.classList.add("selectedTab");
	}
	let searchTabText_all = document.createTextNode("Everything");

	searchTab_all.appendChild(searchTabText_all);
	anchor_all.appendChild(searchTab_all);
	searchTabs.appendChild(anchor_all);

	searchWrapper.before(searchTabs);
}

add_search_tabs();
