"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
let videos = [
    { id: 1, title: 'About JS - 01', author: 'it-incubator.eu' },
    { id: 2, title: 'About JS - 02', author: 'it-incubator.eu' },
    { id: 3, title: 'About JS - 03', author: 'it-incubator.eu' },
    { id: 4, title: 'About JS - 04', author: 'it-incubator.eu' },
    { id: 5, title: 'About JS - 05', author: 'it-incubator.eu' },
];
app.get('/', (req, res) => {
    res.status(200).send([
        {
            id: 0,
            title: "string",
            author: "string"
        }
    ]);
});
app.get('/videos', (req, res) => {
    res.status(200).send(videos);
});
app.get('/videos/:videoId', (req, res) => {
    const id = +req.params.videoId;
    const video = videos.find(video => video.id === id);
    !!video ? res.status(200).send(video) : res.status(404).send('video not found');
});
app.post('/videos', (req, res) => {
    const validateBody = req.body.title.trim();
    if (validateBody <= 40 && validateBody > 0) {
        const newVideo = {
            id: +(new Date()),
            title: req.body.title,
            author: 'it-incubator.eu'
        };
        videos.push(newVideo);
        res.status(201).send(newVideo);
    }
    else {
        const error = {
            errorsMessages: [
                {
                    message: 'maxLength: 40',
                    field: 'title',
                }
            ],
            resultCode: 1
        };
        res.status(400).send(error);
    }
});
app.delete('/videos/:id', (req, res) => {
    const video = videos.find(v => v.id === +req.params.id);
    if (video) {
        videos = videos.filter(v => v.id !== +req.params.id);
        res.status(204).send('No content');
    }
    else {
        res.status(404).send('Not found');
    }
});
app.put('/videos/:id', (req, res) => {
    const validateBody = req.body.title.trim();
    const video = videos.find(v => v.id === +req.params.id);
    if (!video) {
        return res.status(404).send('Not Found');
    }
    if (validateBody <= 40 && validateBody > 0) {
        video.title = req.body.title;
        //videos = videos.map((v) => v.id === +req.params.id ? {...v, title: req.body.title} : v)
        res.status(204).send(video);
    }
    else {
        const error = {
            errorsMessages: [
                {
                    message: 'maxLength: 40',
                    field: 'title',
                }
            ],
            "resultCode": 1
        };
        res.status(400).send(error);
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map