import pandas as pd
import geopandas as gpd
from shapely.geometry import Point
import os
from tqdm import tqdm
import time

pd.options.mode.copy_on_write = True

def process_large_csv(input_csv, output_gpkg, chunk_size=100000):

    crs = "EPSG:4326"
    target_crs = "EPSG:3857"

    
    total_rows = sum(1 for _ in open(input_csv)) - 1  
    total_chunks = total_rows // chunk_size + 1

    
    chunks = pd.read_csv(input_csv, chunksize=chunk_size, low_memory=False)

    
    start_time = time.time()
    for i, chunk in enumerate(tqdm(chunks, total=total_chunks, unit="chunk")):
        print(f"Processing chunk {i+1}")

        
        chunk = chunk.dropna(subset=['geocoded_lat', 'geocoded_lng'])
        
        
        chunk.loc[:, 'geocoded_lat'] = chunk['geocoded_lat'].astype(float)
        chunk.loc[:, 'geocoded_lng'] = chunk['geocoded_lng'].astype(float)

        
        geometry = [Point(xy) for xy in zip(chunk['geocoded_lng'], chunk['geocoded_lat'])]
        chunk_gdf = gpd.GeoDataFrame(chunk, geometry=geometry, crs=crs)

       
        chunk_gdf = chunk_gdf.to_crs(target_crs)

        
        if not os.path.isfile(output_gpkg):
            chunk_gdf.to_file(output_gpkg, driver="GPKG", layer="data", mode='w')
        else:
            chunk_gdf.to_file(output_gpkg, driver="GPKG", layer="data", mode='a')

       
        elapsed_time = time.time() - start_time
        chunks_processed = i + 1
        avg_time_per_chunk = elapsed_time / chunks_processed
        remaining_time = avg_time_per_chunk * (total_chunks - chunks_processed)
        print(f"Estimated remaining time: {time.strftime('%H:%M:%S', time.gmtime(remaining_time))}")

    print(f"Data has been saved to {output_gpkg}")


input_csv = r"C:\Users\hambu\Desktop\Chitrafficmap\parking Data\data\exports\chicago_parking_tickets.csv"
output_gpkg = r"C:\Users\hambu\Desktop\Chitrafficmap\parking Data\data\exports\chicago_parking_tickets.gpkg"
process_large_csv(input_csv, output_gpkg)
