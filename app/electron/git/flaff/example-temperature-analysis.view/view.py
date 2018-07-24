# view created 11:33 19.07.2018

import pandas as pd
from providers import getProvider

provider = getProvider(
    name = 'daily-minimum-temperatures'
)

view = pd.DataFrame(provider.getData());
view.set_index('date');
