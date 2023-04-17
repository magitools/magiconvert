<script>
    import "../app.css";
	import Footer from "$lib/footer.svelte";
    import Header from "$lib/header.svelte";
</script>

<Header />
<main>
    <slot />
</main>
<Footer />


<style lang="postcss">
    :global(html), :global(body) {
        margin: 0;
        padding: 0;
    }

    :global(body) {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    
    :global(main) {
        flex: 1;
    }

</style>