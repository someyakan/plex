class CreateEntries < ActiveRecord::Migration[8.0]
  def change
    create_table :entries do |t|
      t.references :student, foreign_key: true
      t.references :company, foreign_key: true
      t.references :room, foreign_key: true

      t.timestamps
    end
  end
end
