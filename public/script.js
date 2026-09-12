let input = document.getElementById("input-search");
let searchButton = document.getElementById("button-search");
let downloadButton = document.getElementById("button-download");
let results = document.getElementById("content-result");
let lastResult;

searchButton.addEventListener("click", function(){
    let query = input.value;
    fetch("/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            searchText: query
        })
    })
    .then(function(response){
        return response.json();

    })
    .then(function(result){
        console.log(result);

        lastResult = result;

        results.innerHTML = "";

        result.forEach(function(item){
        let showResult = document.createElement("div");
        showResult.classList.add("result-content");
        let title = document.createElement("h3");
        title.textContent = item.title;
        let description = document.createElement("p");
        description.textContent = item.snippet;
        let link = document.createElement("a");
        link.textContent = item.link;
        link.href = item.link;

        showResult.appendChild(title);
        showResult.appendChild(description);
        showResult.appendChild(link);

        results.appendChild(showResult);

        });

    });

});

downloadButton.addEventListener("click", function(){
    let json = JSON.stringify(lastResult, null, 2);
    let blob = new Blob([json], {
        type: "application/json"
    });
    
    let url = URL.createObjectURL(blob);

    let link = document.createElement("a");
    link.href = url;
    link.download = "search-results.json";

    link.click();

    URL.revokeObjectURL(url);
});