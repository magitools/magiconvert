<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	/**
	 * @type {import("$app/forms").SubmitFunction}
	 *
	 */
	const updateTheme = ({ action }) => {
		const theme = action.searchParams.get('theme');
		if (theme) {
			document.documentElement.setAttribute('data-theme', theme);
		}
	};
</script>

<footer class="footer items-center p-4">
	<div class="items-center grid-flow-col">
		<p>
			&copy; {new Date().getFullYear()} Matteo Gassend
		</p>
	</div>
	<div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
		<div class="dropdown dropdown-top">
			<button tabindex="0" class="btn btn-outline">Change Theme</button>
			<form method="post" use:enhance={updateTheme}>
				<ul class="dropdown-content menu p-2 shadow rounded-box">
					<li>
						<button class="btn btn-outline" formaction="/?/setTheme&theme=dark&redirectTo={$page.url.pathname}"
							>Dark</button
						>
					</li>
					<li>
						<button class="btn btn-outline" formaction="/?/setTheme&theme=light&redirectTo={$page.url.pathname}"
							>Light</button
						>
					</li>
				</ul>
			</form>
		</div>
	</div>
</footer>
