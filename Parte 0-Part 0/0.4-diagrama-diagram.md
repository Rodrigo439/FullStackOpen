sequenceDiagram
participant user
participant browser
participant server

user ->> browser: El usuario carga la pagina
%%The user loads the page
browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
activate server

server ->> browser: HTML document
deactivate server

user ->> browser: El usuario interactua con la interfaz de usuario para crear una nueva nota
%%The user interacts with the user interface to create a new note.
browser ->> browser: El usuario escribe una nueva nota y le da click a "save"
%%The user writes a new note and clicks "save".

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/notes
activate server
server-->>browser: { "content": "Nueva nota", "date": "2024-01-10" }
deactivate server
browser-->>browser: El buscador Recibe la confirmación de guardado
%%The browser Receives confirmation of saving

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
activate server
server-->>browser: Actualización de notas con la nueva nota incluida
%%Update of notes with the new note included
deactivate server

browser ->> user: el usuario ve todas las notas, incluida la nueva
%%the user sees all the notes, including the new one.
