import pandas as pd
import numpy as np
import pathlib

# base index html file
original_index_file = pathlib.Path.cwd() / "index_base.html"
with open(original_index_file) as f:
    index_html_string = f.read()

# building table from excel file
buildings_table_file = pathlib.Path.cwd() / "Civ7Data.xlsx"
buildings_table = pd.read_excel(buildings_table_file, header=0, keep_default_na=False)
#buildings_table = buildings_table.sort_values(by=["Age", "ProductionCost", "BaseYield"], key=lambda x: "AA" if "ageless" in x else x)
buildings_table = buildings_table.sort_values(by=["Age", "ProductionCost", "BaseYield"], key=lambda x: [txt.replace(" - ageless", "") if "ageless" in str(txt) else txt for txt in x])
print(buildings_table)


# transfer building table to string (bts) for html
yield_imgs = {"science": '<img src="images/science.png" alt="science" height="30">',
              "culture": '<img src="images/culture.png" alt="culture" height="30">',
              "food": '<img src="images/food.png" alt="food" height="30">',
              "happiness": '<img src="images/happiness.png" alt="happiness" height="30">',
              "influence": '<img src="images/influence.png" alt="influence" height="30">',
              "gold": '<img src="images/gold.png" alt="gold" height="30">',
              "production": '<img src="images/production.png" alt="production" height="30">'}
bts = ''
for i, row in buildings_table.iterrows():
    bts += '\n\t\t\t\t<tr class="table-row">\n'
    # building name
    bts += f'\t\t\t\t\t<td><div class="icon-text"><img src="images/{row.Building}.png" alt="{row.Building}" height="40"> {row.Building}</div></td>\n'
    # building age
    bts += f'\t\t\t\t\t<td><div class="icon-text">{row.Age}</div></td>\n'
    # production cost
    bts += f'\t\t\t\t\t<td><div class="icon-text"><img src="images/production.png" alt="prodcost" height="30">  {row.ProductionCost}</div></td>\n'
    # Base yields
    base_yields = row.BaseYield
    for key, img_string in yield_imgs.items():
        base_yields = base_yields.replace(key, img_string)
    bts += f'\t\t\t\t\t<td><div class="icon-text">{base_yields}</div></td>\n'
    # AdjacencyBonuns
    adj_boni = row.AdjacencyBonus
    for key, img_string in yield_imgs.items():
        adj_boni = adj_boni.replace(key, img_string)
    if 'for adjacent: ' in adj_boni:
        # list of adjacencies is a vertical-spans class
        adj_boni = adj_boni.replace('for adjacent: ', 'for adjacent: <div class="vertical-spans"><span>- ')
        adj_boni = adj_boni.replace(", ", "</span><span>- ")
        adj_boni += "</span>"        
    bts += f'\t\t\t\t\t<td><div class="icon-text">{adj_boni}</div></td>\n'
    # Bonus to 
    bonus_to = row.BonusTo
    for key, img_string in yield_imgs.items():
        bonus_to = bonus_to.replace(key, img_string)
    bts += f'\t\t\t\t\t<td><div class="icon-text">{bonus_to}</div></td>\n'
    # Notes
    notes = row.Notes
    note_parts = notes.split(";")
    if len(note_parts) > 1:
        notes = '<div class="vertical-spans"><span>' + '</span><span>'.join(note_parts) + '</span></div>'
    bts += f'\t\t\t\t\t<td><div class="icon-text">{notes}</div></td>\n'
    bts += '\t\t\t\t</tr>'

# create actual index html file with buildings table
new_index_file = pathlib.Path.cwd() / "index.html"
new_html_string = index_html_string.replace('<!--insert building table here-->', bts)
with open(new_index_file, 'w+') as f:
    f.write(new_html_string)
