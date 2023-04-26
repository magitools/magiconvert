<script>
	import { AppBar } from "@skeletonlabs/skeleton";

</script>
<AppBar>
	<svelte:fragment slot="lead"><a href="/">Magiconvert</a></svelte:fragment>
  <svelte:fragment slot="trail">
	<div class=" space-x-2">
		<a href="/convert">Convert</a>
		<a href="/hash">Hash</a>
	</div>
  </svelte:fragment>
</AppBar>