-- Create role enum for user types
CREATE TYPE public.app_role AS ENUM ('admin', 'staff', 'student');

-- Create user_roles table to store role assignments
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Only admins can assign roles (this will work after first admin is created)
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Security definer function to check if user has a specific role
-- This prevents RLS recursion issues
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- ==========================================
-- SECURE FACULTY TABLE
-- ==========================================
-- Drop dangerous "anyone can modify" policies
DROP POLICY IF EXISTS "Anyone can insert faculty" ON public.faculty;
DROP POLICY IF EXISTS "Anyone can update faculty" ON public.faculty;
DROP POLICY IF EXISTS "Anyone can delete faculty" ON public.faculty;

-- Create secure admin-only policies
CREATE POLICY "Admins can insert faculty" ON public.faculty
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update faculty" ON public.faculty
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete faculty" ON public.faculty
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Keep public read access (faculty profiles are meant to be public)
-- The "Anyone can view faculty" policy already exists

-- ==========================================
-- SECURE CLASS_ROUTINE TABLE
-- ==========================================
DROP POLICY IF EXISTS "Anyone can insert class_routine" ON public.class_routine;
DROP POLICY IF EXISTS "Anyone can update class_routine" ON public.class_routine;
DROP POLICY IF EXISTS "Anyone can delete class_routine" ON public.class_routine;

CREATE POLICY "Admins can insert schedules" ON public.class_routine
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update schedules" ON public.class_routine
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete schedules" ON public.class_routine
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Keep public read access
-- The "Anyone can view class_routine" policy already exists

-- ==========================================
-- SECURE NOTICES TABLE
-- ==========================================
DROP POLICY IF EXISTS "Anyone can insert notices" ON public.notices;
DROP POLICY IF EXISTS "Anyone can update notices" ON public.notices;
DROP POLICY IF EXISTS "Anyone can delete notices" ON public.notices;

CREATE POLICY "Admins can insert notices" ON public.notices
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update notices" ON public.notices
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete notices" ON public.notices
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));