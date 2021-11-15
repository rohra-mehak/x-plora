import requests


def run():
    g = requests.post("http://127.0.0.1:8000/token-auth/" ,data={ 'username':"POpe", 'password':'qwerty123!'})
    print(g)

if __name__ == "__main__":
    run()

