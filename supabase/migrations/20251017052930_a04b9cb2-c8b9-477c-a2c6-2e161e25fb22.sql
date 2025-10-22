-- Create faculty table
CREATE TABLE public.faculty (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  department TEXT NOT NULL,
  education TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create class_routine table
CREATE TABLE public.class_routine (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  semester TEXT NOT NULL,
  day TEXT NOT NULL,
  time TEXT NOT NULL,
  subject TEXT NOT NULL,
  teacher TEXT NOT NULL,
  room TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create notices table
CREATE TABLE public.notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_routine ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (everyone can view)
CREATE POLICY "Anyone can view faculty"
  ON public.faculty FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view class_routine"
  ON public.class_routine FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view notices"
  ON public.notices FOR SELECT
  USING (true);

-- Insert sample faculty data
INSERT INTO public.faculty (name, designation, department, education, email, phone, display_order) VALUES
  ('Dr. Sarah Johnson', 'Professor & Head', 'Computer Science', 'Ph.D. in Computer Science, MIT', 'sarah.johnson@excellence.edu', '+1 (555) 123-4567', 1),
  ('Dr. Michael Chen', 'Associate Professor', 'Mathematics', 'Ph.D. in Applied Mathematics, Stanford', 'michael.chen@excellence.edu', '+1 (555) 123-4568', 2),
  ('Dr. Emily Rodriguez', 'Assistant Professor', 'Physics', 'Ph.D. in Quantum Physics, Caltech', 'emily.rodriguez@excellence.edu', '+1 (555) 123-4569', 3),
  ('Dr. James Williams', 'Professor', 'English Literature', 'Ph.D. in English Literature, Oxford', 'james.williams@excellence.edu', '+1 (555) 123-4570', 4),
  ('Dr. Priya Sharma', 'Associate Professor', 'Chemistry', 'Ph.D. in Organic Chemistry, Cambridge', 'priya.sharma@excellence.edu', '+1 (555) 123-4571', 5),
  ('Dr. Robert Taylor', 'Assistant Professor', 'Economics', 'Ph.D. in Economics, Harvard', 'robert.taylor@excellence.edu', '+1 (555) 123-4572', 6);

-- Insert sample class routine data
INSERT INTO public.class_routine (semester, day, time, subject, teacher, room, display_order) VALUES
  ('1st Semester', 'Monday', '8:00 AM - 9:30 AM', 'Mathematics I', 'Dr. Michael Chen', 'Room 301', 1),
  ('1st Semester', 'Monday', '9:45 AM - 11:15 AM', 'Programming Fundamentals', 'Dr. Sarah Johnson', 'Lab 101', 2),
  ('1st Semester', 'Monday', '11:30 AM - 1:00 PM', 'Physics I', 'Dr. Emily Rodriguez', 'Room 205', 3),
  ('1st Semester', 'Tuesday', '8:00 AM - 9:30 AM', 'English Composition', 'Dr. James Williams', 'Room 108', 4),
  ('1st Semester', 'Tuesday', '9:45 AM - 11:15 AM', 'Chemistry I', 'Dr. Priya Sharma', 'Lab 202', 5),
  ('2nd Semester', 'Monday', '8:00 AM - 9:30 AM', 'Mathematics II', 'Dr. Michael Chen', 'Room 301', 1),
  ('2nd Semester', 'Monday', '9:45 AM - 11:15 AM', 'Data Structures', 'Dr. Sarah Johnson', 'Lab 101', 2),
  ('2nd Semester', 'Monday', '11:30 AM - 1:00 PM', 'Physics II', 'Dr. Emily Rodriguez', 'Room 205', 3),
  ('2nd Semester', 'Tuesday', '8:00 AM - 9:30 AM', 'Microeconomics', 'Dr. Robert Taylor', 'Room 405', 4),
  ('2nd Semester', 'Tuesday', '9:45 AM - 11:15 AM', 'Chemistry II', 'Dr. Priya Sharma', 'Lab 202', 5),
  ('3rd Semester', 'Monday', '8:00 AM - 9:30 AM', 'Algorithms', 'Dr. Sarah Johnson', 'Lab 101', 1),
  ('3rd Semester', 'Monday', '9:45 AM - 11:15 AM', 'Database Systems', 'Dr. Sarah Johnson', 'Lab 103', 2),
  ('3rd Semester', 'Monday', '11:30 AM - 1:00 PM', 'Discrete Mathematics', 'Dr. Michael Chen', 'Room 301', 3),
  ('3rd Semester', 'Tuesday', '8:00 AM - 9:30 AM', 'Operating Systems', 'Dr. Sarah Johnson', 'Lab 101', 4),
  ('3rd Semester', 'Tuesday', '9:45 AM - 11:15 AM', 'Computer Networks', 'Dr. Sarah Johnson', 'Lab 104', 5);

-- Insert sample notices
INSERT INTO public.notices (title, content, category, priority, date, display_order) VALUES
  ('Mid-Term Examination Schedule Released', 'The mid-term examination schedule for all semesters has been published. Students are requested to check the notice board and prepare accordingly.', 'Examination', 'high', '2025-01-15', 1),
  ('Annual Sports Day - Registration Open', 'Registration for the Annual Sports Day is now open. Interested students can register at the sports complex office by January 25th.', 'Event', 'medium', '2025-01-12', 2),
  ('Library Timings Extended', 'The central library will now remain open until 10 PM on weekdays to facilitate students during the examination period.', 'Facility', 'low', '2025-01-10', 3),
  ('Guest Lecture on AI & Machine Learning', 'A special guest lecture by Dr. Alan Martinez from MIT will be held on January 20th. All computer science students are encouraged to attend.', 'Academic', 'medium', '2025-01-08', 4),
  ('Fee Payment Deadline', 'Students are reminded that the last date for semester fee payment is January 31st. Late fees will be applicable after this date.', 'Administrative', 'high', '2025-01-05', 5);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER set_faculty_updated_at
  BEFORE UPDATE ON public.faculty
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_class_routine_updated_at
  BEFORE UPDATE ON public.class_routine
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_notices_updated_at
  BEFORE UPDATE ON public.notices
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();