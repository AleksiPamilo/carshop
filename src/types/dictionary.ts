export type Dictionary = {
    title: string,
    loading: string,
    auth: {
        signin: string,
        signup: string,
        signout: string,
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
            password: string,
            email: string,
            emailInvalid: string,
            incorrectCredentials: string,
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