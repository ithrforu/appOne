import requests

SESSION = requests.Session()

PORT = 8080
BODY = {
    'login': 'admin3',
    'password': 'admin123456'
}

def send_post(url):
    resp = SESSION.post(f"http://localhost:{PORT}/{url}", json=BODY)

    print('-' * 10)
    print('headers', resp.headers)
    print('cookies', resp.cookies)
    try:
        print(resp.status_code, resp.json())
    except:
        print(resp.status_code, resp.content)
    print('-' * 10)


def send_get(url):
    resp = SESSION.get(f"http://localhost:{PORT}/{url}")

    print('-' * 10)
    print('headers', resp.headers)
    print('cookies', resp.cookies)
    try:
        print(resp.status_code, resp.json())
    except:
        print(resp.status_code, resp.content)
    print('-' * 10)


# send_post('registration')
# send_post('auth')
send_get('api/asdasd')
