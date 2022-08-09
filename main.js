function add_search_tabs()
{
    const pathname = window.location.pathname;

    if(pathname.includes("youth"))
    {
        return;
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchType = urlParams.get("te");
    const query = urlParams.get("qu");
    const searchViewContainer = document.getElementById("searchViewDISCOVERY_ALL");
    const searchWrapper = document.querySelector(".searchResults_wrapper");
    
    const searchTabs = document.createElement("div");
    searchTabs.classList.add("searchTabs");
    searchTabs.id = "searchTabs";

    function update_value(value)
    {

        let str = value;
        if(value.includes(":"))
        {
            str = value.substring(1);
            str = str .substring(0, str .indexOf(':'));
        }

        if(value.includes("BYOUTH_"))
        {
            str = value.substring(1);
        }
       
        return str;

    }

    const searchSelect = document.getElementById("searchLimitDropDown");
    const optGroup = searchSelect.querySelector("optgroup");
    const options = optGroup.querySelectorAll("option");

    for(let i = 0; i < options.length; i++)
    {
        let textValue = options[i].innerText;
        let searchValue = update_value(options[i].value);

        console.log(textValue);
        console.log(searchValue);

        let anchor = document.createElement("a");
        anchor.href = window.location.protocol + "//" +window.location.hostname + window.location.pathname + "?qu=" +  query + "&" + "te="+searchValue;

        let searchTab = document.createElement("div");
        searchTab.classList.add("searchTab");
        
        if(searchType == searchValue)
        {
            searchTab.classList.add("selectedTab");
        }

        let searchTabText = document.createTextNode(textValue);

        searchTab.appendChild(searchTabText);
        anchor.appendChild(searchTab)
        searchTabs.appendChild(anchor);
        
    }
    
    let anchor_all = document.createElement("a");
    anchor_all.href = window.location.protocol + "//" +window.location.hostname + window.location.pathname + "?qu=" +  query + "&" + "te=";
    let searchTab_all = document.createElement("div");
    searchTab_all.classList.add("searchTab");
    if(searchType == "")
    {
        searchTab_all.classList.add("selectedTab");
    }
    let searchTabText_all = document.createTextNode("Everything");
    
    searchTab_all.appendChild(searchTabText_all);
    anchor_all.appendChild(searchTab_all)
    searchTabs.appendChild(anchor_all);

    
    searchWrapper.before(searchTabs);
}

add_search_tabs();