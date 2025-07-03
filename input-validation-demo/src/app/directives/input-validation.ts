import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../services/data';
import { Engine } from '../services/engine';


import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../components/shared/confirm-dialog/confirm-dialog';




@Directive({
	selector: '[validateInput]'
})
export class InputValidation {

	inputElement: ElementRef;

	@Input('validateInput') validateInput: string | undefined;
	arabicRegex = '[\u0600-\u06FF]';

	constructor(el: ElementRef, private dataService: Data, private router: Router, private engineService: Engine, private snackBar: MatSnackBar,
		private dialog: MatDialog) {
		this.inputElement = el;
	}

	// @HostListener('keypress', ['$event']) onKeyPress(event: { keyCode: any; which: any; target: { value: string; }; }) 
	@HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
		switch (this.validateInput) {
			case 'quantity':
				return this.quantityValidation(event)
				break;
			case 'free':
				return this.freeValidation(event)
				break;
			case 'discount':
				// return this.discountValidation(event)
				break;
			case 'month':
				return this.monthValidation(event)
				break;
			case 'year':
				return this.yearValidation(event)
				break;
			case 'gst':
				return this.gstValidation(event)
				break;
			case 'salesQuantity':
				return this.salesQuantityValidation(event)
				break;
			case 'batch':
				return this.batchValidation(event)
				break;
			case 'billno':
				return this.billNoValidation(event)
				break;
			default:
				return this.checkNumber(event)
				break;
		}
	}

	// @HostListener('input', ['$event'])
	// onInput(event: Event) {
	// 	if (this.validateInput === 'discount') {
	// 		this.discountValidation(event as InputEvent);  // Cast here
	// 	}
	// }

	@HostListener('input', ['$event'])
	onInput(event: any) {
		if (this.validateInput === 'discount') {
			this.discountValidation(event);
		}
	}



	/**
	 * Billl number validation allow Only A-Za-z0-9-/
	 * @param event event
	 */
	billNoValidation(event: any) {
		var k;
		document.all ? k = event.keyCode : k = event.which;
		var array = event.target.value.split('');
		if ((k >= 65 && k <= 90) || (k >= 97 && k <= 122) || k == 45 || k == 47 || (k >= 48 && k <= 57)) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * batch validations alpha numeric  - and / only
	 * @param event event //{ keyCode: any; which: any; target: { value: string; }; }
	 */
	batchValidation(event: any) {
		var k;
		document.all ? k = event.keyCode : k = event.which;
		var array = event.target.value.split('');
		if ((k >= 48 && k <= 57) || (k >= 97 && k <= 122) || (k >= 65 && k <= 90) || k == 45 || k == 47) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 *
	 * @param event event
	 */
	// salesQuantityValidation(event: { keyCode: any; which: any; key: string; target: { value: { split: (arg0: string) => { (): any; new(): any; length: number; }; }; }; }) {
	// 	var k;
	// 	var selecttxt;
	// 	if (window.getSelection) {
	// 		selecttxt != window.getSelection();
	// 	}
	// 	document.all ? k = event.keyCode : k = event.which;
	// 	if (event.key === '-' && event.target.value.split('-').length === 1) {
	// 		Swal.fire({
	// 			title: '',
	// 			text: 'Negative quantity is not allowed! Want to create return bill?',
	// 			icon: 'warning',
	// 			showCancelButton: true,
	// 			confirmButtonText: 'Go to Sales Return',
	// 			cancelButtonText: 'Cancel'
	// 		}).then((result: { value: any; }) => {
	// 			if (result.value) {
	// 				this.navigateTo('sales-return/add')
	// 			}
	// 		})
	// 		return false;
	// 	}
	// 	if ((k >= 48 && k <= 57)) {
	// 		return true;
	// 	} else if (selecttxt == '') {
	// 		return false;
	// 	}
	// 	return true;

	// }
	salesQuantityValidation(event: KeyboardEvent) {
		const k = event.keyCode || event.which;
		if (event.key === '-' && this.inputElement.nativeElement.value.split('-').length === 1) {
			// Open confirm dialog
			const dialogRef = this.dialog.open(ConfirmDialog, {
				data: { message: 'Negative quantity is not allowed!' }
			});

			dialogRef.afterClosed().subscribe(result => {
				if (result === true) {
					this.navigateTo('sales-return/add');
				}
			});

			event.preventDefault();
			return false;
		}
		if (k >= 48 && k <= 57) {
			return true;
		}
		return false;
	}


	/**
	 * NAvigate to
	 * @param path path
	 */
	navigateTo(path: string) {
		this.dataService.changenavigationPath('', '', '');
		this.router.navigate([path]);
	}

	/**
	 * Gst validation that will allow two digits only
	 * @param event event
	 */
	gstValidation(event: KeyboardEvent) {

		const input = event.target as HTMLInputElement;
		const value: any = input.value;

		// 0,5,12,18,28
		var k;
		var selecttxt: any;
		if (window.getSelection) {
			selecttxt = window.getSelection();
		}
		document.all ? k = event.keyCode : k = event.which;
		var array = value.split('');
		if (window.getSelection) {
			selecttxt = window.getSelection();
		}
		if ((k >= 48 && k <= 57)) {
			if (array.length >= 2 && selecttxt == '') { // allow only 2 digits
				return false;
			}
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Month validation allow only 1 to 12
	 * @param event event
	 */
	monthValidation(event: KeyboardEvent) {
		const input = event.target as HTMLInputElement;
		const value: any = input.value;

		var k;
		document.all ? k = event.keyCode : k = event.which;
		var array = value.split('');
		var selecttxt: any;
		if (window.getSelection) {
			selecttxt = window.getSelection();
		}
		console.log("selecttxt : ", selecttxt)
		if ((k >= 48 && k <= 57) && value <= 12) {
			if (array.length == 0 && k == 48 && selecttxt == '') {
				return false;
			}
			if (Number(array[0]) == 0 && k == 48 && selecttxt == '') {
				return false;
			}
			if (array.length >= 2 && selecttxt == '') { // allow only 2 digits
				return false;
			}
			if (Number(array[0]) >= 2 && selecttxt == '') { // allow only 1 digits if first digit is 2-9
				return false;
			}
			if (Number(array[0]) == 1 && (k > 50) && selecttxt == '') { // allow only 11 and 12
				return false;
			}
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Year validation allow only two digits
	 * @param event event
	 */
	yearValidation(event: KeyboardEvent) {
		var k;
		document.all ? k = event.keyCode : k = event.which;
		const input = event.target as HTMLInputElement;
		const value: any = input.value;
		var array = input.value.split('');



		var selecttxt: any;
		if (window.getSelection) {
			selecttxt = window.getSelection();
		}
		if ((k >= 48 && k <= 57)) {
			if (array.length >= 2 && selecttxt == '') { // allow only 2 digits
				return false;
			}
			return true;
		} else {
			return false;
		}
	}


	/**
	 * discount validation
	 * @param event event
	 */
	// discountValidation(event: KeyboardEvent) {

	// 	const input = event.target as HTMLInputElement;
	// 	const value: any = input.value;

	// 	const discount = Number(value);
	// 	if (!isNaN(discount) && discount > 50) {
	// 		if (confirm('Discount is greater than 50%. Are you sure?')) {
	// 			// User confirmed
	// 		} else {
	// 			// User canceled - maybe clear input or revert
	// 		}
	// 	}

	// 	// if (value >= 50) {
	// 	// 	confirm('are you sure to give more than 50% discount ?');
	// 	// 	// Swal.fire({
	// 	// 	// 	title: 'Are you sure?',
	// 	// 	// 	text: 'You want to give more than 50% discount!',
	// 	// 	// 	icon: 'warning',
	// 	// 	// 	showCancelButton: true,
	// 	// 	// 	confirmButtonText: 'Yes!',
	// 	// 	// 	cancelButtonText: 'No'
	// 	// 	// }).then((result) => {
	// 	// 	// 	if (result.value == true) {
	// 	// 	// 		Swal.fire(
	// 	// 	// 			'Allowed !',
	// 	// 	// 			result.status_message,
	// 	// 	// 			'success'
	// 	// 	// 		)
	// 	// 	// 	} else {
	// 	// 	// 		event.target.value = '';
	// 	// 	// 	}
	// 	// 	// });
	// 	// }
	// 	return this.checkNumber(event);
	// }

	discountValidation(event: KeyboardEvent) {
		const input = event.target as HTMLInputElement;
		const value = input.value;

		const discount = Number(value);
		console.log(" vaue : ", value)
		if (!isNaN(discount) && discount > 50) {
			if (confirm('Discount is greater than 50%. Are you sure?')) {
				// User confirmed, do nothing or allow input
			} else {
				// User canceled, clear input or revert
				input.value = '';
			}
		}

		return this.checkNumber(event);
	}
	checkNumber(event: KeyboardEvent) {
		var k;
		document.all ? k = event.keyCode : k = event.which;

		const input = event.target as HTMLInputElement;
		const value: any = input.value;

		if (((k >= 48 && k <= 57) || k == 46)) {
			// deny to input . more than 1 time
			if (k == 46 && value.indexOf('.') >= 0) {
				return false;
			}
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Validation for quantity allow 0-9 only
	 * @param event event
	 */
	// quantityValidation(event: { keyCode: any; which: any; key: string; }) {
	// 	var k;
	// 	var selecttxt;
	// 	if (window.getSelection) {
	// 		selecttxt = window.getSelection();
	// 	}
	// 	document.all ? k = event.keyCode : k = event.which;
	// 	if (event.key === '-') {
	// 		this.engineService.error("Negative quantity is not allowed!");
	// 		return false;
	// 	}
	// 	if ((k >= 48 && k <= 57)) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// 	return true;
	// }

	quantityValidation(event: KeyboardEvent) {
		const k = event.keyCode || event.which;
		if (event.key === '-') {
			this.snackBar.open('Negative quantity is not allowed!', 'Close', { duration: 3000 });
			event.preventDefault();
			return false;
		}
		if (k >= 48 && k <= 57) {
			return true;
		}
		return false;
	}

	/**
	 * This function is used to check input is number or not
	 * @param n number
	 */
	isNumber(n: any): boolean {
		if (n === null || n === undefined) return false;
		return !isNaN(parseFloat(n.toString())) && !isNaN(Number(n));
	}

	/**
	 * Validation for free allow 0-9 with n, N, h, H also allow to input length up to only 3 digits
	 * @param event event
	 */
	freeValidation(event: KeyboardEvent) {
		var k;
		document.all ? k = event.keyCode : k = event.which;

		const input = event.target as HTMLInputElement;
		const value: any = input.value;

		var array = value.split('');
		var selecttxt: any;
		if (window.getSelection) {
			selecttxt = window.getSelection();
		}
		if ((k >= 48 && k <= 57) || k == 104 || k == 72 || k == 110 || k == 78 && selecttxt == '') {
			if (value.length == 3 && selecttxt == '') {
				return false;
			}
			// if first char is n, Nn hn H than second char will not be allowed
			if ((array[0] == 'n' || array[0] == 'N' || array[0] == 'H' || array[0] == 'h') && selecttxt == '') {
				return false;
			}
			// if first char is digit than second n, N, h, H will not be allowed
			if ((this.isNumber(array[0]) && (k == 104 || k == 72 || k == 110 || k == 78)) && selecttxt == '') {
				return false;
			}
			return true;
		} else {
			return false;
		}
	}

	@HostListener('paste', ['$event'])
	onPaste(event: ClipboardEvent): boolean {
		event.preventDefault(); // Prevent pasting
		return false;
	}

}
