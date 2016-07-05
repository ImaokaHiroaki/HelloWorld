$(loaded);

function loaded() {
  showText();
  // ボタンをクリックしたときに実行するイベントを設定する
  $("#formButton").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
        $("#formText").css("background-color","#fff");
      saveText();
      showText();
    });
    $("#deleteButton").click(function() {
        $("#formText").css("background-color","#fff");
        deleteText();
        showText();
    });
}

// 入力された内容をローカルストレージに保存する
function saveText() {
  // 時刻をキーにして入力されたテキストを保存する
  var text = $("#formText");
  var time = new Date();
  var val = escapeText(text.val());
  if(checkText(val)) {
  localStorage.setItem(time, val);
  $("#caution").text("");
  // テキストボックスを空にする
  text.val("");
}
}

// ローカルストレージに保存した値を再描画する
function showText() {
  // すでにある要素を削除する
  var list = $("#list");
  list.children().remove();
  // ローカルストレージに保存された値すべてを要素に追加する
  var key, value, html = [];
  for(var i=0, len=localStorage.length; i<len; i++) {
    key = localStorage.key(i);
    value = localStorage.getItem(key);
    $(list).prepend("<p>" + value + "<span>" + key + "</key>");
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
  if (0 === text.length || 20 < text.length) {
      $("#formText").css("background-color","#ffe6ea");
      $("#caution").text("※文字数は1〜20字にしてください");
  // テキストボックスを空にする
  text.val("");
    return false;
  }

  // すでに入力された値があれば不可
  var length = localStorage.length;
  for (var i = 0; i < length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    // 内容が一致するものがあるか比較
    if (text === value) {
      $("#formText").css("background-color","#ffe6ea");
    $("#caution").text("※同じ内容は避けてください");
      return false;
    }
  }
  // すべてのチェックを通過できれば可
  return true;
}

function deleteText() {
  // 時刻をキーにして入力されたテキストを保存する
  var text = $("#formText");
  var text_val = escapeText(text.val());
    // すでに入力された値があれば不可
  var length = localStorage.length;
  for (var i = 0; i < length; i++) {
    var key = localStorage.key(i);
    var storage_value = localStorage.getItem(key);
          // 内容が一致するものがあるか比較
    if (text_val === storage_value) {
        $("#caution").text("リスト「" + text_val + "」を削除しました");
        localStorage.removeItem(key);
        // テキストボックスを空にする
        text.val("");
        return true;
    }
  }
    $("#formText").css("background-color","#ffe6ea");
    $("#caution").text("※リスト内に「" + text_val + "」という項目は見つかりませんでした。");
  return false;
}