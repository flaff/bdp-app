import requests;

dataProviderServer = 'http://localhost:8617'

class DataProvider:
    def __init__(self, name):
        self.name = name;

    def getData(self):
        request = requests.get(dataProviderServer + '/data')
        return request.json()

def getProvider (name):
    return DataProvider(name);
