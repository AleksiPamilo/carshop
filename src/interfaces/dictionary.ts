export interface IDictionary {
    title: string,
    loading: string,
    auth: {
        signIn: string,
        signUp: string,
        signOut: string,
        username: string,
        password: string,
        email: string,
        dontHaveAccount: string,
        alreadyHaveAccount: string,
        forgotPassword: string,
        resetPassword: string,
        newPassword: string,
        confirmPassword: string,
        errors: {
            username: string,
            usernameTaken: string,
            password: string,
            passwordLength: string,
            passwordsDontMatch: string,
            email: string,
            emailInvalid: string,
            incorrectCredentials: string,
            unknownError: string,
        }
    },
    navigation: {
        label: string,
        path: string,
    }[],
    locales: {
        fi: string,
        en: string,
    }
}