console.log('hello');

let accessToken = null;

const createJsonFromForm = (form) => {
    let json = {}
    for(let entry of $(form).serializeArray()) {
        json[entry.name] = entry.value;
    }
    return json;
}

$('#register-form').submit(async (event) => {
    event.preventDefault();

    const formData = createJsonFromForm($('#register-form'));

    //return true;
    const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password
        })
    })
    const body = await response.json();
});

$('#login-form').submit(async (event) => {
    event.preventDefault();

    const formData = createJsonFromForm($('#login-form'));

    const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: formData.email,
            password: formData.password,
        })
    })
    if(response.ok) {
        const body = await response.json();
        const data = body.data;
        accessToken = data.accessToken;
    }

});

$('#logout-form').submit(async (event) => {
    event.preventDefault();
    const response = await fetch('/api/v1/auth/logout', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: "{}"
    })
    const body = await response.json();
});

$('#authCallBtn').click(async ()=> {
   await fetch('/api/v1/auth/delete', {
       method: 'GET',
       headers: {
           'Authorization': `Bearer ${accessToken}`
       }
   });
});

$('#authCallBtn1').click(async ()=> {
    await fetch('/api/v1/auth/refresh', {
        method: "POST"
    });
});