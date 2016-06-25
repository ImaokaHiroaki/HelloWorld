$(button);

function button(){
    $("#formButton").click(function(){
    var moji = $("#formText").val();
    $("div#list").prepend("<p>" + moji + "</p>");
    });
};