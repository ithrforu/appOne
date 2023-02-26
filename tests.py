from postman import HttpSession
from unittest import TestCase

HOST, PORT = 'localhost', 8080
BODY_1 = {
    'login': 'user1',
    'password': 'user111111'
}
BODY_2 = {
    'login': 'user2',
    'password': 'user222222'
}
BODY_3 = {
    'login': 'user3',
    'password': 'user333333'
}


class TestApi(TestCase):
    """Класс с тестами API
    
    Команда терминала на запуск:
        
        python -m unittest tests.TestApi - все тесты
        python -m unittest tests.TestApi.test_index - конкретный тест
    """

    def test_index(self):
        s = HttpSession(HOST, PORT)
        self.assertEqual(s.get(''), 'Hello World!')

    def test_login(self):
        s1 = HttpSession(HOST, PORT)
        s2 = HttpSession(HOST, PORT)

        # registration
        s1.post('registration', BODY_1)
        s2.post('registration', BODY_2)

        with self.subTest('Fail'):
            self.assertIn('Login or password are undefined', str(s1.post('auth', {})))

        with self.subTest('Success'):
            self.assertIn('success', str(s1.post('auth', BODY_1)))
            self.assertIn('success', str(s2.post('auth', BODY_2)))

    def test_api(self):
        s1 = HttpSession(HOST, PORT)
        s2 = HttpSession(HOST, PORT)
        s3 = HttpSession(HOST, PORT)
        # Регистрируем всех
        s1.post('registration', BODY_1)
        s2.post('registration', BODY_2)
        s3.post('registration', BODY_3)
        # Третий намеренно не авторизуется
        s1.post('auth', BODY_1)
        s2.post('auth', BODY_1)

        self.assertEqual(s1.get('api/1'), 'Hello World!')
        self.assertEqual(s2.get('api/1'), 'Hello World!')
        self.assertEqual(s3.get('api/1'), 'Unauthorized')  # Проверяем наличие ошибки
