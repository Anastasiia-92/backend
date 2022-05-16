import cors from 'cors'
import bodyParser from 'body-parser'
import express, {Request, Response} from 'express'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())

let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

app.get('/', (req: Request, res: Response) => {
    res.status(200).send([
        {
            id: 0,
            title: "string",
            author: "string"
        }
    ])
})

app.get('/videos', (req: Request, res: Response) => {
    res.status(200).send(videos)
})

app.get('/videos/:videoId', (req: Request, res: Response) => {

    const id = +req.params.videoId;
    const video = videos.find(video => video.id === id)
    !!video ? res.status(200).send(video) : res.status(404).send('video not found')
})

app.post('/videos', (req: Request, res: Response) => {

    const validateBody = req.body.title?.trim()
    if (typeof validateBody === "string" && validateBody.length <= 40 && validateBody.length > 0) {
        const newVideo = {
            id: +(new Date()),
            title: req.body.title,
            author: 'it-incubator.eu'
        }
        videos.push(newVideo)
        res.status(201).send(newVideo)
    } else {
        const error = {
            errorsMessages: [
                {
                    message: 'maxLength: 40',
                    field: 'title',
                }
            ],
            resultCode: 1
        }
        res.status(400).send(error)
    }
})

app.delete('/videos/:id', (req: Request, res: Response) => {
    const video = videos.find(v => v.id === +req.params.id)
    if (video) {
        videos = videos.filter(v => v.id !== +req.params.id)
        res.status(204).send('No content')
    } else {
        res.status(404).send('Not found')
    }

})

app.put('/videos/:id', (req: Request, res: Response) => {
    const validateBody = req.body.title?.trim()

    const video = videos.find(v => v.id === +req.params.id)

    if (!video) {
        return res.status(404).send('Not Found')
    }
    if (typeof validateBody === "string" && validateBody.length <= 40 && validateBody.length > 0) {
        video.title = req.body.title
        //videos = videos.map((v) => v.id === +req.params.id ? {...v, title: req.body.title} : v)
        res.status(204).send(video)
    } else {
        const error = {
            errorsMessages: [
                {
                    message: 'maxLength: 40',
                    field: 'title',
                }
            ],
            "resultCode": 1
        }
        res.status(400).send(error)
    }

})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
