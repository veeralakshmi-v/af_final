import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

// We map our backend profile to the old Supabase type shape so we don't break downstream components
export interface Profile {
  id: string; // our backend uses _id, but we'll map it to id
  email: string;
  name: string;
  full_name: string;
  role: string;
  phone?: string;
  address?: string;
  profession?: string;
  fees?: number;
  course_id?: string;
}

export interface User {
  id: string;
  email: string;
}

export interface Session {
  access_token: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role?: string) => Promise<void>;
  signInWithGoogle: (token: string) => Promise<void>;
  oauthDebug: any | null;
  setOauthDebug: React.Dispatch<React.SetStateAction<any | null>>;
  resetDebug: any | null;
  setResetDebug: React.Dispatch<React.SetStateAction<any | null>>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string; }>;
  verifyEmail: (token: string) => Promise<{ success: boolean; message: string; }>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message: string; }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isStaff: boolean;
  isStudent: boolean;
  canAccessAdminDashboard: boolean;
  canAccessStaffDashboard: boolean;
  canAccessStudentDashboard: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [oauthDebug, setOauthDebug] = useState<any | null>(null);
  const [resetDebug, setResetDebug] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const { data } = await api.get('/auth/me');
        const mappedProfile = { ...data, id: data._id };
        const mappedUser = { id: data._id, email: data.email };
        
        setProfile(mappedProfile);
        setUser(mappedUser);
        setSession({ access_token: token, user: mappedUser });
      } catch (err) {
        console.error('Session invalid:', err);
        localStorage.removeItem('token');
        setProfile(null);
        setUser(null);
        setSession(null);
      }
    } else {
      setProfile(null);
      setUser(null);
      setSession(null);
    }
    setLoading(false);
  };

  const navigateToRoleDashboard = (role: string) => {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath === '/login' || currentPath === '/auth/callback') {
      switch (role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'staff':
          navigate('/staff/dashboard');
          break;
        case 'student':
          navigate('/student/dashboard');
          break;
        default:
          console.log('Unknown role:', role);
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      
      localStorage.setItem('token', data.token);
      await checkUserSession();
      
      if (data.user && data.user.role) {
        navigateToRoleDashboard(data.user.role);
      }
    } catch (error: any) {
      console.error('Sign in error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Login failed. Please check your credentials.');
    }
  };

  const signUp = async (email: string, password: string, fullName: string, userRole: string = 'student') => {
    try {
      const { data } = await api.post('/auth/register', { 
        email, 
        password, 
        name: email.split('@')[0],
        full_name: fullName, 
        role: userRole 
      });
      
      localStorage.setItem('token', data.token);
      await checkUserSession();
      
      if (data.user && data.user.role) {
        navigateToRoleDashboard(data.user.role);
      }
    } catch (error: any) {
      console.error('Sign up error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  const signOut = async () => {
    localStorage.removeItem('token');
    setProfile(null);
    setUser(null);
    setSession(null);
    navigate('/');
  };

  const signInWithGoogle = async (token: string) => {
    try {
      const { data } = await api.post('/auth/google', { token });
      
      localStorage.setItem('token', data.token);
      await checkUserSession();
      
      if (data.user && data.user.role) {
        navigateToRoleDashboard(data.user.role);
      }
    } catch (error: any) {
      console.error('Google Sign in error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Google login failed.');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      return { success: true, message: data.message };
    } catch (error: any) {
      console.error('Reset password error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to send reset email.');
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      const { data } = await api.post('/auth/verify-email', { token });
      return { success: true, message: data.message };
    } catch (error: any) {
      console.error('Verify email error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to verify email.');
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const { data } = await api.post('/auth/update-password', { currentPassword, newPassword });
      return { success: true, message: data.message };
    } catch (error: any) {
      console.error('Update password error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to update password.');
    }
  };

  const isAdmin = profile?.role === 'admin';
  const isStaff = profile?.role === 'staff';
  const isStudent = profile?.role === 'student';

  const canAccessAdminDashboard = isAdmin;
  const canAccessStaffDashboard = isAdmin || isStaff;
  const canAccessStudentDashboard = isAdmin || isStaff || isStudent;

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      resetPassword,
      verifyEmail,
      updatePassword,
      signOut,
      isAdmin,
      isStaff,
      isStudent,
      canAccessAdminDashboard,
      canAccessStaffDashboard,
      canAccessStudentDashboard,
      oauthDebug,
      setOauthDebug,
      resetDebug,
      setResetDebug
    }}>
      {children}
    </AuthContext.Provider>
  );
};
