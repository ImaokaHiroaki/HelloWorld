$(loaded);

function loaded(){
    $(save);
}

function save(){
    $("#formButton").click(function(){
        var moji = $("#formText").val();
        var key = new Date();
        localStorage.setItem(key,moji);
        
    $(get);
    });
};

function get() {
    var list = $("#list");
    list.children().remove();
    var key, value = [];
    for(var i=0, len=localStorage.length; i<len; i++) {
        key = localStorage.key(i);
        value = localStorage.getItem(key);
        $("div#list").prepend("<p>" + value + "</p>");
    }
}