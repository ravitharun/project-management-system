
const allChars ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:'\",.<>/?`~";
const number = "1234567890"
const GetEmpNameGenById = (name) => {
    let Id = ''
    let idlen = 5
    for (let i = 1; i < idlen; i++) {
        Id += !name  ? number.charAt(Math.floor(Math.random() * number.length)) : allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    return name == "Task" | "task" ? `${name + Id}` : `${"Emp" + Id}`
}

const ProjetcId = () => {
    let ProjectId = ''
    let idlen = 30
    for (let i = 1; i < idlen; i++) {
        ProjectId += number.charAt(Math.floor(Math.random() * allChars.length));
    }
    return "Prj" + ProjectId
}


const TaskId = (data) => {
    return GetEmpNameGenById(data)
}
module.exports = { GetEmpNameGenById, ProjetcId,TaskId }