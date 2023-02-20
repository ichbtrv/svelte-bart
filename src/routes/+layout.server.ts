import type { LayoutServerLoad } from './$types';
 
export const load = (async () => {
  const res = await fetch(`https://api.bart.gov/api/stn.aspx?cmd=stns&key=${
    import.meta.env.VITE_BART_KEY
  }&json=y`);
  const stations = await res.json();
  return {
    stations: await stations.root.stations.station
  };
}) satisfies LayoutServerLoad;