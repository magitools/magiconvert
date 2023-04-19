<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import { formatList } from '$lib/utils';
	import { Confetti } from 'svelte-confetti';

	let files: FileList;
	let height = 0;
	let width = 0;
	let imgHeight = 0;
	let imgWidth = 0;
	let locked = false;
	let loading = false;
	let format: string = $page.url.searchParams.get('format') || "webp";
	let placeholderImg: HTMLImageElement;

	$: if (placeholderImg) {
		placeholderImg.onload = () => {
			imgHeight = placeholderImg.height;
			imgWidth = placeholderImg.width;
		};
	}

	$: if ($page.form) {
		loading = false;
		locked = false;
	}

	$: if (files && files.length > 0) {
		
		const reader = new FileReader();
		locked = true;
		console.log($page.form)
		reader.readAsDataURL(files[0]);
		reader.onload = (e) => {
			if (e.target && e.target.result) {
				placeholderImg = new Image();
				placeholderImg.src = e.target.result.toString();
				locked = false;
			} else {
				locked = false;
			}
		};
	}

	const handleSubmit: SubmitFunction = async () => {
		loading = true;
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

<div class="w-full h-full flex justify-center gap-4 items-center">
	<div class="card w-1/3 shadow-xl">
		<form
			method="post"
			enctype="multipart/form-data"
			use:enhance={handleSubmit}
		>
			<div class="card-body">
				<div class="flex">
					<div class="form-control">
						<label for="height" class="label">
							<span class="label-text">Height</span>
						</label>
						<input
							class="input"
							type="number"
							name="height"
							id="height"
							bind:value={height}
							disabled={locked}
						/>
					</div>
					<div class="form-control">
						<label for="width" class="width">
							<span class="label-text">Width</span>
						</label>
						<input
							class="input"
							type="number"
							name="width"
							id="width"
							bind:value={width}
							disabled={locked}
						/>
					</div>
				</div>
				<div class="form-control">
					<label for="image" class="label"><span class="label-text">Image</span></label>
					<input
						required
						type="file"
						name="image"
						id="image"
						class="file-input"
						bind:files
						disabled={locked}
					/>
				</div>
				<div class="form-control">
					<label for="format">
						<span class="label-text">Format</span>
					</label>
					<select class="select" name="format" id="format" bind:value={format}>
						{#each formatList as format}
							<option value="{format}">{format}</option>
						{/each}
					</select>
				</div>
				<input type="hidden" name="originalHeight" id="originalHeight" bind:value={imgHeight} />
				<input type="hidden" name="originalWidth" id="originalWidth" bind:value={imgWidth} />
				<div class="card-actions justify-end">
					<button class="btn btn-primary {loading ? 'loading' : ''}" type="submit" disabled={locked || !files || loading}>send</button>
				</div>
			</div>
		</form>
	</div>
	{#if loading}
	<div class="w-full flex flex-col justify-center items-center h-full absolute top-0 left-0 z-30 bg-base-100/60 space-y-4">
		<p>Converting Image, please wait...</p>
		<div class="w-48 h-48 rounded-full animate-spin border-4 border-current border-t-transparent"></div>
	</div>
	{/if}
	{#if placeholderImg && !$page.form}
		<div class="card shadow-xl w-1/3">
			<figure><img src={placeholderImg.src} alt="result" /></figure>
			<div class="card-body">
				<h2 class="card-title">This is the image you selected</h2>
				<div class="stats">
					<div class="stat">
						<div class="stat-title">Width</div>
						<div class="stat-value">{imgWidth}</div>
					</div>
					<div class="stat">
						<div class="stat-title">Height</div>
						<div class="stat-value">{imgHeight}</div>
					</div>
					<div class="stat">
						<div class="stat-title">Aspect Ratio</div>
						<div class="stat-value">{(imgHeight / imgWidth).toFixed(2)}</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
	{#if $page.form?.success}
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
		<div class="card shadow-xl w-96">
			<figure><img src={$page.form.image} alt="result" /></figure>
			<div class="card-body">
				<h2 class="card-title">Here's the Image</h2>
				<div class="card-actions justify-end">
					<a
						download="image.{format}"
						href={window.URL.createObjectURL(convertBase64ToBlob($page.form.image))}
						class="btn btn-success">Download</a
					>
				</div>
			</div>
		</div>
	{/if}
</div>
