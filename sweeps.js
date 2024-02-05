const random_name = require('node-random-name');
const fetch = require('node-fetch');

// Define a function to perform the requests
async function performRequests() {
    const firstName = random_name({ first: true });
    const lastName = random_name({ last: true });
    const email2 = firstName + lastName + "@evolveio.us";

    try {
        const response = await fetch('https://api.actv8technologies.com/rtm/v2/members', {
            method: 'POST',
            headers: {
                'authority': 'api.actv8technologies.com',
                'accept': 'application/json, text/plain, */*',
                'accept-language': 'en-US,en;q=0.9',
                'content-type': 'application/json',
                'dnt': '1',
                'origin': 'https://holdmyoikos.actv8me.com',
                'referer': 'https://holdmyoikos.actv8me.com/',
                'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
                'sec-ch-ua-mobile': '?1',
                'sec-ch-ua-platform': '"Android"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
                'x-api-key': 'd43b5f6c1c2268f4292da67fe0ca65c65270597e',
                'x-api-version': '5.0'
            },
            body: JSON.stringify({
                "promotionId": "10744",
                "FirstName": firstName,
                "LastName": lastName,
                "Email": email2,
                "UniqueId": email2,
                "Phone": "19172839174",
                "Optin1": false,
                "Optin2": true,
                "Optin3": true
            })
        });
        
        const data = await response.json();
        const memberGuid = data.data.MemberGuid;

        const secondRequestPayload = {
            "promotionId": "10744",
            "MemberGuid": memberGuid,
            "EntryType": 1
        };

        const secondResponse = await fetch('https://api.actv8technologies.com/rtm/v2/Sweeps', {
            method: 'POST',
            headers: {
                'authority': 'api.actv8technologies.com',
                'accept': 'application/json, text/plain, */*',
                'accept-language': 'en-US,en;q=0.9',
                'content-type': 'application/json',
                'dnt': '1',
                'origin': 'https://holdmyoikos.actv8me.com',
                'referer': 'https://holdmyoikos.actv8me.com/',
                'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
                'sec-ch-ua-mobile': '?1',
                'sec-ch-ua-platform': '"Android"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
                'x-api-key': 'd43b5f6c1c2268f4292da67fe0ca65c65270597e',
                'x-api-version': '5.0'
            },
            body: JSON.stringify(secondRequestPayload)
        });

        const secondData = await secondResponse.json();

        const thirdResponse = await fetch('https://api.actv8technologies.com/rtm/v2/iws', {
            method: 'POST',
            headers: {
                'authority': 'api.actv8technologies.com',
                'accept': 'application/json, text/plain, */*',
                'accept-language': 'en-US,en;q=0.9',
                'content-type': 'application/json',
                'dnt': '1',
                'origin': 'https://holdmyoikos.actv8me.com',
                'referer': 'https://holdmyoikos.actv8me.com/',
                'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
                'sec-ch-ua-mobile': '?1',
                'sec-ch-ua-platform': '"Android"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
                'x-api-key': 'd43b5f6c1c2268f4292da67fe0ca65c65270597e',
                'x-api-version': '5.0'
            },
            body: JSON.stringify({
                "promotionId": "10744",
                "MemberGuid": memberGuid
            })
        });

        const thirdData = await thirdResponse.json();
        const winner = thirdData.data.Winner ? 'true' : 'false';
        return { email: email2, result: winner };
    } catch (error) {
        console.error('Error:', error);
        return { email: email2, result: 'error' };
    }
}

// Run the requests 50 times and provide a recap at the end
async function runRequests() {
    let wins = 0;
    let losses = 0;

    for (let i = 0; i < 300; i++) {
        const { email, result } = await performRequests();
        console.log(`${email} - Successfully Entered! Instant Win: ${result}`);
        if (result === 'true') {
            wins++;
        } else if (result === 'false') {
            losses++;
        }
    }

    console.log("---------");
    console.log("Recap:");
    console.log("Wins:", wins);
    console.log("Losses:", losses);
}

runRequests();
