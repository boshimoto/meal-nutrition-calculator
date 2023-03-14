import {LitElement, html, css} from 'lit';
import {ItemElement} from './item/item-element.js';

export class ListElement extends LitElement {
	static styles = css`
		* {
			padding: 0;
			margin: 0;
			border-sizing: border-box;
		}

		:host {
			background-color: #96ceb4;
			background: linear-gradient(0.55turn, 
				rgba(150, 206, 180, 0.8), 
				rgba(255, 238, 173, 0.8), 
				rgba(255, 204, 92, 0.8), 
				rgba(255, 111, 105, 0.8));
			user-select: none;
			font-family: Trebuchet MS, Tahoma, sans-serif;
		}

		.item {
			background: rgba(0, 0, 0, 0.2);
			height: 232px;
			margin: 0 7px 10px 7px;
			overflow: auto;
			border-radius: 5px;
		}

		p {
			border: 1px solid white;
			border-radius: 10px 0;
	  	background-color: #3e3e42;
			font-size: 12px;
	  	color: #fff;
			padding: 5px 15px;
			margin: 15px 30px 2px 7px;
	  	letter-spacing: 1px;
		}

		.button {
			display: flex;
			justify-content: center;
			margin: 50px 30px 15px 30px;
		}

		button {
			border: none;
			cursor: pointer;
			text-transform: uppercase;
			font-weight: 700;
			letter-spacing: 1px;
			padding: 16px 16px;
			border-radius: 10px;
			background:	rgba(150, 206, 180, 1);
			transition-duration: 300ms;
		}

		button:active {
			filter: brightness(140%);
		}
	`;

	static properties = {
		data: { type: Array },
		_valueReset: { type: Array }
	}

	constructor() {
		super();
		this.data = [];
		this._valueReset = [];
	}

	willUpdate(changedProperties) {
		if (changedProperties.has('data')) {
			if (!this.data.length) {
				return;
			}
		};
	}

	async handleClick() {
		const options = {
			bubbles: true,
			composed: true
		};
		await this.updateComplete;
		this.dispatchEvent(new CustomEvent('clear-count', options));
	}

	render() {
		return html`
		<div class="button">
			<button @click=${this.handleClick}>clear all selected</button>
		</div>

		<p>Tap listed food to incrementally decrease:</p>
		<div class="item">
			${this.data.map(
				(value) => {
					if (value.count <= 0) {
						return;
					}
					return html`
						<item-element .value=${value}></item-element>
					`
				})
			}
		</div>
		`;
	}
}

customElements.define('list-element', ListElement);