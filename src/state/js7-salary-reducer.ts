export const addSalary = (salary: number, bonus: number) => {
    return salary + bonus
}
export const fullSalary = (salary: number, minus: number) => {
    return salary - minus
}
export const multSalary = (salary: number, coefficient: number) => {
    return salary * coefficient
}
export const divSalary = (salary: number, coefficient: number) => {
    return salary * coefficient
}

// 1. В параметрах - salary (state)
// 2. Тип действия в названии (type of action/action type)
//3. Доп. значения для каждого типа действия

export type AddSalaryActionType = {
    type: 'ADD_SALARY'
    bonus: number
}
export type FullSalaryActionType = {
    type: 'FULL_SALARY'
    minus: number
}
export type MultSalaryActionType = {
    type: 'MULT_SALARY'
    coefficient: number
}
export type DivSalaryActionType = {
    type: 'DIV_SALARY'
    coefficient: number
}
type ActionType = AddSalaryActionType | FullSalaryActionType
    | MultSalaryActionType | DivSalaryActionType

export const salaryReducer = (salary: number, action: ActionType): number => {
    switch (action.type) {
        case 'ADD_SALARY':
            return salary + action.bonus
        case 'FULL_SALARY':
            return salary - action.minus
        case 'MULT_SALARY':
        case 'DIV_SALARY':
            return salary * action.coefficient
        default:
            return salary
    }
}