import { DataTypes } from 'sequelize';
import { Model, Table, Column } from 'sequelize-typescript';

@Table({ tableName: 'announcement', paranoid: true, timestamps: true })
export class Announcement extends Model<Announcement> {

    @Column(DataTypes.STRING)
    title: string;

    @Column(DataTypes.BOOLEAN)
    is_published: boolean;

    @Column(DataTypes.DATE)
    publish_at: Date

}