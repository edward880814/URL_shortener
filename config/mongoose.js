// 這段程式碼是用來建立 MongoDB 的連線，並且印出連線成功或失敗的訊息。
// 程式碼中先引入 mongoose，接著判斷環境變數是否為 production 模式，如果不是則載入 dotenv 套件以載入環境變數檔案(.env)。
// 然後透過 mongoose.connect 方法來建立連線，其中的 process.env.MONGODB_URI 就是 MongoDB 的連線網址，因為環境變數中已經將連線網址定義好，所以可以直接用 process.env.MONGODB_URI 來取得網址。
// 接著，程式碼中使用 db.on 來設定連線失敗時印出 "mongodb error!" 的訊息，使用 db.once 來設定連線成功時印出 "mongodb connected!" 的訊息。
// 最後，使用 module.exports 來將這個連線物件匯出，以便在其他檔案中使用此連線物件來建立 Schema 和 Model
const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, {
   useNewUrlParser: true, useUnifiedTopology: true
  })

const db = mongoose.connection

db.on('error', () => {
  console.log('Error!')
})

db.once('open', () => {
  console.log('MongoDB successfully connected!')
})

module.exports = db