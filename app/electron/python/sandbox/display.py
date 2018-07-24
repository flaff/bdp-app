from io import BytesIO
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import base64

def printFigure(fig):
    figureFile = BytesIO()
    canvas = FigureCanvasTkAgg(fig)
    fig.savefig(figureFile, format='png')
    pngBase64 = base64.b64encode(figureFile.getvalue())
    print('___FIGURE_BASE64___' + pngBase64.decode('utf-8') + '___FIGURE_BASE64___')

def printDataframe(dataframe):
    print('___DATAFRAME___' + dataframe)
