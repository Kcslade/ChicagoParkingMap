Welcome to Chicago Parking Map! 

This is a map for visualzing different datasets related to parking in the city of chicago.

View webmap here:

https://kcslade.github.io/ChicagoParkingMap/

![image](https://github.com/Kcslade/ChicagoParkingMap/assets/173574308/44dcbd77-9f47-455f-acdd-e63bd2c6f994)

Layers List:

Parking Zone Heatmap - Heatmap of all parking restrictions for identifying areas of low/high density

Rate of Ticketing (Z-Score) - Color coded map of city neighborhoods according to rate of ticket issuance between 1996-2018. Higher score indicates tickets are issued above average.

Paid Parking Zones - Parking meters and allocated zones

Permit Zones - Residential/Permit only parking zones. Restricted Zones are Yellow and Buffer Zones are Blue. Residents of Buffer Zones may purchase permits for nearby restricted zones.

Winter Overnight Parking - Streets where overnight parking is restricted during winter.

Zone mapping methodology

Parking Zone data was first geolocated using geopy. Paid zones were geolocated using the box adress and restricted zones were geolocated with their adress range. Then, with a seprate qgis algortihm script, each zone was snapped to its corresponding street and projected perpendicularly to the sidewalk. Lastly, I generated rectangles using zone adress range/number of allocated spots to visualize each parking zone.

Zone Heatmap

The Heatmap is good for visualzing where zones are. The map is set to render so that at different zoom levels you should be able to identify areas of low and high density

Data Sources
Paid Parking Data is sourced from City of Chicago metered parking asset lease agreement Section 10, data scraped from pdf using python into csv, then geolocated.
Resedential parking data and winter parking zones are sourced from City of Chicago Data portal.
Ticket data from ProPublica
