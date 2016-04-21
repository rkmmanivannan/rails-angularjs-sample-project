class AddIndexesToRoles < ActiveRecord::Migration
  def up
    execute %{
      CREATE INDEX
        user_roles
      ON
        users
      USING GIN (roles)
    }
  end

  def down
    remove_index :users, name: 'user_roles'
  end

end
