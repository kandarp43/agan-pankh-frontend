import React from 'react'
import './style.css'

const PremiumCard = () => {
	return (
		<div class='Ad'>
			<div class='card'>
				<div class='card-body text-center'>
					<h5 class='card-title'>Unlock Premium Subscription</h5>
					<p class='card-text'>Get unlimited access to all tests!</p>
					<h2 class='card-price'>Rs. 49</h2>
					<p class='card-text'>One-time payment</p>
					<button class='btn btn-primary btn-lg'>Get Premium</button>
				</div>
			</div>
		</div>
	)
}
export default PremiumCard
