<script lang="ts">
  import { getColorVariant } from '$lib/utils/getColorVariant';
  import { getDeviceType } from '$lib/utils/mobileDesktopString';
  import type { Estimate } from '../../types';

  export let estimate: Estimate;
  let isMobile = getDeviceType() === 'mobile' ? ' min' : ' minutes';
</script>

<div class="mx-2 inline-flex gap-2">
  {#if estimate.cancelflag === '1'}
    <span class="px-2 rounded-xl bg-white/20 border border-red-500">Cancelled</span>
  {:else}
    <span
      class={`px-2 text-sm md:text-base rounded-xl bg-white/20 border ${getColorVariant(
        estimate.hexcolor
      )}`}
    >
      {estimate.minutes !== 'Leaving' ? estimate.minutes + isMobile : 'Leaving'}
    </span>
  {/if}
</div>
