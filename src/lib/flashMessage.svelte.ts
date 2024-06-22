type Types = 'success' | 'failure';

// TOOD: Implement css classes for the flash message types
function createFlashMessage(text: string, type: Types = 'success', duration = 500) {
	let toastText = $state(text);

	$effect.root(() => {
		$effect(() => {
			if (toastText) {
				const timeout = setTimeout(() => {
					console.log('Clearing toastText');
					toastText = '';
				}, duration);

				return () => clearTimeout(timeout);
			}
		});
	});

	function cancel() {
		toastText = '';
	}

	return {
		get toastText() {
			return toastText;
		},
		set toastText(value: string) {
			console.log('Setting toastText', { value });
			toastText = value;
		},
		setFlash(value: string, newDuration: number = 500) {
			console.log('Setting flash message');
			toastText = value;
			duration = newDuration;
			return toastText;
		},
		cancel
	};
}

export const flashMessage = createFlashMessage('');
