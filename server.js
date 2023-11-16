const express = require('express');

const app = express();

const PORT = 3000;

const friends = [
    {
        id: 0,
        name: "Ravi"
    },
    {
        id: 1,
        name: "Ashu"
    },
    {
        id: 3,
        name: "Manish"
    }
]

app.use((req, res, next)=>{
    const start = Date.now();
    next()
    const delta = Date.now() - start;
    console.log(req.method + " " + req.url + " " + delta + "ms")
})

app.use(express.json());

app.get("/friends", (req, res)=>{
    res.json(friends)
})

app.get("/friends/:id", (req, res)=>{
    const id = req.params.id;
    if(friends[id]){
        res.status(200).json(friends[id]);
    } else {
        res.status(400).json({error: "friend not exists."})
    }
})

app.post("/friends", (req, res)=>{
    if(req.body.name){
        const newFriend = {
            id: friends.length,
            name: req.body.name
        }

        friends.push(newFriend);

        res.json({"message": "addedd successfully"})
    } else {
        res.status(400).json({error: "Bad request"})
    }
})

app.listen(PORT, () => {
});