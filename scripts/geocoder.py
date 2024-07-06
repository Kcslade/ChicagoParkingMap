import pandas as pd
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut


df = pd.read_csv(r"C:\Users\hambu\Desktop\Chitrafficmap\parking Data\Schedule_10.xlsx - Sheet1.csv")


geolocator = Nominatim(user_agent="chistreetmap")


def geocode_address(address):
    try:
        location = geolocator.geocode(address)
        if location:
            return location.latitude, location.longitude
        else:
            return None, None
    except GeocoderTimedOut:
        return geocode_address(address)


df['latitude'], df['longitude'] = zip(*df['address'].apply(geocode_address))

df.to_csv(r"C:\Users\hambu\Desktop\Chitrafficmap\parking Data\Schedule_10geocoded_addresses.csv", index=False)
