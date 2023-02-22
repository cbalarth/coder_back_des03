import express from "express";

const app = express();

const users = [
    {id: "0", name: "Carlos", city: "Santiago"},
    {id: "1", name: "Fernanda", city: "Santiago"},
    {id: "2", name: "Peter", city: "London"},
]

app.get("/users", (req, res) => {
    const {city, limit} = req.query;
    const usersCityFiltered = users.find((u) => u.city === city);
    const usersLimitFiltered = users.filter(u => u.id <= limit-1);

    if(city) {
        return res.send(usersCityFiltered);
    }
    if(limit) {
        return res.send(usersLimitFiltered);
    }
    res.send(users);
});

app.get("/users/:id", (req, res) => {
    const {id} = req.params;
    const user = users.find((u) => u.id === id);

    if(!user){
        return res.send({error: `¡No existe el usuario con ID ${id}!`});
    }
    res.send(user);
});

app.listen(8080, () => {
    console.log("Server Listening - Port 8080");
});