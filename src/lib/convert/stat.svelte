<script lang="ts">
	export let title: string;
	export let value: string | number;
</script>

<div class="flex flex-col text-center capitalize space-y-2 rounded-full p-4 shadow-lg">
	<h6>{title}</h6>
	<p>{value}</p>
</div>
