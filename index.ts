import express, { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import { JSDOM } from 'jsdom'

const getURL = async (url: string) => {
  const jsdom = new JSDOM()
  const parser = new jsdom.window.DOMParser()

  return await axios
    .get(url)
    .then((res) => res.data)
    .then((data) => {
      const el = parser.parseFromString(data, 'text/html')
      const headEls = el.head.children
      const imageEl = Array.from(headEls).find(
        (e) => e.getAttribute('property') === 'og:image'
      )
      if (!imageEl) return ''
      return imageEl.getAttribute('content')
    })
}

type GetORGParam = {
  url: string
}

const app: express.Express = express()

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const router: express.Router = express.Router()
router.post('/api/ogp', async (req: Request<{}, {}, GetORGParam>, res: Response, next: NextFunction) => {
  try {
    const result = await getURL(req.body.url)
    res.send(result)
  } catch (err) {
    next(err.message)
  }
})
app.use(router)

// 3000番ポートでAPIサーバ起動
app.listen(3300,()=>{ console.log('Example app listening on port 3300!') })
