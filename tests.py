from postman import *


BODY = {
    'login': 'admin1',
    'password': 'admin123456'
}


if __name__ == '__main__':
    # index
    assert send_get('') == 'Hello World!'

    # registration
    send_post('registration', BODY)

    # fail login
    assert 'Login or password are undefined' in str(send_post('auth', {}))

    # # fail api
    assert send_get('api/1') == 'Unauthorized'

    # success login
    assert 'success' in str(send_post('auth', BODY))

    # success api
    assert send_get('api/1') == 'Hello World!'
