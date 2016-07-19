$(loaded);

function loaded() {
    
    showText();
    
    //リストの登録
    $("#formButton").click(function() {
        $("#formText").css("background-color","#fff");
        saveText();
        showText();
    });
    
    //全削除
    $("#AlldeleteButton").click(function() {
        $("#formText").css("background-color","#fff");
        localStorage.clear();
        showText();
    });
}

// 入力された内容をローカルストレージに保存する
function saveText() {
    var text = $("#formText");
    
    var list = {
        number: "Number",
        content: "Content",
        date: "Date",
        check: "0"
    }
    
    if(checkText(text.val())) {
        
        list.number = ("00" + localStorage.length).slice(-3);
        
        list.content = text.val();
        
        //日付を設定
        var time = new Date();
        var month = ("0"+(time.getMonth() + parseInt(1))).slice(-2);
        var day = ("0"+time.getDate()).slice(-2);
        var hour = ("0"+time.getHours()).slice(-2);
        var minutes = ("0"+time.getMinutes()).slice(-2);
        var seconds = ("0"+time.getSeconds()).slice(-2);
        
        list.date = time.getFullYear() + "年" + month + "月" + day + "日" + hour + "時" + minutes + "分" + seconds + "秒(" + time.getMilliseconds()  + ")";
        localStorage.setItem(list.number,JSON.stringify(list));
        $("#caution").text("");
        text.val("");
    }
}

// ローカルストレージに保存した値を再描画する
function showText() {
    var list_ = $("#list");
    list_.children().remove();
    
    var keys, value, date, html = [];
    
    for(var i=0, len=localStorage.length-1; i<=len; len--) {
        keys = ("00" + len).slice(-3);
        
        var list = JSON.parse(localStorage.getItem(keys));
        if (list != null){
        var val = escapeText(list.content);
        
        if (list.check == 1){
            $("#list").append("<div class='list_value clearfix'><input class='check' type='checkbox' onClick='checkbox(" + list.number + ");' checked='checked' /><p>" + val + "</p><span> " + list.date + "</span></div>");
        } else {
            $("#list").append("<div class='list_value clearfix'><input class='check' type='checkbox' onClick='checkbox(" + list.number + ");' /><p>" + val + "</p><span> " + list.date + "</span></div>");
        }
        
        $("#list").append("<input type='button' onClick='delete_list(" + list.number + ")'  value='↑削除'/>");
        
        console.log(list.number + "/" + list.content);
        }
    }
    console.log("-----");
}

//チェックボックスのデータ
function checkbox(val) {
     key = ("00" + val).slice(-3);
     console.log(val);
     var list = JSON.parse(localStorage.getItem(key));
     if (list != null) {
     
     if (list.check == 1) {
         list.check = 0;
     } else {
         list.check = 1;
     }
     localStorage.removeItem(list.number);
     localStorage.setItem(list.number,JSON.stringify(list));
     }
     showText();
 }

//削除ボタンの制御
function delete_list(val) {
     key = ("00" + val).slice(-3);
    
    localStorage.removeItem(key);
    localStorage.setItem(key,"null");
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
        return false;
    }

    // すでに入力された値があれば不可
    var length = localStorage.length;
    for (var i = 0; i < length; i++) {
        keys = ("00" + i).slice(-3);
        var list = JSON.parse(localStorage.getItem(keys));
        if (list != null){
            if (text === list.content) {
                $("#formText").css("background-color","#ffe6ea");
                $("#caution").text("※同じ内容は避けてください");
                return false;
            }
        }
    }
    // すべてのチェックを通過できれば可
    return true;
}
