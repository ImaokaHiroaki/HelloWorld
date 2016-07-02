$(loaded);

function loaded(){
    
    var task_number = 0;
    
    var list = $("#list");
    list.children().remove();
    $("#formButton").click(function(){
    //初期化
    var list = $("#list");
    list.children().remove();
    task_number = add_task(task_number);
    $(get(task_number));
//    $(finish_switch);
    });

    $(".finish").click(function(){
        var delete_number = $(this).attr("id");
        $(delete_task(delete_number));
    })
}

//localStorageからtaskデータ取得
function get(task_number) {
    var list = $("#list");
    list.children().remove();
    var value = [];
    for(var i=0; i<task_number; i++) {
        value = localStorage.getItem(i);
        $("div#list").prepend("<input type='button' id='" + i + "' class='finish' value='完了'> <p>" + value + "</p>");
    }
}

//taskをlocalStorageへ保存
function add_task(task_number) {
    var task_text = $("#formText").val();
    localStorage.setItem("task" + task_number,task_text);
    var new_task = task_number + 1;
    //new_taskは新しいkey
    return new_task;
}

function delete_task(delete_number) {
    localStorage.removeItem("task" + delete_number);
}
//
//function finish_switch() {
//    $("#list p").prepend("<input>");
//    $("div#list input").attr({
//        type: 'button',
//        class: 'finish',
//        value: '完了'
//    });
//}