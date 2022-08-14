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

let bloggers = [
    {id: 1, name: 'About JS - 01', youtubeUrl: 'it-incubator.eu'},
    {id: 2, name: 'About JS - 02', youtubeUrl: 'it-incubator.eu'},
    {id: 3, name: 'About JS - 03', youtubeUrl: 'it-incubator.eu'},
    {id: 4, name: 'About JS - 04', youtubeUrl: 'it-incubator.eu'},
    {id: 5, name: 'About JS - 05', youtubeUrl: 'it-incubator.eu'},
]

const showError = (field: string, message: string, res: Response) => {
    const error = {
        errorsMessages: [
            {
                message: message,
                field: field,
            }
        ]
    }
    res.status(400).send(error)
};

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


//bloggers

app.get('/hs_01/api/bloggers', (req: Request, res: Response) => {
    res.status(200).send(bloggers)
})

app.post('/hs_01/api/bloggers', (req: Request, res: Response) => {

    const newBlogger = {
        id: +(new Date()),
        name: '',
        youtubeUrl: '',
    };

    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;

    const regExp = "https://([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+(/[a-zA-Z0-9_-]+)*/?$";
    const checkRegExp = new RegExp(regExp);

    if (name?.trim().length) {
        if (name.length > 15) {
            return showError('name', 'maxLength: 15', res)
        } else {
            newBlogger.name = name
        }
    } else {
        return showError('name', 'empty field', res)
    }


    if (youtubeUrl?.trim().length) {
        if (youtubeUrl.length > 100) {
            return showError('youtubeUrl', 'maxLength: 100', res)
        } else {
            newBlogger.youtubeUrl = youtubeUrl;
        }
        if (!youtubeUrl.match(checkRegExp)) {
            return showError('youtubeUrl', 'invalid url', res)
        }
    } else {
        return showError('youtubeUrl', 'empty field', res)
    }

    bloggers.push(newBlogger)
    res.status(201).send(newBlogger)

})

app.get('/hs_01/api/bloggers/:bloggerId', (req: Request, res: Response) => {

    const id = +req.params.bloggerId;
    const blogger = bloggers.find(blogger => blogger.id === id)
    !!blogger ? res.status(200).send(blogger) : res.status(404).send('blogger not found')
})

app.put('/hs_01/api/bloggers/:bloggerId', (req: Request, res: Response) => {

    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;

    const regExp = "https://([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+(/[a-zA-Z0-9_-]+)*/?$";
    const checkRegExp = new RegExp(regExp);

    const id = +req.params.bloggerId;
    const blogger = bloggers.find(blogger => blogger.id === id)

    if (blogger) {
        if (name?.trim().length) {
            if (name.length > 15) {
                return showError('name', 'maxLength: 15', res)
            } else {
                blogger.name = name
            }
        } else {
            return showError('name', 'empty field', res)
        }


        if (youtubeUrl?.trim().length) {
            if (youtubeUrl.length > 100) {
                return showError('youtubeUrl', 'maxLength: 100', res)
            } else {
                blogger.youtubeUrl = youtubeUrl;
            }
            if (!youtubeUrl.match(checkRegExp)) {
                return showError('youtubeUrl', 'invalid url', res)
            }
        } else {
            return showError('youtubeUrl', 'empty field', res)
        }
        bloggers = [...bloggers, blogger]
        res.status(204).send(bloggers)

    } else {
        res.status(404).send('blogger not found')
    }

})

app.delete('/hs_01/api/bloggers/:bloggerId', (req: Request, res: Response) => {

    const id = +req.params.bloggerId;
    const blogger = bloggers.find(blogger => blogger.id === id)
    !!blogger ? res.status(204) : res.status(404).send('blogger not found')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
