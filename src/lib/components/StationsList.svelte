<script lang="ts">
  import { onMount } from 'svelte';
  import type { Station, StationTime } from '../../types';
  import TimesList from './TimesList.svelte';

  export let stations: Station[];

  let filteredStations = stations;
  let stationTimesList = new Map<string, StationTime[]>();
  let stationTimeSuccess = false;
  $: searchTerm = '';
  $: currentStation = '';
  $: activeStation = false;
  $: activeStationObject =
    stations && stations.find((station: Station) => station.abbr === currentStation);

  onMount(() => {
    filterStations();
  });

  const handleSearch = (event: Event & { currentTarget: EventTarget & HTMLInputElement; }) => {
    const { currentTarget } = event;
    searchTerm = currentTarget!.value;
    filterStations();
  };

  const filterStations = () => {
    filteredStations = stations.filter((station) =>
      station.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const stationTimes = async (station: string) => {
    const response = await fetch(
      `https://api.bart.gov/api/etd.aspx?cmd=etd&key=${
        import.meta.env.VITE_BART_KEY
      }&json=y&orig=${station}`
    );
    const data = await response.json();
    stationTimesList.set(station, data.root.station[0].etd as StationTime[]);
  };

  const assignCurrentStation = (station: Station) => {
    if (station === activeStationObject) {
      activeStation = false;
      currentStation = '';
      return;
    }
    currentStation = station.abbr;
    activeStation = true;
  };

  const handleKeyDown = (e: KeyboardEvent, station: Station) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const index = stations.findIndex((stn: Station) => stn.abbr === currentStation);
      const nextIndex =
        e.key === 'ArrowDown'
          ? (index + 1) % stations.length
          : (index - 1 + stations.length) % stations.length;
      assignCurrentStation(stations[nextIndex]);
    } else if (e.key === 'Enter') {
      assignCurrentStation(station);
    }
  };

  $: isActive = (station: Station) => station === activeStationObject

  $: highlightStation = () => {
    if (!currentStation) return;
    setTimeout(() => {}, 200);
    activeStation = true;
  };

  $: listItemClasses = (station: Station) => {
    let classes = 'text-xl flex flex-col rounded-lg py-2 px-1 border-2 border-blue-100 hover:border-[#0099D8] my-1 hover:bg-black hover:text-white';

    if (activeStation && station !== activeStationObject) {
      classes += ' text-gray-600';
    }
    if (station === activeStationObject) {
      classes += ' bg-black  text-white border-[#0099D8]';
    }
    return classes;
  }


  if (stations) {
    Promise.all(stations.map((station: Station) => stationTimes(station.abbr))).then(
      () => (stationTimeSuccess = true)
    );
  }
</script>

<input
  class="py-2 px-4 rounded-lg bg-[#0099D8]/10 w-full max-w-lg"
  type="text"
  placeholder="Search stations..."
  bind:value={searchTerm}
  on:input={handleSearch}
/>
<ul aria-label="BART Stations" class="pt-8 max-w-lg">
  {#each filteredStations as station (station.abbr)}
    <li
      role="button"
      aria-expanded={isActive(station)}
      tabindex={0}
      class={listItemClasses(station)}
      class:active={isActive(station)}
      on:mouseenter={highlightStation}
      on:click={() => assignCurrentStation(station)}
      on:keydown={(e) => handleKeyDown(e, station)}
    >
      <div class={`cursor-pointer flex justify-between w-full px-2 ${station === activeStationObject ? 'bg-black rounded-t-lg text-white' : ''}`}>
        <div>{station.name}</div>
        <button>{station === activeStationObject ? '-' : '+'}</button>
      </div>
      
      <div>
        {#if station === activeStationObject && stationTimeSuccess}    
          <TimesList stationTime={stationTimesList.get(currentStation)} />
        {:else if station === activeStationObject && !stationTimeSuccess}
          <div class="flex items-center py-12 text-xl">Loading...</div>
        {/if}
      </div>
    </li>
  {/each}
</ul>

<style>
  .active {
    color: white;
    border: 2px solid #0099D8;
  }
</style>
