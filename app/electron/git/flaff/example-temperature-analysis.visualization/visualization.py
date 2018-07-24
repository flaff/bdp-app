# visualization created 11:33 19.07.2018
from matplotlib.figure import Figure
from display import printFigure

from model import model

# get values from dataframe
date = model['date'];
temp = model['temp'];

figure = Figure(figsize=(12, 6))

# add plot
plot = figure.add_subplot(111)
plot.plot(date, temp, color='red')

# axis density
plot.locator_params(axis='y', nbins=20)
plot.locator_params(axis='x', nbins=10)

# axis labels
plot.set_ylabel('Temperature', fontsize=14);
plot.set_xlabel('Date', fontsize=14);

printFigure(figure);