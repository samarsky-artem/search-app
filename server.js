let http = require("http");
let fileSys = require("fs");

function prepareResults(results){
    return results.map(function(result){
        return {
            title: result.title,
            description: result.snippet,
            link: result.link
        }
    });

}

let server = http.createServer(function(reque, respo){
    if(reque.url === "/"){
        fileSys.readFile("public/index.html", function(err, data){
            respo.writeHead(200, {
                "Content-Type": "text/html"
            });
            respo.end(data);
        });
    }

    if(reque.url === "/style.css"){
        fileSys.readFile("public/style.css", function(err, data){
            respo.writeHead(200, {
                "Content-Type": "text/css"
            });
            respo.end(data);
        });
    }

    if(reque.url === "/script.js"){
        fileSys.readFile("public/script.js", function(err, data){
            respo.writeHead(200, {
                "Content-Type": "text/javascript"
            });
            respo.end(data);
        });
    }

    if(reque.url === "/search" && reque.method === "POST"){
        let body = "";
        let data;

        respo.writeHead(200, {
        "Content-Type": "application/json"
        });

        reque.on("data", function(chunk){
            body += chunk
        });

        reque.on("end", function(){
            data = JSON.parse(body);

            console.log(data.searchText);

            let params = new URLSearchParams({
                engine: "google",
                q: data.searchText,
                location: "Brno, Czechia",
                gl: "cz",
                hl: "cs",
                api_key: "6ff3cd88f74364711fb8292dc60922fdd9318f919eab2541badc525eaf59b60c"
            })

            fetch("https://serpapi.com/search?" + params.toString())
                 .then(function(answer){
                      return answer.json();
                 })
                 .then(function(result){
                    console.log(result);

                    respo.end(JSON.stringify(prepareResults(result.organic_results)));
                    console.log(result.organic_results);
                 })

        });
    }
});

if(require.main === module){
    server.listen(process.env.PORT || 2000, function(){
    console.log("Server started on port 2000");
    });
}


module.exports = {prepareResults};