export type JobData = {
  id: number;
  company: string;
  position: string;
  location: string;
  salary: string;
  joblink: string;
  status: string;
  notes: string;
};

export type NewJobType = {
  setShowModal: (value: boolean) => void;
  setJobListChanged: (value: boolean | ((prevState: boolean) => boolean)) => void;
  initialData: JobData;
};


export interface ServerError {
  err:'400'
}