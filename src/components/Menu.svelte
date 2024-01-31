<script lang="ts">
  import MenuIcon from './MenuIcon.svelte'
  export let links: [string, string][]
  let isShow = false
  const handleClick = () => {
    isShow = !isShow
  }
  const onEnd = () => isShow = false
</script>
<button class="bg-white p-2" on:click={handleClick}>
  <MenuIcon />
</button>

<div class="fixed top-10 left-0 w-full {isShow ? 'block' : 'hidden'}">
  <div class="bg-white border p-2 m-2 text-center">
    {#each links as link}
      <div>
        <a href={link[1]} title={link[0]} on:click={onEnd}>{link[0]}</a>
      </div>
    {/each}
  </div>
</div>