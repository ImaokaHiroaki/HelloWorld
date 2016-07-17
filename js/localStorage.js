$(loaded);

function loaded() {
    
    
    showText();
    //リストをクリックするとその内容がフォームに入力される
    $(document).on("click","#list p",function() {
        var text = $(this).text();
        $("#formText").val(text);
    });
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
        $("#list").prepend("<div class='list_value clearfix'><p>" + val + "</p><span> " + list.date + "</span></div>");
        console.log(list.number + "/" + list.value + "/" + list.date)
    }
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
//
//    // すでに入力された値があれば不可
//    var length = localStorage.length;
//    for (var i = 0; i < length; i++) {
//        var key = localStorage.key(i);
//        var value = localStorage.getItem(key);
//        if (text === value) {
//            $("#formText").css("background-color","#ffe6ea");
//            $("#caution").text("※同じ内容は避けてください");
//            text.val("");
//            return false;
//        }
//    }
    // すべてのチェックを通過できれば可
    return true;
}

//入力されたリストの削除を行う
function deleteText() {
    var text = $("#formText");
    var length = localStorage.length;
    
    //文字が記入されていなければ不可
    if(text.val().length === 0){
        $("#formText").css("background-color","#ffe6ea");
        $("#caution").text("※削除したいリストをご記入ください。");
        text.val("");
        return false;
    }else{
        for (var i = 0; i < length; i++) {
            var key = localStorage.key(i);
            var storage_value = localStorage.getItem(key);
            // 内容が一致するものがあるか比較
            if (text.val() === storage_value) {
                $("#caution").text("リスト「" + text.val() + "」を削除しました");
                localStorage.removeItem(key);
                text.val("");
                return true;
            }
        }
        //内容が一致する者がなければ不可
        $("#formText").css("background-color","#ffe6ea");
        $("#caution").text("※リスト内に「" + text.val() + "」という項目は見つかりませんでした。");
        text.val("");
        return false;
    }
}