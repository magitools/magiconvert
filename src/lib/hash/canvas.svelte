<script lang="ts">
    export let preview: [];
    export let width: number;
    export let height: number;

    let canvas: HTMLCanvasElement;

    $: {
        if (canvas) {
            const context = canvas.getContext("2d");
            const imageData = context?.createImageData(width, height);
            imageData?.data.set(preview)
            context?.putImageData(imageData, 0, 0);
        }
    }
</script>

<canvas class="w-full h-auto" bind:this={canvas}>

</canvas>