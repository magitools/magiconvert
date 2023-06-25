<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import Stat from '$lib/convert/stat.svelte';
	import Canvas from '$lib/hash/canvas.svelte';
	import { formatList } from '$lib/utils';
	import { FileDropzone, ProgressRadial, clipboard } from '@skeletonlabs/skeleton';
	import { Confetti } from 'svelte-confetti';

	let files: FileList;
	let height = 0;
	let width = 0;
	let imgHeight = 0;
	let imgWidth = 0;
	let loading = false;
	let placeholderImg: HTMLImageElement | null;

	$: if (placeholderImg?.src) {
		placeholderImg.onload = () => {
			imgHeight = placeholderImg?.height!;
			imgWidth = placeholderImg?.width!;
			loading = false
		};
	}

	$: if ($page.form) {
		loading = false;
		placeholderImg = null;
	}

	$: if (files && files.length > 0) {
		const reader = new FileReader();
		placeholderImg = null;
		loading = true;
		reader.readAsDataURL(files[0]);
		reader.onload = (e) => {
			if (e.target && e.target.result) {
				placeholderImg = new Image();
				placeholderImg.src = e.target.result.toString();
			}
		};
	}

	const handleSubmit: SubmitFunction = async ({data}) => {
		console.log("sending data");
		console.log(data)
		loading = true;
		placeholderImg = null;
		height = 0;
		width = 0;

	};

	const convertBase64ToBlob = (b64: string) => {
		const parts = b64.split(';base64,');
		// Hold the content type
		const imageType = parts[0].split(':')[1];
		// Decode Base64 string
		const decodedData = window.atob(parts[1]);
		// Create UNIT8ARRAY of size same as row data length
		const uInt8Array = new Uint8Array(decodedData.length);
		// Insert all character code into uInt8Array
		for (let i = 0; i < decodedData.length; ++i) {
			uInt8Array[i] = decodedData.charCodeAt(i);
		}
		// Return BLOB image after conversion
		return new Blob([uInt8Array], { type: imageType });
	};
</script>

<div class="w-full h-full flex flex-col md:flex-row justify-center gap-4 items-center">
	<div class="card w-full md:w-1/3 shadow-xl">
		<form method="post" enctype="multipart/form-data" use:enhance={handleSubmit}>
			<div class="card-header">
				<h2>Hash Your Image</h2>
			</div>
			<section class="p-4">
				<label for="image" class="label"
					><span class="label-text">Image</span>
					<FileDropzone name="image" required accept="image/*" bind:files />
<!-- 					<input
						required
						type="file"
						name="image"
						id="image"
						class="input"
						accept="image/*"
						bind:files
						disabled={loading}
					/> -->
				</label>
				<input type="hidden" name="originalHeight" id="originalHeight" bind:value={imgHeight} />
				<input type="hidden" name="originalWidth" id="originalWidth" bind:value={imgWidth} />
				<input type="hidden" name="componentX" value="4"/>
				<input type="hidden" name="componentY" value="4"/>
			</section>
			<div class="card-footer justify-end">
				<button
					class="btn variant-filled-primary"
					type="submit"
					disabled={!files || loading}
				>
					{#if loading} <ProgressRadial width="w-4" /> {/if}send</button
				>
			</div>
		</form>
	</div>
	<div class="card shadow-xl w-full md:w-1/3">
		{#if !placeholderImg && !loading}
			<div class="w-full h-full flex flex-col justify-center items-center">
				<h6>Select an image to see a preview here</h6>
			</div>
		{/if}
		{#if loading}
		<div class="w-full h-full flex flex-col justify-center items-center">
			<ProgressRadial />
			<p>processing, please wait...</p>
		</div>
		{/if}
		<div class="card-header">
			{#if placeholderImg || $page?.form?.success}
				<img src={placeholderImg ? placeholderImg.src : $page.form.image} alt="result" />
			{/if}
		</div>
		<section class="p-4">
			{#if placeholderImg}
				<h2>This is the image you selected</h2>
				<div class="w-full flex justify-evenly">
					<Stat title="width" value={imgWidth} />
					<Stat title="height" value={imgHeight} />
					<Stat title="aspect ratio" value={(imgHeight / imgWidth).toFixed(2)} />
				</div>
			{/if}
			{#if $page?.form?.hash}
			<div class="flex-flex-col h-full w-full justify-center items-center">
				<Canvas preview={$page.form.preview.hashArray} width={$page.form.preview.width} height={$page.form.preview.height} />
				<div class="flex justify-between items-center mt-2">
					<p>{$page?.form?.hash}</p>
					<button class="btn variant-filled-secondary" use:clipboard={$page?.form?.hash}>Copy</button>
				</div>
			</div>
			{/if}
		</section>
	</div>
</div>
