// 這段程式碼是定義一個 MongoDB 資料模型，透過使用 Mongoose 套件，將資料庫的 Schema 跟 Model 包裝成 JavaScript 物件，方便在 Node.js 程式中使用。
// 程式碼分成以下部分
// 1.引入 mongoose 套件。
// 2.定義一個資料 Schema，也就是資料的結構，這個 Schema 包含兩個欄位，分別是 url 跟 url_shortened。
// 3.將這個資料 Schema 包裝成一個 Model，並透過 module.exports 導出，這樣其他 JavaScript 檔案就能使用這個 Model 來操作資料庫。
// 簡單來說，這段程式碼在定義一個名稱為 URL 的 MongoDB Model，這個 Model 對應的資料庫中有兩個欄位，分別為 url 與 url_shortened，在操作資料庫時就能使用這個 Model。
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  url: {
    type: String,
    required: true//一定要有輸入東西才可以所以設為true
  },
  url_shortened: {
    type: String,
  }
})
module.exports = mongoose.model('URL', urlSchema)