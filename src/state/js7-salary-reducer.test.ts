import {
    addSalary,
    AddSalaryActionType,
    divSalary, DivSalaryActionType,
    fullSalary, FullSalaryActionType,
    multSalary,
    MultSalaryActionType,
    salaryReducer
} from "./js7-salary-reducer";

test('addSalary', () => {
    //1. Тестовые данные
    const salary: number = 700
    const bonus: number = 250
    //2. Выполнение тестируемого кода
    const result = addSalary(salary, bonus)
    //3. Проверка ожидаемого результата
    expect(result).toBe(950)
})
test('fullSalary', () => {
    //1. Тестовые данные
    const salary: number = 700
    const minus: number = 150
    //2. Выполнение тестируемого кода
    const result = fullSalary(salary, minus)
    //3. Проверка ожидаемого результата
    expect(result).toBe(550)
})
test('multSalary', () => {
    //1. Тестовые данные
    const salary: number = 700
    const coefficient: number = 1.5
    //2. Выполнение тестируемого кода
    const result = multSalary(salary, coefficient)
    //3. Проверка ожидаемого результата
    expect(result).toBe(1050)
})
test('divSalary', () => {
    // Сокращенный вариант
    expect(divSalary(700, 0.5)).toBe(350)
})
test('case "ADD_SALARY" of salaryReducer', () => {
    const salary: number = 700
    const action: AddSalaryActionType = {
        type: "ADD_SALARY",
        bonus: 300
    }
    expect(salaryReducer(salary, action)).toBe(1000)
})
test('case "FULL_SALARY" of salaryReducer', () => {
    const salary: number = 700
    const action: FullSalaryActionType = {
        type: "FULL_SALARY",
        minus: 150
    }
    expect(salaryReducer(salary, action)).toBe(550)
})
test('case "MULT_SALARY" of salaryReducer', () => {
    const salary: number = 700
    const action: MultSalaryActionType = {
        type: "MULT_SALARY",
        coefficient: 1.5
    }
    expect(salaryReducer(salary, action)).toBe(1050)
})
test('case "DIV_SALARY" of salaryReducer', () => {
    const salary: number = 700
    const action: DivSalaryActionType = {
        type: "DIV_SALARY",
        coefficient: 0.5
    }
    expect(salaryReducer(salary, action)).toBe(350)
})