let accessToken = pm.globals.get('accessToken');


let testEmail = 'senne.de.neef@student.ehb.be';
let testPassword = 'azerty';

//create accessToken & refreshToken (if not set)
//check accessToken
//refresh token (if check failed)
//create accessToken & refreshToken (if refresh failed)


const getAccessAndRefreshToken = async () => {
    const getTokensRequest = {
        method: 'POST',
        url: 'http://192.168.83.5:8080/api/v1/auth/login',
        header: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                email: testEmail,
                password: testPassword
            })
        }
    };


    return new Promise((resolve, reject) =>{
        pm.sendRequest(getTokensRequest, (err, response) => {
            if(err) {
                return resolve(false);
            }
            if((response.code < 200 && response.code >= 300)) {
                return resolve(false);
            }

            const body = response.json();
            const data = body.data;
            accessToken = data.accessToken;
            pm.globals.set('accessToken', accessToken);
            return resolve(true);
        });
    });
};

const checkAccessToken = async () => {
    const checkAccessTokenRequest = {
        method: 'GET',
        url: 'http://192.168.83.5:8080/api/v1/auth/me',
        header: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    };


    return new Promise((resolve, reject) =>{
        pm.sendRequest(checkAccessTokenRequest, (err, response) => {
            if(err) {
                return resolve(false);
            }
            console.log(response.code);
            return (response.code >= 200 && response.code < 300) ? resolve(true) : resolve(false);
        });
    });
};

const refreshAccessToken = async () => {
    const refreshAccessTokenRequest = {
        method: 'POST',
        url: 'http://192.168.83.5:8080/api/v1/auth/refresh',
        header: {
            'Accept': 'application/json'
        }
    };


    return new Promise((resolve, reject) =>{
        pm.sendRequest(refreshAccessTokenRequest, (err, response) => {
            if(err) {
                return resolve(false);
            }
            if((response.code < 200 && response.code >= 300)) {
                return resolve(false);
            }

            const body = response.json();
            const data = body.data;
            accessToken = data.accessToken;
            pm.globals.set('accessToken', accessToken);
            return resolve(true);
        });
    });
};

(async function main(){

    //obtain new set of tokens if either of them are missing.
    if(!accessToken) {
        await getAccessAndRefreshToken();
    }

    //check if current accessToken is still valid
    if(!(await checkAccessToken())) {
        //try to refresh accessToken
        if(!(await refreshAccessToken())) {
            //if all else fails, get a new set of tokens
            await getAccessAndRefreshToken();
        }
    }
})();
