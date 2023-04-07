// 這段程式碼定義了一個 last_five_characters函式
// 接收一個參數url，回傳該參數的後五個字元程式碼最後透過module.exports將last_five_characters函式作為module輸出，以便其他程式可以引入使用
function last_five_characters(url) {
  return url.substr(-5, 5)
}
module.exports = last_five_characters