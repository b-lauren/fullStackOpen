const express = require('express');
const app = express();
var morgan = require('morgan');

app.use(express.json());
app.use(morgan('tiny'));

morgan.token('body', function (req) {
  return JSON.stringify(req.body);
});

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/', (request, response) => {
  response.send('<h1>Hello Rebecca Phonebook!</h1>');
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/info', (request, response, Persons) => {
  const numberOfPeople = Persons.length;
  const todaysDate = new Date();

  response.send(`<div>Phonebook has info for ${numberOfPeople} people</div>
    <div>${todaysDate}</div>
  `);
});

//Fetching a single resource by ID

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const currentPerson = persons.find((person) => person.id === id);

  if (currentPerson) {
    response.json(currentPerson);
  } else {
    response.status(404).end();
  }
});

//Delete a single entry with a HTTP delete

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const currentPerson = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

//Add a resource

app.post('/api/persons', morgan(':body'), (request, response) => {
  const body = request.body;
  const randId = Math.random() * 100;
  const person = request.body;
  person.id = randId;
  console.log(person);

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({
      error: 'name missing',
    });
  }

  const existingPerson = persons.find((person) => person.name === body.name);

  if (existingPerson) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  } else {
    persons = persons.concat(person);
  }
  response.json(person);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
