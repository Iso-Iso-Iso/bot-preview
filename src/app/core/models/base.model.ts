import { CreatedAt, DeletedAt, Model, UpdatedAt } from "sequelize-typescript";

export class BaseModel extends Model {
    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt: Date;
}
