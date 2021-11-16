import requests


def run():
    TOKEN = "38239f989c579d804b5f8af9ff0c270e17dc0730"
    # gx= requests.get("http://127.0.0.1:8000/test-auth/" ,  headers={"Authorization":'token {}'.format(TOKEN)})
    # print( "response---",gx)

    g = requests.post("http://127.0.0.1:8000/request-a-solution/" ,  headers={"Authorization":'token {}'.format(TOKEN)} ,
    data={ 'title':"POpe'ssssssss", 'dataset_description':'ggtfgbfhgthtyhyttg'})
    print(g)

if __name__ == "__main__":
    run()

