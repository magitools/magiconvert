<script>
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
    import { AppShell } from '@skeletonlabs/skeleton';
	import Footer from '$lib/footer.svelte';
	import Header from '$lib/header.svelte';
	export let data
</script>
 
<AppShell>
	<svelte:fragment slot="header"><Header user={data?.user} /></svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
</AppShell>
