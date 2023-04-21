<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import Stat from '$lib/convert/stat.svelte';
	import { formatList } from '$lib/utils';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { Confetti } from 'svelte-confetti';

	let files: FileList;
	let height = 0;
	let width = 0;
	let imgHeight = 0;
	let imgWidth = 0;
	let loading = false;
	let format: string = $page.url.searchParams.get('format') || $page?.form?.format || 'webp';
	let placeholderImg: HTMLImageElement | null;

	$: if (placeholderImg) {
		placeholderImg.onload = () => {
			imgHeight = placeholderImg?.height!;
			imgWidth = placeholderImg?.width!;
			loading = false
		};
	}

	$: if ($page.form) {
		loading = false;
		placeholderImg = null;
		format = $page.form.format;
	}

	$: if (files && files.length > 0) {
		const reader = new FileReader();
		loading = true;
		console.log($page.form);
		reader.readAsDataURL(files[0]);
		reader.onload = (e) => {
			if (e.target && e.target.result) {
				placeholderImg = new Image();
				placeholderImg.src = e.target.result.toString();
			}
		};
	}

	const handleSubmit: SubmitFunction = async () => {
		loading = true;
		placeholderImg = null;
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
				<h2>Convert Your Image</h2>
			</div>
			<section class="p-4">
				<div class="flex">
					<label for="height" class="label">
						<span>Height</span>
						<input
							class="input"
							type="number"
							name="height"
							id="height"
							bind:value={height}
							disabled={loading}
						/>
					</label>
					<label for="width" class="width">
						<span>Width</span>
						<input
							class="input"
							type="number"
							name="width"
							id="width"
							bind:value={width}
							disabled={loading}
						/>
					</label>
				</div>
				<label for="image" class="label"
					><span class="label-text">Image</span>
					<input
						required
						type="file"
						name="image"
						id="image"
						class="input"
						accept="image/*"
						bind:files
						disabled={loading}
					/>
				</label>
				<label for="format">
					<span class="label-text">Format</span>
					<select class="select" name="format" id="format" bind:value={format}>
						{#each formatList as format}
							<option value={format}>{format}</option>
						{/each}
					</select>
				</label>
				<input type="hidden" name="originalHeight" id="originalHeight" bind:value={imgHeight} />
				<input type="hidden" name="originalWidth" id="originalWidth" bind:value={imgWidth} />
			</section>
			<div class="card-footer justify-end">
				<button
					class="btn variant-filled-primary"
					type="submit"
					disabled={!files || loading}
				>
					{#if loading} <ProgressRadial width="w-6" /> {/if}send</button
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
		</section>
		<div class="card-footer">
			{#if $page?.form?.image}
				<a
					download="image.{format}"
					href={window.URL.createObjectURL(convertBase64ToBlob($page.form.image))}
					class="btn variant-filled-primary">Download</a
				>
			{/if}
		</div>
	</div>
</div>
{#if $page.form?.success && !placeholderImg}
	<div
		class="fixed -top-14 left-0 h-screen w-screen flex justify-center overflow-hidden pointer-events-none"
	>
		<Confetti
			x={[-5, 5]}
			y={[0, 0.1]}
			delay={[500, 2000]}
			duration="3000"
			amount="200"
			fallDistance="100vh"
		/>
	</div>
{/if}
