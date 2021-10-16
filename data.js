const users = [
    { id: 1, name: 'David', role: 'ADMIN' },
    { id: 2, name: 'Romi', role: 'USER' },
    { id: 3, name: 'Shyam', role: 'USER' },
    { id: 4, name: 'Antery', role: 'SUB-ADMIN' },
    { id: 5, name: 'Anthony', role: 'ADMIN' },
]

const role = ['ADMIN', 'USER', 'SUB-ADMIN']

const post = [
    {id:1,script:'This is First Post',createdBy:'1'},
    {id:2,script:'This is First Post2',createdBy:'1'},
    {id:3,script:'This is First Post3',createdBy:'2'},
    {id:4,script:'This is First Post4',createdBy:'3'},
    {id:5,script:'This is First Post5',createdBy:'4'},
    {id:6,script:'This is First Post6',createdBy:'2'},
]

module.exports = { users, role, post }