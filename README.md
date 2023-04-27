Please make sure API server side is running before executing command below:

--Code
1. Get the domain the API Server, by default it listening to 
    http://localhost:3000
2. If different please change  
    'user.service.js' line 10: 
        var apiUri = "http://localhost:3000"

--Terminal        
1. *On the terminal node - 
    Install
    $ npm install -g local-web-server

2. Then - $ ws
3. Should display 
    Listening on http://[YOUR_SERVER_NAME]:8000, http://192.168.100.67:8000, http://127.0.0.1:8000
4. Access the app on http://localhost:8000
5. Site should be up and running on login page
6. username: 'admin'
7. password: '1234'

*Reference:  https://www.npmjs.com/package/local-web-server