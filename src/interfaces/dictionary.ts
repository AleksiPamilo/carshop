import { IVehicleCategory } from "./vehicle"

export interface IDictionary {
    beta: {
        title: string,
        description: string,
        startTesting: string,
    },
    title: string,
    loading: string,
    common: {
        save: string,
        cancel: string,
        delete: string,
        edit: string,
        add: string,
        search: string,
        searchBrand: string,
        searchModel: string,
        changeSearchCriteria: string,
        moreOptions: string,
        showLess: string,
        showMore: string,
        next: string,
        previous: string,
        returnToFrontPage: string,
        emailSent: string,
        showcase: string,
        description: string,
        features: string,
        salesAd: string,
        min: string,
        max: string,
        close: string,
        confirm: string,
        yes: string,
        no: string,
        ok: string,
        clear: string,
        loading: string,
        error: string,
        success: string,
        warning: string,
        info: string,
        createAd: string,
        errors: {
            unknown: string,
            notFound: string,
            brandNotFound: string,
            modelNotFound: string,
            unauthorized: string,
            forbidden: string,
            validation: string,
            server: string,
            badRequest: string,
            badGateway: string,
            serviceUnavailable: string,
        }
    },
    vehicles: {
        title: string,
        contactSeller: string,
        basicInfo: {
            title: string;
            brand: string;
            model: string;
            year: string;
            driverSide: string;
            licensePlate: string;
            firstRegistration: string;
            inspectionDate: string;
            previousOwners: string;
            color: string;
            paintType: string;
            description: string;
            mileage: string;
            price: string;
            features: string;
        },
        techInfo: {
            title: string;
            fuelType: string;
            engineSize: string;
            drivetrain: string;
            transmission: string;
            seats: string;
            doors: string;
            power: string;
            torque: string;
            topSpeed: string;
            acceleration: string;
            co2Emission: string;
            fuelCapacity: string;
            fuelConsumption: string;
            weight: string;
            totalWeight: string;
            towWeightWithoutBrakes: string;
            towWeightWithBrakes: string;
        },
        all: string,
        add: string,
        edit: string,
        delete: string,
        search: string,
        brand: string,
        model: string,
        price: string,
        year: string,
        licensePlate: string,
        vin: string,
        engine: string,
        mileage: string,
        powerHp: string,
        powerKw: string,
        torque: string,
        transmission: string,
        transmissions: {
            automatic: string,
            manual: string,
        },
        drivetrain: string,
        drivetrains: {
            fwd: string,
            rwd: string,
            awd: string,
        },
        fuelType: string,
        fuelTypes: {
            petrol: string,
            diesel: string,
            electric: string,
            hybrid: string,
        },
        fuelCapacity: string,
        fuelConsumption: {
            title: string,
            city: string,
            highway: string,
            combined: string,
        },
        featureCategories: {
            [key in IVehicleCategory]: string
        },
        features: {
            [key: string]: string,
        },
        errors: {
            brand: string,
            model: string,
            year: string,
            licensePlate: string,
            vin: string,
            mileage: string,
            fuelType: string,
            fuelCapacity: string,
            fuelConsumption: string,
        }
    },
    auth: {
        signIn: string,
        signInSuccess: string,
        signUp: string,
        signUpSuccess: string,
        signOut: string,
        username: string,
        password: string,
        email: string,
        dontHaveAccount: string,
        alreadyHaveAccount: string,
        forgotPassword: string,
        resetPassword: string,
        passwordResetInstructions: string,
        passwordResetNotification: string,
        newPassword: string,
        selectNewPassword: string,
        passwordChanged: {
            title: string,
            desc: string,
        },
        confirmPassword: string,
        errors: {
            username: string,
            usernameTaken: string,
            password: string,
            passwordLength: string,
            passwordsDontMatch: string,
            invalidPassword: string,
            email: string,
            emailInvalid: string,
            emptyFields: string,
            incorrectCredentials: string,
            unknownError: string,
            invalidToken: {
                title: string,
                desc: string,
            }
        }
    },
    emails: {
        resetPassword: {
            subject: string,
            greeting: string,
            requestReset: string,
            ifNotRequested: string,
            regards: string,
            companyName: string,
            clickHereToReset: string,
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