<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<div class="p-4">
	<h1>Hey {data.user?.username}</h1>
	<p>
		you currently hold {data.user?.credits} credit{data.user?.credits &&
			data.user.credits > 1 &&
			's'}
	</p>
	<a href="/app/profile/recharge">Charge More</a>

	<h2>Transaction History</h2>
	<div class="table-container">
		<table class="table">
			<thead>
				<tr>
					<th>Date</th>
					<th>Amount</th>
					<th>Token Quantity</th>
				</tr>
			</thead>
			<tbody>
                {#if data.user && data.user.transactions}            
                    {#each data?.user?.transactions as transaction}
                        <tr>
                            <td>{transaction.date.toLocaleString()}</td>
                            <td>{(transaction.amount / 100).toFixed(2)} €</td>
                            <td>{transaction.quantity}</td>
                        </tr>
                    {/each}
                {/if}
			</tbody>
		</table>
	</div>
</div>
