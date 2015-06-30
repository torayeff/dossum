AccountsTemplates.configure({
	confirmPassword: true,
	enablePasswordChange: true,
	overrideLoginErrors: false,
	showLabels: false,
	showPlaceholders: true,
	continuousValidation: true,
	negativeValidation: true,
	positiveValidation: true,
	negativeFeedback: true,
	positiveFeedback: true,
	showValidating: true,
	texts: {
        signInLink_link: 'Log in',
        signUpLink_link: 'Register',
		button: {
			signIn: 'Log in',
			signUp: 'Register',
			changePwd: 'Change password'
		},
		title: {
			signIn: 'Log In',
			signUp: 'Register',
			changePwd: 'Change password'
		}
	}
});

AccountsTemplates.configureRoute('changePwd');

AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
	{
		_id: "displayName",
		type: "text",
		displayName: "Display Name: ",
		placeholder: {
			signIn: 'Display Name: ',
			signUp: 'Display Name: '
		},
		required: true,
		minLength: 5,
		maxLength: 40
	},
	{
		_id: "username",
		type: "text",
		displayName: "User ID: ",
		placeholder: {
			signIn: 'User ID: ',
			signUp: 'User ID: '
		},
		required: true,
		trim: true,
		lowercase: true,
		minLength: 5,
		maxLength: 20,
		re: /^[a-zA-Z0-9]+$/,
		errStr: "Only alphanumeric, -, _ characters are permitted!"
	},
	{
		_id: 'password',
		type: 'password',
		required: true,
		trim: true,
		minLength: 10,
		placeholder: {
		  signIn: 'Password:',
		  signUp: 'Password:'
		}
	}
]);