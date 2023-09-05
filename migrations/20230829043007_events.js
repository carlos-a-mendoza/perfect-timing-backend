exports.up = function (knex) {
    return knex.schema
      .createTable("events", (table) => {
        table.increments("id").primary();
        table.string("event_name").notNullable();
        table.string("event_description").notNullable();
        table.date("event_date").notNullable();
        table.string("event_category").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.integer("user_id").notNullable();
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      })
      .createTable("users", (table)=>{
        table.increments("id").primary();
        table.string("user_first_name").notNullable();
        table.string("user_last_name").notNullable();
        table.string("user_birthday").notNullable();
        table.string("user_city").notNullable();
        table.string("user_interests").notNullable();
        table.string("user_groups").notNullable();
        table.string("user_description", 600).notNullable();
        table.string("user_image_url");
      })
      .createTable("userGroups", (table) =>{
        table.increments("id").primary();
        table.string("group_name").notNullable();
        table.integer("user_id").notNullable();
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
    return knex.schema
    .dropTable("events")
    .dropTable("users")
    .dropTable("userGroups");
  };
