/// <reference types="react" />
import { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { AxiosStatic } from 'axios';

interface AuthPageProps {
    apiBaseURL: string;
    apiCallback?: (res: {
        type: 'valid-user' | 'validate-user' | 'signup' | 'registration' | 'login';
        data: any;
    }) => void;
    className?: string;
}
interface LoginPageProps extends AuthPageProps {
    title?: string;
}
interface PasswordPageProps extends AuthPageProps {
    title?: string;
}
interface RegistrationPageProps extends AuthPageProps {
    title?: string;
}
interface ForgotPasswordPageProps extends AuthPageProps {
    title?: string;
}

declare const PasswordPage: FunctionComponent<PasswordPageProps>;

/**
 * @file Login Page
 * @description Login page UI
 * @class
 */
declare const Login: FunctionComponent<LoginPageProps>;

interface LognWrapperProps extends PropsWithChildren {
    title?: string;
    subTitle?: string;
    className?: string;
}

declare function LoginWrapper(props: LognWrapperProps): JSX.Element;

declare function ChangePassword(): JSX.Element;

declare const ForgotPasswordPage: FunctionComponent<ForgotPasswordPageProps>;

declare const RegistrationPage: FunctionComponent<RegistrationPageProps>;

interface AlertConfirmComponentButtons {
    name: string;
}
interface AlertConfirmComponentProps extends PropsWithChildren {
    isOpen: boolean;
    transitionType?: 'up' | 'down';
    title?: string;
    className?: string;
    type?: 'alert' | 'confirm' | 'custom';
    renderTitle?: () => ReactElement;
    renderContent?: () => ReactElement;
    renderButtons?: () => ReactElement;
    buttons?: AlertConfirmComponentButtons[];
    onBtnClick?: (val: any) => void;
    onAlertClose?: (val: any) => void;
}

declare function AlertConfirmComponent(props: AlertConfirmComponentProps): JSX.Element;

interface FormFieldProps extends PropsWithChildren {
    errors: any;
    control: any;
    inputType?: 'text' | 'number' | 'password' | 'select' | 'textarea';
    rules?: any;
    label: string;
    fieldName: string;
    placeholder?: string;
    selectData?: any[];
    selectDataIdKey?: string;
    selectDataLabelKey?: string;
    errorMessages?: {
        [key: string]: any;
    };
    customValidate?: boolean;
    inputChange?: (val: any) => any;
    customChildren?: (val?: any) => any;
}

declare function FormField(props: FormFieldProps): JSX.Element;

declare function Preloader(): JSX.Element;

interface ObjectKeyPair$1 {
    [key: string]: any;
}
declare class Utils {
    private static _storagePrifix;
    private static timerObject;
    static toJson(val: any): any;
    static toString(val: any): string;
    static timeout(key: string, callBack: () => void, time?: number): void;
    static clearTimeout(key: string): void;
    static isArray(val: any): boolean;
    static isObject(val: any): boolean;
    static trimDoubleQuote(url: string): string;
    static eachKeyValue(obj: ObjectKeyPair$1, callBack: (value?: string, key?: any, object?: ObjectKeyPair$1) => any): void;
    static getLocalStore(key: string): any;
    static clearAllLocalStore(): void;
    static removeLocalStore(key: string): void;
    static getSessionStore(key: string): any;
    static clearAllSessionStore(): void;
    static removeSessionStore(key: string): void;
}

interface StorageTypes {
    value: any;
    setStore: (val: any) => void;
    clearStore: () => void;
    clearAllStore: () => void;
}
declare function useLocalStorage(key: string, initialValue?: null): StorageTypes;

declare const cancellablePromise: (promise: Promise<any>) => object;

declare class LoginUtil {
    private static emailRegExp;
    private static phoneRegExp;
    static validateLogin(login: any): 'email' | 'phone' | '';
    static formatPhone(phone: any): string;
    static fixPhone(l: string): string;
}

declare class StorageService {
    static _prefix: string;
    static getItem(name: string): any;
    static setItem(name: string, value: any): void;
    static hasItem(name: string): boolean;
    static clear(name: string): void;
    static clearAll(): void;
    static _getKey(name: string): string;
}

declare class UserService {
    private static COUNTRY_CODES;
    /**
 * Get Country code
 * @return {*}
 */
    static getCountryCode(): any;
    static isUserLoggedIn(): any;
    static getToken(): any;
    static me(): any;
    static setToken(token: any): void;
    static setUser(data: any, onSuccess?: any): void;
    static logOut(): void;
    static saveUserData(user: any, access_token: any, loginByToken?: any): void;
    static storeUserData(user: any, access_token: any, loginByToken?: any): void;
}

interface ObjectKeyPair {
    [key: string]: any;
}
type API_METHODS = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELET';
type AxiosParamsData = Array<any>;
type AxiosQueryPramsArray = [any, any];
interface AxiosHttpPayload {
    queryParams?: ObjectKeyPair;
    queryParamsArray?: AxiosQueryPramsArray[];
    paramsData?: AxiosParamsData[];
    data?: any;
    baseURL?: string;
    apiBaseUrl?: string;
    [key: string]: any;
}

declare class HttpClient {
    static apiBaseUrl: string;
    static setAPIBaseURL(opt: {
        baseURL: string;
        apiBaseURL?: string;
    }): void;
    static getAxios(): AxiosStatic;
    static get(url: string, payload?: AxiosHttpPayload): Promise<any>;
    static post(url: string, payload?: AxiosHttpPayload): Promise<any>;
    static put(url: string, payload?: AxiosHttpPayload): Promise<any>;
    static patch(url: string, payload?: AxiosHttpPayload): Promise<any>;
    static delete(url: string, payload?: AxiosHttpPayload): Promise<any>;
    static payload(method: string, url: string, payloadObj?: AxiosHttpPayload): any;
    static buildUrl(url: string, payload: AxiosHttpPayload): string;
    static mapParams(url: string, str: string, val: string): string;
    private static buildQuery;
}

export { API_METHODS, AlertConfirmComponent as AlertConfirm, AxiosHttpPayload, AxiosParamsData, AxiosQueryPramsArray, ChangePassword, ForgotPasswordPage as ForgotPassword, FormField, HttpClient, Login, LoginUtil, LoginWrapper, ObjectKeyPair, PasswordPage as Password, Preloader, RegistrationPage as Registration, StorageService, UserService, Utils, cancellablePromise, useLocalStorage };
