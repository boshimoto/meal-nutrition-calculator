import {LitElement, html, css} from 'lit';

export class FilterByElement extends LitElement {
	static styles = css`
	  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
		:host {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			transition: 500ms;
		}

		label,
		input {
			cursor: pointer;
			user-select: none;
		}

		input[type="checkbox"] {
      appearance: none;
      border-radius: 5px;
		  background-color: #fff;
			width: 38px;
			height: 38px;
			border: 2px solid black;
		  transition: 300ms;
		}

		input[type="checkbox"]:checked {
			box-shadow: inset 0 0 0 8px white, inset 0 0 0 20px black;
			border: 2px solid #fff;
		}

		label {
			display: flex;
			align-items: center;
			text-shadow: -1px 2px 1px black;
			height: 42px;
			padding: 0 16px;
			margin: 0 4px;
			font-size: 16px;
			letter-spacing: 1px;
			font-weight: 700;
			color: #FFFF99;
			font-family: Trebuchet MS, Tahoma, sans-serif;
		}

		label:active {
			filter: brightness(125%);
		}
	`;

	static properties = {
		group: { type: String },
		checked: { type: Boolean },
		style: { type: String }
		// searchValue: { type: String }
	}

	constructor() {
		super();
		this.group = '';
		this.checked = false;
		this.style = '';
		// this.searchValue = '';
	}

	async handleClick() {
		this.shadowRoot.querySelector('input').click();
	}

	async handleChecked(event) {
		this.checked = event.target.checked;
		
		const options = {
			detail: {	filter: this },
			bubbles: true,
			composed: true
		};

    await this.updateComplete;
		this.dispatchEvent(new CustomEvent('filter-event', options));
	}

	willUpdate(changedProperties) {
		// if (changedProperties.has('searchValue')) {
		// 	if (this.searchValue.length) {
		// 		this.shadowRoot.querySelector('input').checked = false;
		// 	}
		// }
	}

	render() {
		return html`
			<input @change=${this.handleChecked} type="checkbox" ?checked=${this.checked} group=${this.group}>
			<label style="background-color: ${this.style}" @click=${this.handleClick} for=${this.group}>${this.group.toUpperCase()}</label>
		`;
	}
}

customElements.define('filter-by-element', FilterByElement);