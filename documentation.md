# Documentation

## Project Estructure
Routing, Header and Snackbar are configured in APP.tsx
Search handler can be stablished using the header reducer, it is of the type (string) => void.
Tests were only made for the users and login APIs

## Application Cycle
It starts with a search in the localstorage for the user session, soon after, the data is sent to the API for validation, and in case of an affirmative answer, the next thing to do is render the users page, and add to the navbar the searcher along with the option to end the session, wich as well as not having a session in the beggining, is going to render the login page.
The searcher is only for the firstname of the users and sorts the users to show at first the more similar firstnames, it also resets the pagination, so if you where in page 2 but made a search the page is goint to change to the 1

## Reducers
[-] UsersSlice brings the possibility to get the users info, pagination and search
[-] AppSlice is in charge of the theme toggle
[-] LoginSlice performs the session retrieve and storage, also stores the email and password to initializa a session
[-] HeaderSlice stores the searcher handler which is just a callback settleable