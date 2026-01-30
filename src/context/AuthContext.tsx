import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    profilePicture?: string;
    subscription?: string;
    joinDate?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
    | { type: 'LOGIN_START' }
    | { type: 'LOGIN_SUCCESS'; payload: User }
    | { type: 'LOGIN_FAILURE' }
    | { type: 'LOGOUT' }
    | { type: 'UPDATE_USER'; payload: Partial<User> }
    | { type: 'SET_LOADING'; payload: boolean };

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN_START':
            return { ...state, isLoading: true };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
        case 'UPDATE_USER':
            return {
                ...state,
                user: state.user ? { ...state.user, ...action.payload } : null,
            };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        loadUserFromStorage();
    }, []);

    const loadUserFromStorage = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                const user = JSON.parse(userData);
                dispatch({ type: 'LOGIN_SUCCESS', payload: user });
            } else {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        } catch (error) {
            console.error('Error loading user from storage:', error);
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const saveUserToStorage = async (user: User) => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.error('Error saving user to storage:', error);
        }
    };

    const login = async (email: string, password: string) => {
        dispatch({ type: 'LOGIN_START' });

        try {
            // Simulate API call - replace with actual authentication
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock user data - replace with actual API response
            const user: User = {
                id: '1',
                name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
                email: email,
                avatar: '👤',
                subscription: 'premium',
                joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            };

            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
            await saveUserToStorage(user);
        } catch (error) {
            console.error('Login error:', error);
            dispatch({ type: 'LOGIN_FAILURE' });
            throw error;
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        dispatch({ type: 'LOGIN_START' });

        try {
            // Simulate API call - replace with actual authentication
            await new Promise(resolve => setTimeout(resolve, 1000));

            const user: User = {
                id: Date.now().toString(),
                name: name,
                email: email,
                avatar: '👤',
                subscription: 'free',
                joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            };

            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
            await saveUserToStorage(user);
        } catch (error) {
            console.error('Signup error:', error);
            dispatch({ type: 'LOGIN_FAILURE' });
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            dispatch({ type: 'LOGOUT' });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const updateUser = (userData: Partial<User>) => {
        if (state.user) {
            const updatedUser = { ...state.user, ...userData };
            dispatch({ type: 'UPDATE_USER', payload: userData });
            saveUserToStorage(updatedUser);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                signup,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};