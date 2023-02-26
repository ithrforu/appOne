import requests


def border_print(func):
    def wrapper(*args, **kwargs):
        print('-' * 10)
        result = func(*args, **kwargs)
        print('-' * 10)
        print()
        return result
    return wrapper


class HttpSession:
    def __init__(self, host, port):
        self.hostname = f"http://{host}:{port}"
        self.session = requests.Session()

    def __del__(self):
        self.session.close()

    @border_print
    def get(self, url):
        resp = self.session.get(f"{self.hostname}/{url}")

        try:
            result = resp.json()
        except:
            result = resp.content.decode()
        # print('headers', resp.headers)
        # print('cookies', resp.cookies)
        print(resp.status_code, result)

        return result

    @border_print
    def post(self, url, body=None):
        resp = self.session.post(f"{self.hostname}/{url}", json=body)

        try:
            result = resp.json()
        except:
            result = resp.content.decode()
        # print('headers', resp.headers)
        # print('cookies', resp.cookies)
        print(resp.status_code, result)

        return result
