# model created 11:33 19.07.2018
import pandas as pd
from view import view

mask = view['date'] < '1981-1-1'
model = view[mask]
