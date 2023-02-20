<script lang="ts">
  import { quintOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';
  import type { StationTime } from '../../types';
  import TimePill from './TimePill.svelte';

  export let stationTime: StationTime[];
</script>

<section
  class="cursor-default bg-gradient-to-br from-black to-black/90 rounded-b-lg rounded-r-lg text-white px-2 py-1"
  transition:slide={{ delay: 10, duration: 400, easing: quintOut }}
>
  {#if stationTime}
    <ul>
      {#each stationTime as time}
        <li class="py-2">
          <span class="text-lg">{time.destination}: </span>
          {#each time.estimate as estimate}
            <TimePill {estimate} />
          {/each}
        </li>
      {/each}
    </ul>
  {:else}
    <div class="flex items-center py-12 text-xl">There are no upcoming trains</div>
  {/if}
</section>
