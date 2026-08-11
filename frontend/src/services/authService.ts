import api from "../api/axios";
export type RoleType = 'recruiter' | 'candidate';


export interface LoginRequest {
    email: string;
    password: string;
}


export interface LoginResponse {
    success: boolean;
    message: string;
    user?: {
        email?: string;
        username: string;
        role: string;
    }
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface SendOtpRequest {
  email: string;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpRequest {
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
}


export interface RegisterRequest {
  username: string;
  password: string;
  role: RoleType;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: {
    email?: string;
    username: string;
    role: RoleType;
  };
}

export interface User {
  data: {
    username: string;
    role: RoleType;
    userId: string;
  }
}


export const login = async(credentials: LoginRequest) :Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    return response.data;
}


export const logout = async() : Promise<LogoutResponse> => {
    const response = await api.post<LogoutResponse>("/auth/logout");
    return response.data;
}


export const sendOtp = async (data: SendOtpRequest): Promise<SendOtpResponse> => {
  const response = await api.post<SendOtpResponse>('/auth/signup', data);
  return response.data;
};


export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/auth/register', data);
  return response.data;
};



export const verifyOtp = async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
  const response = await api.post<VerifyOtpResponse>('/auth/verify-otp', data);
  return response.data;
};


export const me = async (): Promise<User> => {
  const response = await api.get<User>('/auth/me');
    return response.data;
}