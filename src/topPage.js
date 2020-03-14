

$(function() {
    loadPages();

    $(document).on("click", "#pages li > a", function(e){
        e.preventDefault();
        
        $("#pages").find("li").removeClass("selected");
        $(this).parent().addClass("selected");
        fetchMarkdown($(this).attr("href"));
    });

    $(document).on("click", "#pages li.dirName", function(e){
        $(this).next().slideToggle();
    });

    $("#menu").click( (e) => {
        $(".side-bar").slideToggle();
    });
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
    var contents = $("<ul></ul>");
    data.files.forEach(name => {
        var link = $("<a></a>").text(name)
                    .attr("href", baseURL +'/'+ name);
        var list = $("<li></li>").append(link);
        contents.append(list);
    });
    delete data.files;

    Object.keys(data).forEach(dir => {
        var dirName = $("<li></li>").addClass("dirName").text(dir);
        var dirLink = $("<li></li>").addClass("dirList").append(dirName);
        var dirList = createLinks(data[dir], baseURL +'/'+ dir);
        dirList.css("display", "none");
        dirLink.append(dirList);
        contents.append(dirLink);
    });

    return contents;
}

/**
 * マークダウンファイルを取得して表示する。
 * @param url ファイル取得先パス
 */
function fetchMarkdown(url){
    var markText = "";
    (async () => {
        try {
          const response = await fetch(url, {method: 'GET'});
          markText = await response.text();
          $(".content").html(marked(markText));
        } catch (e) {
          target.innerHTML = 'failed to load a markdown file';
        }
      })();
}


