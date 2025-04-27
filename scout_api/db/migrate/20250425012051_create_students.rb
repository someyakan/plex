class CreateStudents < ActiveRecord::Migration[8.0]
  def change
    create_table :students do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.text :profile

      t.timestamps
    end
  end
end
