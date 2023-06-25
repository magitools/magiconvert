<script lang="ts">
	import type { User } from "@prisma/client";
import { AppBar } from "@skeletonlabs/skeleton";
	export let user: User | null;
</script>
<AppBar>
	<svelte:fragment slot="lead"><a href={user ? "/app" : "/"}>Magiconvert</a></svelte:fragment>
  <svelte:fragment slot="trail">
	<div class=" space-x-2">
		{#if user}
		<a href="/app/convert">Convert</a>
		<a href="/app/hash">Hash</a>
		<span>{user.credits} credits left</span>
		<a href="/app/profile">Profile</a>
		{:else}
		<a href="/login">Get Started</a>
		{/if}
	</div>
  </svelte:fragment>
</AppBar>