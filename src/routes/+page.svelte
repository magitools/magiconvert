<script>
	import { formatList } from '$lib/utils';
</script>

<div class="w-full h-full space-y-4">
	<div class="w-full flex flex-col justify-center items-center">
		<div class="max-w-lg text-center">
			<div>
				<h1 class="text-5xl font-bold">Welcome to MagiConvert</h1>
				<p class="py-6">your one-stop shop for image conversion and resizing</p>
				<a href="/convert" class="btn btn-primary">Get Converting</a>
			</div>
		</div>
	</div>
    <section class="w-full text-center">
        <h2 class="font-bold text-2xl">Easier Done than Said</h2>
        <ul class="steps steps-vertical lg:steps-horizontal">
            <li class="step step-primary">Select your image</li>
            <li class="step step-primary">Select your format and size</li>
            <li class="step step-primary">Click the button</li>
            <li class="step step-primary">Download your created image</li>
        </ul>
    </section>
    <section class="w-full text-center mt-5">
        <h2 class="font-bold text-2xl">Supported Formats and Conversions</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            {#each formatList as format}
                <div class="w-full h-full flex flex-col justify-center items-center">
                    <a href="/convert?format={format}" class="w-44 h-44 rounded-full border-current border flex justify-center items-center transition-transform hover:scale-105"><p class="font-semibold text-xl">{format}</p></a>
                </div>
            {/each}
        </div>
    </section>
</div>
