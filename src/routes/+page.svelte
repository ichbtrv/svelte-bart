<script lang="ts">
  import StationsList from '$lib/components/StationsList.svelte';
  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<StationsList stations={data.stations} />

