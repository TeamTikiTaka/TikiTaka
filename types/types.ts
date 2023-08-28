export type JobData = {
  company: string;
  position: string;
  location: string;
  salary: string;
  joblink: string;
  status: string;
  notes: string;
};


export interface ServerError {
  err:'400'
}