import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
// @ts-ignore
export class User extends Model {
    /**
     * @override
     */
    // @ts-ignore
    static findOne(arg0) {
        throw new Error('Method not implemented.');
    }
    // Hash the password before saving the user
    // @ts-ignore
    async setPassword(password) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(password, saltRounds);
    }
}
// @ts-ignore
export function UserFactory(sequelize) {
    // @ts-ignore
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'users',
        sequelize,
        hooks: {
            beforeCreate: async (user) => {
                // @ts-ignore
                await user.setPassword(user.password);
            },
            beforeUpdate: async (user) => {
                // @ts-ignore
                await user.setPassword(user.password);
            },
        }
    });
    return User;
}
