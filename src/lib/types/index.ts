interface LoginFormData {
  email: string;
  password: string;
}
interface CallRecord {
  id: string;
  call_type: string;
  created_at: string;
  direction: string;
  duration: string;
  from: string;
  is_archived: boolean;
  notes: string;
  to: string;
  via: string;
}

export type { LoginFormData, CallRecord };
