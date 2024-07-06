import pdfplumber as pdfp
import pandas as pd

with pdfp.open(r"C:\Users\hambu\Desktop\Chitrafficmap\parking Data\Schedule_10.pdf") as pdf:
    data = []

    
    for page in pdf.pages:
        table = page.extract_table()
        if table:
            data.extend(table)


df = pd.DataFrame(data[1:], columns=data[0])

df.to_csv(r"C:\Users\hambu\Desktop\Chitrafficmap\parking Data\Schedule_10.csv", index=False)
