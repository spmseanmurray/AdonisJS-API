import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Roles from 'App/Enum/Roles'

export default class extends BaseSchema {
  protected tableName = 'roles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 25).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          id: Roles.USER,
          name: 'User',
        },
        {
          id: Roles.ADMIN,
          name: 'Admin',
        },
      ])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
