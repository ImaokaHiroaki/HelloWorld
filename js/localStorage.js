$(loaded);

function loaded() {
    
    showText();
    //リストの登録
    $("#formButton").click(function() {
        $("#formText").css("background-color","#fff");
        saveText();
        showText();

//    for(var i=0, len=localStorage.length; i<len; i++) {
//        keys = ("00" + i).slice(-3);
//        value = localStorage.getItem(keys);
//        date = localStorage.getItem("date_"+keys);
//        console.log(value + "「" + keys + "」");
//    }
//        console.log("-----");
    });
    $("#AlldeleteButton").click(function() {
        $("#formText").css("background-color","#fff");
        localStorage.clear();
        
        showText();
    });
    //リストの削除
    $("#deleteButton").click(function() {
        $("#formText").css("background-color","#fff");
        deleteText();
        showText();
    });
}

// 入力された内容をローカルストレージに保存する
function saveText() {
    var text = $("#formText");
    
    var list = {
        number: "Number",
        value: "Value",
        date: "Date",
        check: "Checked"
    }
    
    
    if(checkText(text.val())) {
        
        list.number = ("00" + localStorage.length).slice(-3);
        
        list.value = text.val();
        
        //日付を設定
        var time = new Date();
        var month = ("0"+(time.getMonth() + parseInt(1))).slice(-2);
        var day = ("0"+time.getDate()).slice(-2);
        var hour = ("0"+time.getHours()).slice(-2);
        var minutes = ("0"+time.getMinutes()).slice(-2);
        var seconds = ("0"+time.getSeconds()).slice(-2);
        
        list.date = time.getFullYear() + "年" + month + "月" + day + "日" + hour + "時" + minutes + "分" + seconds + "秒(" + time.getMilliseconds()  + ")";
        localStorage.setItem(list.number,JSON.stringify(list));
        //日付を登録
 //       var date_key = "date_" + list_key;
 //       localStorage.setItem(date_key, key_time);
        $("#caution").text("");
        text.val("");
    }
}

// ローカルストレージに保存した値を再描画する
function showText() {
    var list_ = $("#list");
    list_.children().remove();
    
    var keys, value, date, html = [];
    
    for(var i=0, len=localStorage.length; i<len; i++) {
        keys = ("00" + i).slice(-3);
        
        var list = JSON.parse(localStorage.getItem(keys));
        var val = escapeText(list.value);
        
        $("#list").prepend("<input type='button' onClick='delete_list(" + list.number + ")'  value='↑削除'/>");
        $("#list").prepend("<div class='list_value clearfix'><p>" + val + "</p><span> " + list.date + "</span></div>");
        console.log(list.number + "/" + list.value + "/" + list.date);
    }
}

function delete_list(key) {
     key = ("00" + key).slice(-3);
    
    localStorage.removeItem(key);
    console.log("hit!" + key );
    showText();
}

// 文字をエスケープする
function escapeText(text) {
    return $("<div>").text(text).html();
}

// 入力チェックを行う
function checkText(text) {
    // 文字数が0または20以上は不可
    if (0 === text.length) {
        $("#formText").css("background-color","#ffe6ea");
        $("#caution").text("※文字数は1〜20字にしてください");
        text.val("");
        return false;
    }

    // すでに入力された値があれば不可
    var length = localStorage.length;
    for (var i = 0; i < length; i++) {
        keys = ("00" + i).slice(-3);
        var list = JSON.parse(localStorage.getItem(keys));
        if (text === list.value) {
            $("#formText").css("background-color","#ffe6ea");
            $("#caution").text("※同じ内容は避けてください");
            text.val("");
            return false;
        }
    }
    // すべてのチェックを通過できれば可
    return true;
}
