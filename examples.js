import db, { Department, Employee } from './src/model.js';

const legal = await Department.create(
    {
        deptCode: 'legal',
        deptName: 'Legal',
        phone: '555-2222'
    }
);

const leonard = await Employee.create(
    {
        name: 'Leonard',
        deptCode: 'legal',
        salary: 90000
    }
);

// to update
leonard.salary = 100000
await leonard.save()

let allFound = await Employee.findAll({
    where: { deptCode: 'legal', salary: 100000 }
});

// to delete
// await leonard.destroy()

// console.log(legal.deptName);  // 'Legal'
// console.log(leonard.name);  // 'Leonard'

// console.log(legal)
// console.log(leonard.toJSON)
console.log(allFound)