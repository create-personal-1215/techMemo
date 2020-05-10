

$(function() {
    setupMarked();
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

function setupMarked(){
    marked.setOptions({
        // code要素にdefaultで付くlangage-を削除
        langPrefix: '',
        // highlightjsを使用したハイライト処理を追加
        highlight: function(code, lang) {
          return hljs.highlightAuto(code, [lang]).value
        }
      });
}

function loadPages(){
    var baseURL = "https://raw.githubusercontent.com/create-personal-1215/techMemo/master";
    var dirJSON = "tree.json";
    $.getJSON(baseURL +'/'+ dirJSON , function(data) {
		console.log(data);
        var links = createLinks(data, baseURL + '/doc');
        $("#pages").append(links);
    });
}

function createLinks(data, baseURL){
    var contents = $("<ul></ul>");
    data.files.forEach(name => {
        var filename = name.slice(0, name.indexOf("."));
        var link = $("<a></a>").text(filename)
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
          var regex = /sql:/gi;
          markText = markText.replace(regex, "sql")
          if(response.ok){
            // ファイル読み込み
            var $content = $(".content");
            $content.html(marked(markText));
            
            // コード部分に言語を表示
            $content.find("code").each(function(index){
                var className = $(this).attr("class");
                var codeLang  = className.substr(0);  //9は"language-"の文字数
                var $lang = $("<span></span>").addClass("codeLanguage").text(codeLang);
                $(this).before($lang);
            });
          }else{
            $(".content").html("存在しないファイルです。");
          }
          
        } catch (e) {
            console.log(e);
          $(".content").html('failed to load a markdown file');
        }
      })();
}


