import { DataTypes, Model } from "sequelize";
import connectToDB from "./db.js";
import url from 'url';
import util from 'util';

const db = await connectToDB('postgresql:///employees')

class Employee extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        state: {
            type: DataTypes.STRING(2),
            // allowNull: false,
            defaultValue: 'CA'
        },
        salary: {
            type: DataTypes.INTEGER
        }
        // deptCode: {

        // }
    },
    {
        modelName: 'employee',
        sequelize: db
    }
)

class Department extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}

Department.init(
    {
        deptCode: {
            type: DataTypes.STRING(5),
            primaryKey: true
        },
        deptName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING
        }
    },
    {
        modelName: 'department',
        sequelize: db
    }
)

Department.hasMany(Employee, { foreignKey: 'deptCode' });
Employee.belongsTo(Department, { foreignKey: 'deptCode' });

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
    console.log('Syncing database...');
    await db.sync({ force: true });
    await db.close()
    console.log('Finished syncing database!');
}

export default db;
export { Department, Employee }

// await db.sync({ force: true })

// db.close()