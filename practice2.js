$(loaded);

function loaded(){
    
    var task_number = 0;
    
    var list = $("#list");
    list.children().remove();
    
    $("#formButton").click(function(){
        
    var list = $("#list");
    list.children().remove();
        task_number = add_task(task_number);
        $(get(task_number));
    });
}

//localStorageからtaskデータ取得
function get(task_number) {
    
    var list = $("#list");
    list.children().remove();
    var value = [];
    for(var i=0; i<task_number; i++) {
        value = localStorage.getItem(i);
        $("div#list").prepend("<p>" + value + "</p>");
    }
}

//taskをlocalStorageへ保存
function add_task(task_number) {
    var task_text = $("#formText").val();
    localStorage.setItem(task_number,task_text);
    var new_task = task_number + 1;
    //new_taskは新しいkey
    return new_task;
}