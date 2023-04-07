//基礎設置，把該引用的給引用近來
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')//在當前目錄下尋找名為routes的JavaScript檔案，句號代表當前目錄斜線代表子目錄
const PORT = 3000

// 載入./ config / mongoose.js 檔案，透過這個檔案建立與 MongoDB 資料庫的連線。
require('./config/mongoose')

// 設定 Express 應用程式使用 Handlebars 作為模板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))//設定了 handlebars 的引擎，並指定了應用程式的樣板引擎名稱為 hbs，使用的模板檔案的副檔名為.hbs，預設的版面樣板為 main
app.set('view engine', 'hbs')//設定應用程式使用的模板引擎為 handlebars。

//設定應用程式中使用的中介軟體
app.use(bodyParser.urlencoded({ extended: true }))//用於解析網址編碼的請求主體，並將其轉換為 JavaScript 對象，可以方便地進行處理。
app.use(methodOverride('_method'))//支持在表單提交時使用HTTP動詞，例如使用PUT或DELETE方法，HTML只有支持 GET 和 POST 方法。
app.use(routes)//路由處理函數，用於處理應用程式中的 HTTP 請求，例如 GET、POST、PUT、DELETE 等等。

// 啟動應用程式，並監聽指定的端口，等待客戶端請求。
app.listen(PORT, (req, res) => {
  console.log(`Service on http://localhost:${PORT}`)
})