

$(function() {
    loadPages();
});

function loadPages(){
    var baseURL = "https://raw.githubusercontent.com/create-personal-1215/techMemo/master";
    var dirJSON = "tree.json";
    $.getJSON(baseURL +'/'+ dirJSON , function(data) {
        var links = createLinks(data, baseURL);
        $("#pages").append(links);
    });
}

function createLinks(data, baseURL){
    var contents = $("<li></li>");
    data.files.array.forEach(name => {
        var link = $("<a></a>").text(name)
                    .attr("href", baseURL +'/'+ name);
        var list = $("<li></li>").append(link);
        contents.append(list);
    });
    delete data.files;
    
    Object.keys(data).forEach(dir => {
        var dirLink = createLinks(data[dir], baseURL +'/'+ dir);
        contents.append(dirLink);
    });

    return contents;
}
