//基礎設置
const express = require('express')
const router = express.Router()
const URL = require('../models/url')
const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`

//引入functions資料夾中的模組
const randomchar = require('../functions/randomchar')
const id = require('../functions/id')

//當用戶訪問根目錄時，在網頁中顯示一個名為index的模板
router.get('/', (req, res) => {
  res.render('index')
})


router.post('/submit', (req, res) => {
  //如果什麼都沒輸入的話
  if (!req.body.url) return res.redirect('/')
  const { url } = req.body
  URL.findOne({ url })
    .then((url_check) => {
      if (url_check && url_check.url) {
        //輸入相同的網址要產生相同的短網址
        res.redirect(`/result/${id(url_check.url_shortened)}`)
      } else {
        let url_end = randomchar()
        URL.create({ url, url_shortened: `${HOST}/${url_end}` })
        res.redirect(`/result/${url_end}`)
      }
    })
    .catch(error => console.log(error))
})

// 取得短網址
router.get('/result/:id', (req, res) => {
  const id = req.params.id
  URL.findOne({ url_shortened: { $regex: id } }, 'url url_shortened')
    .lean()
    .then(url => res.render('result', { url }))
    .catch(error => console.log(error))
})

// 取得url
router.get('/:id', (req, res) => {
  const id = req.params.id
  URL.findOne({ url_shortened: { $regex: id } }, 'url url_shortened')
    .lean()
    .then(url => res.redirect(url.url))
    .catch(error => console.log(error))
})


module.exports = router