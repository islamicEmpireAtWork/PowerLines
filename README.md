# PowerLines

This is a network map designed to represent shifting power structures in the early Islamic empire. It is a fork of the original project by Peter Verkinderen (https://github.com/pverkind/PowerLines).

Power structure data is entered in an Excel file (data/Empire structure maps.xlsx).

Coordinates are provided by a kml file (data/empire structure_cities.kml).

Data is then extracted from the three xlsx and kml files by a Python script (xlsx2geojson.py) and converted to geojson files. These are then packaged as javascript files to facilitate importing into the html file (PowerLines.html).

The repository was mirror-cloned into my github-pages (
[see how](https://help.github.com/en/articles/duplicating-a-repository#mirroring-a-repository-in-another-location)), and is served from there: you can access the website online
[here](https://pverkind.github.io/PowerLines.html)
