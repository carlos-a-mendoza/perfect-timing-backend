exports.up = function (knex) {
    return knex.schema
      .createTable("events", (table) => {
        table.increments("id").primary();
        table.string("event_name").notNullable();
        table.string("event_description").notNullable();
        table.date("event_date").notNullable();
        table.string("event_category").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("events");
  };