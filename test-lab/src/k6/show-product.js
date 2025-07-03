import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 100, // virtual users
    duration: '10s', // total test duration
};

export function getSignedInCookie() {
    const url = 'https://shopee.dev/api/users/signin';
    const payload = JSON.stringify({
        "email": "test@example.com",
        "password": "1234"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);
    return res.headers['Set-Cookie']

}

export default function () {
    const cookie = getSignedInCookie()

    const url = 'https://shopee.dev/products/6866493804bec095c566c405';
    const payload = JSON.stringify({
        title: "macbook 6",
        price: 1000,
        quantity: 100
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            // Add auth headers if needed:
            'Cookie': cookie,
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200 || r.status === 201,
    });

    sleep(1); // wait 1s before next iteration
}
