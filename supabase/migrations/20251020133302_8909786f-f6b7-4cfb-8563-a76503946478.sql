-- Enable INSERT, UPDATE, and DELETE operations for faculty table
CREATE POLICY "Anyone can insert faculty"
ON public.faculty
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update faculty"
ON public.faculty
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete faculty"
ON public.faculty
FOR DELETE
USING (true);

-- Enable INSERT, UPDATE, and DELETE operations for class_routine table
CREATE POLICY "Anyone can insert class_routine"
ON public.class_routine
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update class_routine"
ON public.class_routine
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete class_routine"
ON public.class_routine
FOR DELETE
USING (true);

-- Enable INSERT, UPDATE, and DELETE operations for notices table
CREATE POLICY "Anyone can insert notices"
ON public.notices
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update notices"
ON public.notices
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete notices"
ON public.notices
FOR DELETE
USING (true);