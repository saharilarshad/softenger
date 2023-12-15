import { create } from "zustand"
import { persist } from "zustand/middleware"
import { produce } from 'immer';
import { randomUUID } from "crypto";
import { v4 as uuidv4 } from 'uuid'
import type { EmployeeData, StoreState, FormData } from "@/types"



export const createEmployeeStore = create<StoreState>(
    persist((set: SetState<StoreState>) => ({
        employee: [],

        addEmployee: async (newEmployee: FormData) => {

            const id = uuidv4()
            const file: File | null = newEmployee.get('image') as unknown as File
            const profileImage = file.size + file.lastModified + file.name
            const name = newEmployee.get("name")
            const salary = newEmployee.get("salary")
            const age = newEmployee.get("age")

            const newEmp: EmployeeData = {
                id,
                profileImage: profileImage as string,
                name: name as string,
                salary: salary ? Number(salary) : 0,
                age: age ? Number(age) : 0
            }

            // console.log(currentLocale)

            async function saveFile() {

                const formData = new FormData();
                formData.append("image", file);
                formData.append("profileImage", profileImage);

                try {
                    const apiUrl = `/api/saveImage`;
                    // const apiUrl = `/${currentLocale}/api/saveImage`;
                    // console.log("API URL:", apiUrl);

                    const response = await fetch(apiUrl, {
                        method: "POST",
                        body: formData,
                    });

                    // console.log('response', response);

                    if (!response.ok) {
                        // console.error("Error uploading file");
                    }
                } catch (error) {
                    // console.error(`Error uploading file: ${error.message}`);
                }
            }

            await saveFile();

            // console.log("success")

            set(produce((state: StoreState) => {

                // console.log(state.employee)
                // console.log(newEmp)
                // return { ...state, employee: [...state.employee, newEmp] }
                state.employee.push(newEmp)
                // console.log(state.employee)
                // console.log(added)
            }))

        },
        updateEmployee: async (uptEmployee: FormData) => {
            // console.log(uptEmployee.formData())
            // console.log("masukup")
            const getId = uptEmployee.get("id")
            // console.log(getId)
            const file: File | null = uptEmployee.get('image') as unknown as File

            const currProfileImage = file ? file.size + file.lastModified + file.name : null
            // console.log(currProfileImage)
            const name = uptEmployee.get("name")
            // console.log(name)
            const salary = uptEmployee.get("salary")
            const age = uptEmployee.get("age")

            set(produce((state: Draf<StoreState>) => {
                const existingEmployee = state.employee.find(emp => emp.id === getId)
                // console.log(existingEmployee)

                if (existingEmployee) {
                    if (file) {
                        // console.log("masuksini")
                        const updateEmp = {
                            ...existingEmployee,
                            profileImage: currProfileImage as string,
                            name: name as string,
                            salary: salary ? Number(salary) : 0,
                            age: age ? Number(age) : 0
                        }

                        // console.log(updateEmp)

                        const updatedEmployeeList = produce(state.employee, draft => {
                            draft.map(emp => {
                                if (emp.id === getId) {
                                    emp.profileImage = updateEmp.profileImage;
                                    emp.name = updateEmp.name;
                                    emp.salary = updateEmp.salary;
                                    emp.age = updateEmp.age;
                                }
                                return emp;
                            });
                        });
                        // console.log(updatedEmployeeList)

                        // await saveFile(file, currProfileImage, state.currentLocale).then(() => {
                        //     updateEmployeeList = state.employee.map(emp => emp.id === getId ? updateEmp : emp)
                        // set((state: StoreState) => ({
                        //     // employee: state?.employee.map(emp => (emp.id === getId ? updateEmp : emp))
                        //     // employee: [...state.employee, updateEmployeeList]
                        //     employee: updateEmployeeList

                        // }))
                        saveFile(file, currProfileImage).then(() => {
                            // console.log("done");
                        });
                        return { employee: updatedEmployeeList };

                    } else {
                        // console.log('xde file')
                        const updateEmp = {
                            ...existingEmployee,
                            profileImage: existingEmployee.profileImage as string,
                            name: name as string,
                            salary: salary ? Number(salary) : 0,
                            age: age ? Number(age) : 0
                        }

                        // console.log(updateEmp)

                        const updatedEmployeeList = produce(state.employee, draft => {
                            draft.map(emp => {
                                if (emp.id === getId) {
                                    emp.profileImage = updateEmp.profileImage;
                                    emp.name = updateEmp.name;
                                    emp.salary = updateEmp.salary;
                                    emp.age = updateEmp.age;
                                }
                                return emp;
                            });
                        });
                        // console.log(updatedEmployeeList)

                        return { employee: updatedEmployeeList };


                    }


                } else {
                    console.log("Employee not found");
                    // return state;
                }

            }))


        },
        removeEmployee: (employeeId: string) => set((state: StoreState) => {
            const updateRemove = state.employee.filter(emp => emp.id !== employeeId)

            return { employee: updateRemove }
        })

    }), {
        name: 'persist-employee',
        getStorage: () => localStorage
    })
)


async function saveFile(file, currProfileImage) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("profileImage", currProfileImage);

    try {
        // const response = await fetch(`/${currentLocale}/api/saveImage`, {
        const response = await fetch(`/api/saveImage`, {
            method: "POST",
            body: formData,
        });

        console.log('response', response);

        if (!response.ok) {
            console.error("Error uploading file");
        }
    } catch (error) {
        console.error(`Error uploading file: ${error.message}`);
    }
}