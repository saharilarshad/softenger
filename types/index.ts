export type LocalesProps = {
    locale: string;
}

export type SoftengerData = {
    id: number;
    avatar: string;
    first_name: string;
    last_name: string;
    email: string;
  }

  export type EmployeeData = {
    id: string
    profileImage?: string,
    name: string,
    salary: number,
    age: number
}

export type StoreState = {
  employee: EmployeeData[];
  addEmployee: (formData: FormData) => Promise<void>;
}

export type FormData =  {
    name: string;
    salary: number;
    age: number;
    image: FileList;
  }