import requests

SESSION = requests.Session()

PORT = 8080
BODY = {
    'login': 'admin3',
    'password': 'admin123456'
}


def send_post(url, body=None):
    if body is None:
        body = BODY

    resp = SESSION.post(f"http://localhost:{PORT}/{url}", json=body)

    print('-' * 10)
    try:
        result = resp.json()
    except:
        result = resp.content.decode()
    # print('headers', resp.headers)
    # print('cookies', resp.cookies)
    print(resp.status_code, result)
    print('-' * 10)
    print()
    return result


def send_get(url):
    resp = SESSION.get(f"http://localhost:{PORT}/{url}")

    print('-' * 10)
    try:
        result = resp.json()
    except:
        result = resp.content.decode()
    # print('headers', resp.headers)
    # print('cookies', resp.cookies)
    print(resp.status_code, result)
    print('-' * 10)
    print()
    return result


# send_post('registration')
# send_post('auth')
# send_get('api/asdasd')
