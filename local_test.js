$(loaded);

function loaded() {
localStorage.clear()
  showText();
  // ボタンをクリックしたときに実行するイベントを設定する
  $("#formButton").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
      saveText();
      showText();
    });
    $("#deleteButton").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
        deleteText();
    });
}

// 文字をエスケープする
function escapeText(text) {
  return $("<div>").text(text).html();
}

function deleteText(){
      // すでに入力された値があれば不可
  var length = localStorage.length;
  for (var i = 0; i < length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    // 内容が一致するものがあるか比較
    if (text.val() === value) {
      localStorage.removeItem("value")
      return false;
    }
}
}

// 入力された内容をローカルストレージに保存する
function saveText() {
  var text = $("#formText");
  var time = new Date();
  var val = escapeText(text.val());
if(checkText(val)) {
  localStorage.setItem(time, escape(val));
    console.log(time)

}
  // テキストボックスを空にする
  text.val("");
}

// ローカルストレージに保存した値を再描画する
function showText() {
  // すでにある要素を削除する
  var list = $("#list")
  list.children().remove();
  // ローカルストレージに保存された値すべてを要素に追加する
  var key, value, html = [];
  for(var i=0, len=localStorage.length; i<len; i++) {
    key = localStorage.key(i);
    value = localStorage.getItem(key);
    html.push("<p>" + value + "</p>");
  }
  list.append(html.join(''));
}


// 入力チェックを行う
function checkText(text) {
  // 文字数が0または20以上は不可
  if (0 === text.length || 20 < text.length) {
    alert("文字数は1〜20字にしてください");
    return false;
  }

  // すでに入力された値があれば不可
  var length = localStorage.length;
  for (var i = 0; i < length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    // 内容が一致するものがあるか比較
    if (text === value) {
      alert("同じ内容は避けてください");
      return false;
    }
  }

  // すべてのチェックを通過できれば可
  return true;
}