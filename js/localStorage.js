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
  var time = new Date();
  var month = time.getMonth() + parseInt(1);
  var key_time = time.getFullYear() + "年" + month + "月" + time.getDate() + "日" + time.getHours() + "時" + time.getMinutes() + "分" + time.getSeconds() + "秒(" + time.getMilliseconds()  + ")";
  var val = escapeText(text.val());
  if(checkText(val)) {
  localStorage.setItem(key_time, val);
  $("#caution").text("");
  text.val("");
}
}

// ローカルストレージに保存した値を再描画する
function showText() {
  var list = $("#list");
  list.children().remove();
    
  var key, value, html = [];
  for(var i=0, len=localStorage.length; i<len; i++) {
    key = localStorage.key(i);
    value = localStorage.getItem(key);
    $("#list").prepend("<div class='list_value clearfix'><p>" + value + "</p><span> " + key + "</span></div>");
  }
  list.append(html.join(''));
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
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    if (text === value) {
      $("#formText").css("background-color","#ffe6ea");
    $("#caution").text("※同じ内容は避けてください");
  text.val("");
  return false;
    }
  }
  // すべてのチェックを通過できれば可
  return true;
}

//入力されたリストの削除を行う
function deleteText() {
  var text = $("#formText");
  var text_val = escapeText(text.val());
  var length = localStorage.length;
    
  //文字が記入されていなければ不可
  if(text_val.length === 0){
      $("#formText").css("background-color","#ffe6ea");
      $("#caution").text("※削除したいリストをご記入ください。");
  text.val("");
      return false;
  }else{
  for (var i = 0; i < length; i++) {
    var key = localStorage.key(i);
    var storage_value = localStorage.getItem(key);
    // 内容が一致するものがあるか比較
    if (text_val === storage_value) {
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